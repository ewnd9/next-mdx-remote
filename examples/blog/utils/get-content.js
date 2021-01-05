import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()

export function getContent() {
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
