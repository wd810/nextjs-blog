import Head from 'next/head'
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {/* set Page Title Head part END */}
            {postData.title}<br/>
            {postData.id}<br/>
            {postData.date}<br/>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}