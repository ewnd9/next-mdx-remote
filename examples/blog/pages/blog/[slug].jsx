import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'
import axios from 'axios'

import * as widgets from '../../../widgets/src'

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource, { components: widgets })
  return (
    <>
      <h1>{frontMatter.title}</h1>
      {content}
    </>
  )
}

export async function getStaticPaths() {
  const {
    data: { posts: postData },
  } = await axios('http://localhost:3001/api/v1/posts')

  return {
    fallback: false,
    paths: postData.map(({ slug }) => ({ params: { slug } })),
  }
}

export async function getStaticProps({ params }) {
  const {
    data: { posts: postData },
  } = await axios('http://localhost:3001/api/v1/posts')
  const { content: source } = postData.find((_) => _.slug === params.slug)

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, { components: widgets })
  return { props: { mdxSource, frontMatter: data } }
}
