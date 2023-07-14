import { Button } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useState, useEffect } from 'react';
import subjectData from '../../../data/subject.json'
import { EditOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import DirectoryTree from 'antd/es/tree/DirectoryTree';

type MyNode = DataNode & {
  title: string;
};

const findNode = (id: string | number, gData = [] as DataNode[]) => {
  let res: DataNode | null = null;
  let gPath = [] as (string|number)[];

  const traverse = (list: DataNode[], path = [] as (string|number)[]) => {
    for (let i = 0; i < list.length; i++) {
      const _key = list[i].key
      if (_key === id) {
        res = list[i];
        gPath = path;
        break;
      } else {
        traverse(list[i].children || [], [...path, _key]);
      }
    }
  };

  traverse(gData, [] as (string|number)[]);
  return {
    node: res,
    path: gPath
  }
};

const SubjectMenu: React.FC<{
  clickNode: (content: string) => void;
}> = ({
  clickNode
}) => {
  const routeParams = useParams();
  const subjectName = routeParams['*']?.split('/')[0];

  const list = subjectData.find((it) => it.title === subjectName)?.children || [];
  const initNode = findNode('/' + routeParams['*'] as string, list);

  const [gData, setGData] = useState<MyNode[]>(list);
  const [expandedKeys] = useState(initNode.path);
  const [defaultSelectedKeys] = useState(initNode.node ? [(initNode as any).node.key] : []) 
  const [editKey, setEditKey] = useState<string | number>('');

  useEffect(() => {
    if (initNode.node) {
      clickNode((initNode as any).node.content);
    }
  }, [])

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const updateNodeTitle = (id: string | number, content: string) => {
    setGData((prev) => {
      const findNode = (id: string | number) => {
        let res: DataNode | null = null;
        const traverse = (list: DataNode[]) => {
          for (let i = 0; i < list.length; i++) {
            if (list[i].key === id) {
              res = list[i];
              break;
            } else {
              traverse(list[i].children || []);
            }
          }
        };
        traverse(gData);
        return res as unknown as typeof subjectData;
      };
      const node = findNode(id) as unknown as MyNode;
      node!.title = content;
      return prev;
    });
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    // console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (!info.dropToGap && !info.node.children) {
      return;
    }

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  return (
    <div className="subject-menu">
      <DirectoryTree
        className="draggable-tree my-tree"
        defaultExpandedKeys={expandedKeys}
        defaultSelectedKeys={defaultSelectedKeys}
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        titleRender={(node) => {
          if (node.key === editKey) {
            return (
              <div className="title-box" onClick={(e) => {
                e.stopPropagation()
                if ('content' in  node) {
                  if (typeof node['content'] === 'string') {
                    clickNode(node.content)
                  }
                }
              }}>
                <div
                  contentEditable
                  className="title-box-editor"
                  id={'edit-box-' + node.key}
                >
                  {node.title}
                </div>
                <span
                  className="btn"
                  style={{ display: 'inline-block', marginLeft: 10 }}
                  onClick={() => {
                    var el = document.getElementById(`edit-box-${node.key}`);
                    updateNodeTitle(node.key, el!.innerText);
                    setEditKey('');
                  }}
                >
                  确定
                </span>
              </div>
            );
          }

          return (
            <Link to={'/subject' + (node as any).route} data-key={(node as any).route} className="title-box" onClick={(e) => {
              // e.stopPropagation()
              // e.preventDefault()
              if ('content' in  node) {
                if (typeof node['content'] === 'string') {
                  clickNode(node.content)
                }
              }
            }}>
              <span>{node.title}</span>
              <EditOutlined
                className="btn"
                onClick={() => {
                  setEditKey(node.key);
                  setTimeout(() => {
                    var el = document.getElementById(`edit-box-${node.key}`);
                    el?.focus();
                  });
                }}
              ></EditOutlined>
            </Link>
          );
        }}
      />

      <div className="add-btn">
        <Button
          block
          type="primary"
          onClick={() => {
            console.log(gData);
            const data = [...gData];
            data.push({
              title: 'NodeJS-' + data.length,
              key: 'NodeJS-' + data.length,
              children: [],
            });
            setGData(data);
          }}
        >
          添加节点
        </Button>
      </div>
    </div>
  );
};

export default SubjectMenu;
