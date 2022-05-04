import Link from 'next/link'
import Image from 'next/image'

export default function FirstPost() {
    return (
        <>
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
        </>
    );
}