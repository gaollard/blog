import {
  ArticleEntity,
  queryArticleDetail,
} from '@/service/auto-service/article';
import { useEffect, useState } from 'react';

export interface DetailProps {
  id: number;
}

const markdown = require('markdown-it');
const toc = require('markdown-it-toc-done-right').default;
const anchr = require('markdown-it-anchor').default;
const frontmatter = require('markdown-it-front-matter');

export function Detail(props: DetailProps) {
  const [detail, setDetail] = useState<ArticleEntity | null>(null);
  const [content, setContent] = useState('');

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

    if (!content) {
      setContent('没有内容');
      return;
    }

    // setContent(html);
    window.shiki
      .getHighlighter({
        theme: 'github-light',
        // theme: 'nord'
        // theme: 'material-theme',
        // theme: 'one-dark-pro'
      })
      .then((highlighter) => {
        const md = markdown({
          html: true,
          highlight: (code, lang) => {
            return highlighter.codeToHtml(code, { lang });
          },
        }).use(frontmatter, (fm) => {
          console.log(fm); // fm 是一个对象，包含 YAML 头部数据
        });
        const html = md.render(content);
        // var html = md.render("# markdown-it rulezz!\n\n${toc}\n## with markdown-it-toc-done-right rulezz even more!");

        setContent(html);
      });
  };

  useEffect(() => {
    queryArticleDetail({ id: props.id }).then((res) => {
      setDetail(res.data);
      renderContent(res.data.content);
    });
  }, [props.id]);

  return (
    <div
      className="article"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
