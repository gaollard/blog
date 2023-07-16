import { Spin } from 'antd';
import { useState, useEffect } from 'react';

const markdown = require('markdown-it');
const toc = require('markdown-it-toc-done-right').default;
const anchr = require('markdown-it-anchor').default;
const frontmatter = require('markdown-it-front-matter');

export default function MdRender({ content }: { content: string }) {
  const [detail, setDetail] = useState('');
  const [loading, setLoading] = useState(false);

  const renderContent = (content: string) => {
    setLoading(true)
    return (window as any).shiki
      .getHighlighter({
        theme: 'github-light',
        // theme: 'nord'
        // theme: 'material-theme',
        // theme: 'one-dark-pro'
      })
      .then((highlighter: any) => {
        const md = markdown({
          html: true,
          highlight: (code: string, lang: string) => {
            return highlighter.codeToHtml(code, { lang });
          },
        }).use(frontmatter, (fm: any) => {
          console.log(222, fm); // fm 是一个对象，包含 YAML 头部数据
        });
        const html = md.render(content);
        setDetail(html);
        setLoading(false)
      });
  };

  useEffect(() => {
    if (content) {
      renderContent(content);
    } else {
      renderContent('')
    }
  }, [content]);

  useEffect(() => {
    if (detail) {
      (window as any).initToc()
    }
  }, [detail])

  return loading ? (
    <div className="loading">
      <Spin size="large" />
    </div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: detail }}></div>
  )
}
