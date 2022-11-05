import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Post from '../components/post'
import { PostData, PostDataListProps } from '../types/postdata'
import { GetPosts } from '../lib/postdata_api'

export const getStaticProps: GetStaticProps = async (_context) => {
  // fetch list of posts
  const posts: PostData[] = await GetPosts()
  return {
    props: {
      postDataList: posts,
    },
  }
}

const IndexPage: NextPage<PostDataListProps> = ({
  postDataList,
}: PostDataListProps) => {
  return (
    <main>
      <Head>
        <title>shiimaxx.com</title>
      </Head>

      <h1>Entries</h1>

      <section>
        {postDataList.map((post: PostData) => (
          <Post {...post} key={post.url} />
        ))}
      </section>
    </main>
  )
}

export default IndexPage
