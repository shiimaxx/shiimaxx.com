import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import Layout from '../components/layout';
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
      <Layout>
        <Head>
          <title>shiimaxx.com</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>shiimaxx.com</h1>
        <section>
          {postDataList.map((post: PostData) => (
            <Post {...post} key={post.url} />
          ))}
        </section>
      </Layout>
    </main>
  )
}

export default IndexPage
