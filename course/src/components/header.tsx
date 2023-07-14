import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="navbar g-w">
        <div>
          <Link className="link" to="/">专题</Link>
          <Link className="link" to="/article">文章</Link>
          <Link className="link" to={"/post/link"}>友链</Link>
          <Link className="link" to={"/post/author"}>作者</Link>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Header;