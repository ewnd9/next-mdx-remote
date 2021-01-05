import Link from 'next/link'

import { getContent } from '../utils/get-content';

export default function IndexPage({ postData }) {
  return (
    <>
      <h1>My Cool Blog</h1>
      <ul>
        {postData.map((data) => (
          <li>
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
  const { postData } = getContent();
  return { props: { postData } }
}
