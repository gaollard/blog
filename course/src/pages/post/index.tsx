import { useMatches } from 'react-router-dom';
import postJson from '../../data/post.json';
import MdRender from '../../components/md-render';

export function PostDetail() {
  const routes = useMatches()
  const route = routes[routes.length - 1];
  const postPath = route.params['*'];

  const postContent = postJson.find((it) => it.title === postPath)

  console.log(postContent)

  return (
    <div className="page-subject-detail">
      <div className="content">
        <div className="left">
        </div>
        <div className="article" id='article-content'>
          <MdRender content={postContent?.content || ''} />
        </div>
        <div className="right">
          <div id='article-toc'></div>
        </div>
      </div>
    </div>
  );
}
