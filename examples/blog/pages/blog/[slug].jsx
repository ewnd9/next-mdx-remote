import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import matter from 'gray-matter'

import { getContent } from '../../utils/get-content';

export default function BlogPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource)
  return (
    <>
      <h1>{frontMatter.title}</h1>
      {content}
    </>
  )
}

export async function getStaticPaths() {
  const { postData } = getContent()

  return {
    fallback: false,
    paths: postData.map(({ slug }) => ({ params: { slug } }))
  }
}

export async function getStaticProps({ params }) {
  const { postData } = getContent()
  const { content: source } = postData.find(_ => _.slug === params.slug)

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content)
  return { props: { mdxSource, frontMatter: data } }
}
