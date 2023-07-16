import { useState, useEffect } from 'react';
import SubjectMenu from './subject-menu';
import './index.less';
import MdRender from '../../../components/md-render';

export default function SubjectDetail() {
  const [detail, setDetail] = useState('');

  const clickNode = (content: string) => {
    setDetail(content);
  };

  return (
    <div className="page-subject-detail">
      <div className="content">
        <div className="left">
          <SubjectMenu clickNode={clickNode} />
        </div>
        <div className="article" id='article-content'>
          <MdRender content={detail} />
        </div>
        <div className="right">
          <div id='article-toc'></div>
        </div>
      </div>
    </div>
  );
}
