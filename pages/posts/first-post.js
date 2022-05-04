import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <Script 
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy='lazyOnLoad'
                onLoad={() =>
                    consol.log(`script loaded successfully, window.FB`)
                }
            />
            <h1>My First Post</h1>
            <Image
                src="/images/avatar.png"
                height={144}
                width={144}
                alt="Bubbles"
            />
            <h2>
                <Link href="/">
                    <a>Back to Home</a>
                </Link>
            </h2>
        </Layout>
    );
}