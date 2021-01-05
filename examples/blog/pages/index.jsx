import Link from 'next/link'
import axios from 'axios'

export default function IndexPage({ postData }) {
  return (
    <>
      <h1>My Cool Blog</h1>
      <ul>
        {postData.map((data) => (
          <li key={data.slug}>
            <Link href="/blog/[slug]" as={`/blog/${data.slug}`}>
              <a>{data.frontMatter.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const {
    data: { posts: postData },
  } = await axios('http://localhost:3001/api/v1/posts')
  return { props: { postData } }
}
