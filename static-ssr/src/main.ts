import fs from 'fs'
import express from 'express';
import shiki from 'shiki'
import markdown from 'markdown-it';
import path from 'path'
import menu from './routes.json'

const port = 3001;
const app = express();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

const docRoot = `/Users/xiong.gao/code/learn-books/gaollard-blog/docs/pages`  

function log(req: express.Request, res: express.Response, next: Function) {
  console.log(req.url)
  next()
}

app.use(log)

app.use('/api', (req, res) => {
  const myPath = decodeURIComponent(req.url === '/' ? '/index' : req.url)
  let filePath = docRoot + myPath + '.md';
  let isReal = false;

  if (!fs.existsSync(filePath)) {
    isReal = false;
    filePath = docRoot + '/index.md';
  } else {
    isReal = true;
  }

  shiki.getHighlighter({
    theme: 'github-light'
    // theme: 'nord'
    // theme: 'material-theme',
    // theme: 'one-dark-pro'
  }).then(highlighter => {
    const md = markdown({
      html: true,
      highlight: (code, lang) => {
        return highlighter.codeToHtml(code, { lang })
      }
    })
    const content = fs.readFileSync(filePath, 'utf8')
    const html = md.render(content);
    res.render('index', { content: html, menu, meta: {} })
  })
})

app.get('/subject/*', (req, res) => {
  const url = req.url.replace('/subject', '');
  const myPath = decodeURIComponent(url === '/' ? '/index' : url)
  let filePath = docRoot + myPath + '.md';
  let isReal = false;

  if (!fs.existsSync(filePath)) {
    isReal = false;
    filePath = docRoot + '/index.md';
  } else {
    isReal = true;
  }

  shiki.getHighlighter({
    theme: 'github-light'
    // theme: 'nord'
    // theme: 'material-theme',
    // theme: 'one-dark-pro'
  }).then(highlighter => {
    const md = markdown({
      html: true,
      highlight: (code, lang) => {
        return highlighter.codeToHtml(code, { lang })
      }
    })
    const content = fs.readFileSync(filePath, 'utf8')
    const html = md.render(content);
    res.render('subject', { content: html, menu, meta: {} })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})