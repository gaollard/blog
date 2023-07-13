import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useState } from 'react';
import mData from './data.json';
import './index.less';
import { EditOutlined } from '@ant-design/icons'

const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = mData;

const App: React.FC = () => {
  const [gData, setGData] = useState(defaultData);
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [editKey, setEditKey] = useState<string|number>('');

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const findNode = () => {

  }

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    if (!info.node.children) {
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

    console.log(info.dropToGap);

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
    console.log(data);
    setGData(data);
  };

  return (
    <div className="side">
      <Tree
        className="draggable-tree my-tree"
        defaultExpandedKeys={expandedKeys}
        draggable
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        treeData={gData}
        titleRender={(node) => {
          if (node.key === editKey) {
            return (
              <div className='title-box'>
                <div contentEditable id={'edit-box-' + node.key}>{node.title}</div>
                <span className='btn' style={{ display: 'inline-block', marginLeft: 10}} onClick={() => {
                  var el = document.getElementById(`edit-box-${node.key}`)
                  console.log(el!.innerText)
                  
                  setEditKey('')
                }}>确定</span>
              </div>
            )
          }

          return (
            <div className='title-box'>
            <span>{node.title}</span>
            <EditOutlined className='btn' onClick={() => {
              setEditKey(node.key)
              setTimeout(() => {
                var el = document.getElementById(`edit-box-${node.key}`)
                el?.focus()
              })
            }}></EditOutlined>
          </div>
          )
        }}
      />
      <Button className='add-btn' type='primary' onClick={() => {
        console.log(gData)
        const data = [...gData];
        data.push({
          title: 'NodeJS-' + data.length,
          key: 'NodeJS-' + data.length,
          children: []
        })
        setGData(data)
      }}>添加节点</Button>
    </div>
  );
};

export default App;
