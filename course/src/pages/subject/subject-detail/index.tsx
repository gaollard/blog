import { useState, useEffect } from 'react';
import Header from '../../../components/header';
import SubjectMenu from './subject-menu';
import './index.less';

const markdown = require('markdown-it');
const toc = require('markdown-it-toc-done-right').default;
const anchr = require('markdown-it-anchor').default;
const frontmatter = require('markdown-it-front-matter');

export default function SubjectDetail() {
  const [detail, setDetail] = useState('');

  const renderContent = (content: string) => {
    // const md = markdown({
    //   html: false,
    //   xhtmlOut: true,
    //   typographer: true
    //   // highlight: (code, lang) => {
    //   //   return highlighter.codeToHtml(code, { lang })
    //   // }
    // })
    // .use(Shiki, {
    //   dark: 'min-dark',
    //   light: 'min-light'
    // })
    // .use(frontmatter, fm => {
    //   console.log(fm); // fm 是一个对象，包含 YAML 头部数据
    // })
    // .use(anchr, {  permalinkBefore: true, })
    // .use(toc);

    // setContent(html);
    (window as any).shiki
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
          console.log(fm); // fm 是一个对象，包含 YAML 头部数据
        });
        const html = md.render(content);
        // var html = md.render("# markdown-it rulezz!\n\n${toc}\n## with markdown-it-toc-done-right rulezz even more!");

        setDetail(html);
      });
  };

  const clickNode = (content: string) => {
    console.log(content);
    renderContent(content);
  };

  return (
    <div className="page-subject-detail">
      <Header />
      <div className="main g-w">
        <div className="content">
          <div className='left'>
            <SubjectMenu clickNode={clickNode} />
          </div>
          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: detail }}
          ></div>
          <div className='right'>

          </div>
        </div>
      </div>
    </div>
  );
}