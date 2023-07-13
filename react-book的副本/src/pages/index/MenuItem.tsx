import { ArticleEntity } from '@/service/auto-service/types';
import { useRef, useState } from 'react';
import classNames from 'classnames';

export interface TreeNode extends ArticleEntity {
  children?: TreeNode[];
}

export interface MenuItemProps {
  item: TreeNode;
  depth: number;
  updateParent?: () => void;
  loadData: (id: number) => void;
  current?: number;
}

export function MenuItem(props: MenuItemProps) {
  const [duration, setDuration] = useState(300);
  const [isOpen, setIsOpen] = useState(false);
  const { item, depth, updateParent } = props;
  const [height, setHeight] = useState<number | undefined>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const clickNode = () => {
    if (!item.children) {
      return;
    }

    const newVal = height === 0 ? containerRef.current?.offsetHeight ?? 0 : 0;
    if (!isOpen) {
      // 展开
      setHeight(newVal);
      setIsOpen(!isOpen);
      setTimeout(() => {
        setHeight(undefined);
      }, 300);
    } else {
      // 关闭
      setIsOpen(!isOpen);
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight);
      }
      setTimeout(() => {
        setHeight(() => 0);
      });
    }
  };

  if (item.children && item.children.length) {
    const children = item.children.map((it) => (
      <MenuItem
        current={props.current}
        item={it}
        depth={depth + 1}
        key={it.name}
        loadData={props.loadData}
        updateParent={() => {
          setHeight(containerRef.current!.offsetHeight);
        }}
      />
    ));

    const style =
      height === 0
        ? {
            height: 0,
          }
        : {
            height,
          };

    return (
      <div
        key={item.id}
        className="menu-item"
        style={{ marginLeft: depth * 12 + 'px' }}
      >
        <div className="menu-title" onClick={() => clickNode()}>
          {item.name}
        </div>
        <div
          className="menu-group"
          style={{
            ...style,
            overflow: 'hidden',
            transition: `all ${duration}ms`,
          }}
        >
          <div ref={containerRef}>{children}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={item.id}
        className="menu-item"
        style={{ marginLeft: depth * 12 + 'px' }}
        onClick={() => {
          props.loadData?.(item.id);
        }}
      >
        <div
          className={classNames([
            'menu-title',
            {
              active: props.current && props.current === item.id,
            },
          ])}
        >
          {item.name}
        </div>
      </div>
    );
  }
}
