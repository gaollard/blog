import Header from './components/header';
import { Outlet } from 'react-router-dom';

export function Root() {
  return (
    <>
      <Header />
      <div className="main g-w">
        <Outlet />
      </div>
    </>
  );
}
