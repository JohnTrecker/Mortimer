import Link from 'next/link'

export default function CTA(){
    return (
        <div className="flex flex-col justify-center items-center">
            <blockquote>{"Read the best books first or you may not have a chance to read them at all."}</blockquote>
            <cite className="mt-8">{"Henry David Thoreau"}</cite>
            <Link href="/topics" passHref={true}>
                <button className="btn btn-orange mt-20">Explore by Topic</button>
            </Link>
        </div>
    )
}