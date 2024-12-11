import React, { useContext } from 'react'
import Link from 'next/link'
import { SelectionDispatchContext } from '@/context/selection';

interface Props {
    work: {
        title: string;
        author: string;
    };
    summary: {
        summary: string;
    };
    pages: string | null;
    excerpt_id: number;
}

export default function Citation({work, summary, pages, excerpt_id}: Props){
    const { updateReference } = useContext(SelectionDispatchContext)

    const citation = `- ${work.author}`
    const link = `${work.title}, ${pages}`
    const name = `${work.title}, ${work.author}`
    const { summary: text } = summary

    return (
        <blockquote>
            <p>{text}</p>
            <p className='m-5'>
                <cite>{citation}</cite>
            </p>
            <Link
                href={`/excerpt/${excerpt_id}`}
                prefetch={false}
                onClick={() => updateReference({ id: String(excerpt_id), name })}
            >
                <cite className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'>
                    {link}
                </cite>
            </Link>
        </blockquote>
    )
}