'use client'

import Loading from '@/app/loading'
import Citation from '@/components/Citation'
import { useFetch } from '@/hooks/useFetch'
import RefPlaceholder from './RefPlaceholder';
import { Button, useDisclosure } from '@nextui-org/react';
import AddReferenceModal from '@/components/Modal/AddReferenceModal';

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (loading) return <Loading />
    if (error) return <p>Error fetching references. Try again in a minute.</p>

    return (
        <ol>
            <li key={0}>
                <blockquote>
                    <RefPlaceholder/>
                    <Button className='m-8' color='warning' onPress={onOpen}>Add Reference</Button>
                    <AddReferenceModal isOpen={isOpen} onOpenChange={onOpenChange}/>
                </blockquote>
            </li>
            {data.map((ref: Ref) => {
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
