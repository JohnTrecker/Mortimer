'use client'

import Loading from '@/app/loading'
import Citation from '@/components/Citation'
import { useFetch } from '@/hooks/useFetch'

interface Ref {
    id: number;
    excerpt_id: number;
    work: {
        title: string;
        author: string;
    };
    summary: {
        summary: string;
    };
    pages: string | null;
}

const ReferencesList = () => {
    const {data, loading, error} = useFetch('references')

    if (loading) return <Loading />
    if (error) return <p>Error fetching references. Try again in a minute.</p>

    return (
        <ol>
            {data.map((ref: Ref) => {
                // id,pages,work(author,title,translator),summary(summary),excerpt_id
                const { work, summary, pages, excerpt_id, id } = ref
                return (
                    <li key={id}>
                        <Citation work={work} summary={summary} pages={pages} excerpt_id={excerpt_id} />
                    </li>
                )
            })}
        </ol>
    )
}

export default ReferencesList;
