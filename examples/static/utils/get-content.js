const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const root = path.resolve(__dirname, '..')

module.exports = {
  getContent,
}

function getContent() {
  const contentRoot = path.join(root, 'content')
  const postData = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), 'utf8')
    return {
      slug: p.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
    }
  })
  return { postData }
}
