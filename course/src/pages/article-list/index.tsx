import React, { useState } from 'react';
import './index.css';

const tags = ['NodeJS','Babel',  'Javascript', "Mysql", "Redis", "Webpack", "ReactJS", "VueJS"]

function ArticleList() {
  const [tag, setTag] = useState('NodeJS');
  return (
    <div className="App">
      <div className='header'>
        <div className='navbar g-w'>
          <div>
            <span>文章</span>
            <span>专题</span>
            <span>广场</span>
            <span>友链</span>
          </div>
          <div></div>
        </div>
      </div>
      <div className='main g-w'>
        <div className='content'>
          <div>
            {
              tags.map((it) => {
                const cls = it === tag ? 'tag is-active' : 'tag';
                return (
                  <div onClick={() => {
                    setTag(it)
                  }} className={cls} key={it}>
                    {it}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='side'></div>
      </div>
    </div>
  );
}

export default ArticleList;
