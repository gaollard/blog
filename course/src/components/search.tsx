import React, { useState } from 'react';
import { Input } from 'antd';
import jsonData from '../data/subject.json';
import { Link } from 'react-router-dom';

const toArray = (data: any[]) => {
  const targetData = [] as any[];
  function traverse(dataObj: any[]) {
    dataObj.forEach((it) => {
      targetData.push(it);
      if (it.children && it.children.length) {
        traverse(it.children);
      }
    });
  }
  traverse(data);
  return targetData;
};

const list = toArray(jsonData);

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

export const SearchInput: React.FC<{
  placeholder: string;
  style: React.CSSProperties;
}> = (props) => {
  const [data, setData] = useState<any[]>([]);
  const [value, setVal] = useState('');

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };

  const fetch = (value: string, callback: Function) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    const fake = () => {
      const data = list
        .map((it) => {
          return {
            ...it,
            highlight: '',
          };
        })
        .filter((it) => {
          if (currentValue === value) {
            if (it.path.includes(value)) {
              const i = it.path.indexOf(value);
              it.highlight = it.path.substr(i - 10, value.length + 20);
              return true;
            }
            if (it.content.includes(value)) {
              const i = it.content.indexOf(value);
              it.highlight = it.content.substr(i - 10, value.length + 20);
              return true;
            }
          }
          return false;
        });
      setData(data);
    };

    timeout = setTimeout(fake, 300);
  };

  const renderList = () => {
    return data.map((it) => {
      return (
        <div>
          <div>{it.title}</div>
          <Link to={'/subject' + it.route} target="_blank">
            <div style={{ fontSize: 12, color: '#888' }}>{it.highlight}</div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div>
      <Input
        placeholder={props.placeholder}
        style={props.style}
        onChange={(e) => {
          handleSearch(e.target.value);
          setVal(e.target.value);
        }}
      />
      {value ? (
        <div
          className="search-result"
          style={{ background: '#fff', padding: 10 }}
        >
          {data.length ? renderList() : <div>无内容</div>}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
