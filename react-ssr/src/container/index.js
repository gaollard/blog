import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { getIndexList } from "../store/index";
import styles from "./index.css";
import withStyle from "../withStyle";

function MenuItem(props) {
  const [duration, setDuration] = useState(300); 
  const [isOpen, setIsOpen] = useState(false);
  const { item, depth, updateParent } = props;
  const [height, setHeight] = useState(0);
  const current_id = item.name;

  const clickNode = (id) => {
    const el = document.querySelector("#" + id);
    const newVal = height === 0 ? el.offsetHeight : 0;
    if (!isOpen) {
      // 展开
      setHeight(newVal);
      setIsOpen(!isOpen);
      setTimeout(() => {
        setHeight(undefined);
      }, 300)
    } else {
      // 关闭
      setIsOpen(!isOpen);
      setHeight(el.offsetHeight)
      setTimeout(() => {
        setHeight(() => 0)
      })
    }
  };

  if (item.children && item.children.length) {
    const children = item.children.map((it) => (
      <MenuItem item={it} depth={depth + 1} key={it.name} updateParent={() => {
        const el = document.querySelector("#" + current_id);
        console.log(el.offsetHeight, current_id)
        setHeight(el.offsetHeight);
      }}/>
    ));

    const style = height === 0 ? {
      height: 0,
    } : {
      height
    }

    return (
      <div key={item.id} className="menu-item" style={{ marginLeft: depth * 12 + "px" }}>
        <div className="menu-title" onClick={() => clickNode(item.name)}>
          {item.name}
        </div>
        <div
          className="menu-group"
          style={{ ...style, overflow: "hidden", transition: `all ${duration}ms` }}
        >
          <div id={item.name}>{children}</div>
        </div>
      </div>
    );
  } else {
    return (
      <div key={item.id} className="menu-item" style={{ marginLeft: depth * 12 + "px" }}>
        <div className="menu-title">{item.name}</div>
      </div>
    );
  }
}

function Index(props) {
  const [count, setCount] = useState(1);

  useEffect(() => {
    // 如果首屏不是这个页面，则需要进行客户端数据的获取
    if (!props.list.length) {
      props.getIndexList();
    }
  }, []);

  const routes = [
    {
      name: "测试1",
      children: [
        { name: "测试-01" },
        { name: "测试-02" },
        { name: "测试-03" },
        { name: "测试-04" },
        { name: "测试-05" },
        {
          name: "测试-06",
          children: [
            { name: "测试-016" },
            { name: "测试-017" },
            { name: "测试-018" },
            { name: "测试-019" },
          ],
        },
        { name: "测试-07" },
        { name: "测试-08" },
        { name: "测试-09" },
      ],
    },
    {
      name: "测试2",
      children: [
        { name: "测试-21" },
        { name: "测试-22" },
        { name: "测试-23" },
        { name: "测试-24" },
        { name: "测试-25" },
      ],
    },
    {
      name: "测试3",
      children: [
        { name: "测试-31" },
        { name: "测试-32" },
        { name: "测试-33" },
        { name: "测试-34" },
        { name: "测试-35" },
      ],
    },
  ];

  const renderMenu = () => {
    return (
      <div className="menu">
        {routes.map((it, index) => (
          <MenuItem item={it} depth={0} key={index} />
        ))}
      </div>
    );
  };

  return (
    <div style={{ margin: 50 + "px" }}>
      <h1 className={styles.title}>Index页面</h1>
      {count}
      <button onClick={() => setCount(count + 1)}>累加</button>
      <ul>
        {props.list.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
      {renderMenu()}
    </div>
  );
}

// 获取数据，用于服务端渲染
Index.loadData = (store) => {
  return store.dispatch(getIndexList());
};

export default connect((state) => ({ list: state.index.list }), {
  getIndexList,
})(withStyle(Index, styles));
