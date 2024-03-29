$(document).ready(function () {
  initToc();
  initMenu();
});

function initToc() {
  var article = document.querySelector("#article-content");

  if (article) {
    var headings = article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    var toc = document.querySelector("#article-toc");
    // var toc = document.createElement('div');
    // toc.setAttribute('id', 'article-toc');
    // toc.setAttribute('class', 'article-toc');
    // document.body.appendChild(toc);
    var html = "<ul>";

    function init() {
      headings.forEach((heading, index) => {
        const title = heading.textContent;
        const id = `heading-${index}`;
        heading.setAttribute("id", id);
        const level = parseInt(heading.tagName.replace("H", ""), 10);
        html += `<li style="margin-left: ${
          (level - 1) * 16
        }px"><a href="#${id}">${title}</a></li>`;
      });

      html += "</ul>";
      toc.innerHTML = html;

      const navList = toc.querySelectorAll("li");
      navList[0].className = "active";

      window.addEventListener("scroll", function () {
        var top = document.documentElement.scrollTop;

        for (let i = 0; i < headings.length; i++) {
          navList.forEach((it) => {
            it.className = "";
          });
        }

        for (let i = 0; i < headings.length; i++) {
          if (headings[i].offsetTop > top) {
            navList[i].className = "active";
            break;
          }
        }
      });
    }

    if (headings.length) {
      init();
    }
  }
}

function initMenu() {
  $(".menu-link").on('click', function(e) {
    var children = $(e.target).parent().parent().children(".children");
    var display = children.css('display');
    children.css('display', display === 'block' ? 'none' : 'block')
  })
  var path = window.location.pathname;
  var item = $("a[href*='" + path + "']");
  if (item) {
    item.parents(".children").css("display", "block");
  }
}