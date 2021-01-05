const express = require('express')
const app = express()

const fs = require('fs')
const { getContent } = require('./utils/get-content')

const port = 3001

app.get('/api/v1/posts', (req, res) => {
  const { postData: posts } = getContent() // rereading every time just for demo
  res.json({ posts })
})

app.listen(port, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`listening localhost:${port}`)
  }
})
