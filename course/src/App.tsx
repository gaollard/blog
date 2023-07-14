import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SubjectList from './pages/subject/subject-list';
import SubjectDetail from './pages/subject/subject-detail';
import ArticleList from './pages/article/article-list';
import ArticleDetail from './pages/article/article-detail';
import ArticleSingleTag from './pages/article/article-single-tag';
import { Root } from './Root';
import { PostDetail } from './pages/post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <SubjectList />,
      },
      {
        path: '/post/*',
        element: <PostDetail />,
      },
      {
        path: '/subject/*',
        element: <SubjectDetail />,
      },
      {
        path: '/article/tag/*',
        element: <ArticleSingleTag />,
      },
      {
        path: '/article/*',
        element: <ArticleDetail />,
      },
      {
        path: '/article',
        element: <ArticleList />,
      },
      {
        path: '*',
        element: (
          <div
            style={{
              flex: 1,
              display: 'flex',
              height: '100vh',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 30 }}>coming soon</span>
          </div>
        ),
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
