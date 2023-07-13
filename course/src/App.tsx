import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SubjectList from './pages/subject/subject-list';
import SubjectDetail from './pages/subject/subject-detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SubjectList />,
  },
  {
    path: '/subject/*',
    element: <SubjectDetail />,
  },
  {
    path: '*',
    element: (
      <div
        style={{
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
