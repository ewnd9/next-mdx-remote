const express = require('express')
const renderToString = require('next-mdx-remote/render-to-string')
const matter = require('gray-matter')
const axios = require('axios')
const React = require('react')
const ReactDOM = require('react-dom/server')

const app = express()
const { App, widgets } = require('./dist-server/bundle')

const port = 3002

app.use(express.static(`${__dirname}/dist`))

app.get('*', async (req, res) => {
  try {
    const {
      data: { posts: postData },
    } = await axios('http://localhost:3001/api/v1/posts')
    const { content: source } = postData[0]

    const { data, content } = matter(source)
    const mdxSource = await renderToString(content, { components: widgets })
    const props = { source: mdxSource, frontMatter: data }

    const str = ReactDOM.renderToString(React.createElement(App, props))

    res.end(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Webpack App</title>
          <meta name="viewport" content="width=device-width,initial-scale=1">
        </head>
        <body>
          <div id="root">${str}</div>
          <script>window.__INITIAL_STATE__ = ${JSON.stringify({
            props,
          })}</script>
          <script src="bundle.js"></script>
        </body>
      </html>
    `)
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error ' })
  }
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`listening localhost:${port}`)
  }
})
