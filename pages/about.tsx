import Layout from '../components/layout'
import { getPostData } from '../lib/content'

export default function AboutPage({ postData }: {postData: any}) {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: postData }} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postData = await getPostData();
  return {
    props: {
      postData,
    },
  };
}
