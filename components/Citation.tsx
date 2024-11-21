import React from 'react'
import Link from 'next/link'

interface Props {
    work: {
        title: string;
        author: string;
    };
    summary: {
        summary: string;
    };
    pages: string;
    path: string;
    excerpt_id: string;
}

export default function Citation({work, summary, pages, path, excerpt_id}: Props){
    const citation = `- ${work.author}`
    const href = `${path}${excerpt_id}`
    const link = `${work.title}, ${pages}`
    const { summary: text } = summary

    return (
        <blockquote>
            <p>{text}</p>
            <p><cite>{citation}</cite></p>
            <Link href={href} prefetch={false}>
                <cite>{link}</cite>
            </Link>
        </blockquote>
    )
}