import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'umi';
import {
  QueryNavListVo,
  queryChildren,
  queryNavList,
} from '@/service/auto-service/article';
import { MenuItem, TreeNode } from './MenuItem';
import { listToTree } from './utils';
import { Detail } from './Detail';
var classNames = require('classnames');

const IndexPage = () => {
  const [list, setList] = useState([] as QueryNavListVo['list']);
  const [menu, setMenu] = useState([] as TreeNode[]);
  const location: any = useLocation();
  const history: any = useHistory();
  const [navId, setNavId] = useState(location.query.nav_id);
  const [detail, setDetail] = useState<number | undefined>();

  // 获取第一个 file 节点
  const getFirstFile = (node: TreeNode): number => {
    if (!node.children || !node.children.length) {
      return node.id;
    }
    return getFirstFile(node.children[0]) as unknown as number;
  };

  const initData = async () => {
    const res = await queryNavList({});
    setList(res.data.list);
    const nav_id = location.query.nav_id
      ? Number(location.query.nav_id)
      : res.data.list[0].id;

    await queryChildren({
      id: nav_id,
    }).then((res) => {
      const tree = listToTree(res.data.list);
      setMenu(tree);
      setDetail(getFirstFile(tree[0]));
    });
  };

  const clickNav = (id: number) => {
    history.push({
      query: {
        nav_id: id,
      },
    });
    queryChildren({
      id,
    }).then((res) => {
      const tree = listToTree(res.data.list);
      setMenu(tree);
      if (res.data.list.length) {
        setDetail(getFirstFile(tree[0]));
      }
    });
  };

  const renderMenu = () => {
    return (
      <div className="menu">
        {menu.map((it, index) => (
          <MenuItem
            current={detail}
            item={it}
            depth={0}
            key={index}
            loadData={(id) => {
              history.push({
                query: {
                  ...location.query,
                  article_id: id,
                },
              });
              setDetail(id);
            }}
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="home-page ui-bg-white">
      <div className="nav">
        <div className="nav-list">
          {list.map((it) => {
            return (
              <div
                className={classNames([
                  'nav-item',
                  {
                    active: it.id === Number(location.query.nav_id),
                  },
                ])}
                onClick={() => {
                  clickNav(it.id);
                }}
              >
                {it.name}
              </div>
            );
          })}
        </div>
      </div>
      <div className="g-side">{renderMenu()}</div>
      <div className="g-main">{detail ? <Detail id={detail} /> : '---'}</div>
    </div>
  );
};

export default observer(IndexPage);
