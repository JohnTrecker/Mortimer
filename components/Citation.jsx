import Link from 'next/link'

export default function Citation({work, summary, pages, path, excerpt_id}){
    const citation = `- ${work.author}`
    const href = `${path}${excerpt_id}`
    const link = `${work.title}, ${pages}`
    const { summary: text } = summary
    
    return (
        <blockquote>
            <p>{text}</p>
            <p><cite>{citation}</cite></p>
            <Link href={href} prefetch={false}>
                <a><cite>{link}</cite></a>
            </Link>
        </blockquote>
    )
}