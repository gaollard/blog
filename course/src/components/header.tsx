import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [index, setIndex] = useState(0);
  const list = [
    {
      title: "专题",
      path: '/'
    },
    {
      title: "文章",
      path: '/article'
    },
    {
      title: "友链",
      path: '/post/link'
    },
    {
      title: "作者",
      path: '/post/author'
    }
  ]

  useEffect(() => {
    let index = 0
    if (window.location.href.includes("post/author")) {
      index = 3;
    } else if (window.location.href.includes("post/link")) {
      index = 2;
    } else if (window.location.href.includes("article")) {
      index = 1;
    }
    setIndex(index)
  }, [location])


  return (
    <div className="header">
      <div className="navbar g-w">
        <div>
          {
            list.map((it, i) => {
              const cls = index === i ? 'link active' : 'link';
              return (
                <Link className={cls} to={it.path}>{it.title}</Link>
              )
            })
          }
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Header;