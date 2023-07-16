import React, { useState } from 'react';
import './index.less';
import Header from '../../../components/header';
import { Link } from 'react-router-dom';
import subjectJson from '../../../data/subject.json';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';

const subjects = [
  { title: 'NodeJS', id: 'NodeJS' },
  { title: 'Babel', id: 'Babel' },
  { title: 'Javascript', id: '' },
  { title: 'Webpack', id: '' },
  { title: 'ReactJS', id: '' },
  { title: 'VueJS', id: '' },
  { title: 'Mysql', id: '' },
  { title: 'Redis', id: '' },
  { title: 'Kafka', id: '' },
  { title: 'RabbitMQ', id: '' },
  { title: 'RocketMQ', id: '' },
  { title: 'Elasticsearch', id: '' },
  { title: 'Etcd', id: '' },
  { title: 'Nginx', id: '' },
  { title: 'Docker', id: '' },
  { title: 'K8s', id: '' },
  { title: 'Git', id: '' },
];

function SubjectList() {
  const [tag, setTag] = useState('NodeJS');
  const [mode, setMode] = useState<'outline' | 'items'>('outline');

  const renderItem = (it: (typeof subjectJson)[0]) => {
    const cls = it.title === tag ? 'item is-active' : 'item';
    return (
      <Link
        to={`subject${it.key}`}
        onClick={() => {
          setTag(it.title);
        }}
        className={cls}
        key={it.title}
      >
        {it.title}
      </Link>
    );
  };

  return (
    <div className="page-subject-list">
      <div className="content">
        <div style={{ display: 'flex' }}>
          { mode === 'items' ? (
          <AppstoreOutlined onClick={() => setMode('outline')} style={{ cursor: 'pointer' }} />
          ) : (
            <UnorderedListOutlined onClick={() => setMode('items')} style={{ cursor: 'pointer' }} />
          )}
        </div>
        <div className={`list list-${mode}`}>{subjectJson.map(renderItem)}</div>
      </div>
    </div>
  );
}

export default SubjectList;
