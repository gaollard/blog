import React, { useState } from 'react';
import './index.less';
import Header from '../../../components/header';
import articleJson from '../../../data/article.json';
import { Link } from 'react-router-dom';

const tags = articleJson.map((it) => it.title);

function ArticleList() {
  const [tag, setTag] = useState(tags[0]);
  const currentArticles = articleJson.find((it) => it.title === tag)?.children;

  const renderMenu = () => {
    return (
      <div className="tags">
        {tags.map((it) => {
          const cls = it === tag ? 'tag is-active' : 'tag';
          return (
            <div
              onClick={() => {
                setTag(it);
              }}
              className={cls}
              key={it}
            >
              {it}
            </div>
          );
        })}
      </div>
    );
  };

  const renderList = () => {
    return currentArticles?.map((it) => {
      return (
        <Link to={`/article${it.route}`} className="article-list-item">
          {it.title}
        </Link>
      );
    });
  };

  return (
    <div className="page-article-list">
      <div className="content">
        {renderMenu()}
        <div className="article-list">{renderList()}</div>
      </div>
      <div className="side"></div>
    </div>
  );
}

export default ArticleList;
