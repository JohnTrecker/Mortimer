'use client'

import Loading from '@/app/loading';
import { SelectionDispatchContext } from '@/context/selection';
import { useFetch } from '@/hooks/useFetch'
import { Tables } from '@/utils/database.types';
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from 'next/link';
import { useContext } from 'react';

interface Subtopic extends Tables<'subtopic'>{
    subtopics: Subtopic[];
}

const SubtopicList = () => {
    const { data, loading, error } = useFetch('subtopics')
    if (loading) return <Loading />
    if (error) return <p>Error fetching subtopics. Try again in a minute.</p>

    return <NestedSubtopics subtopics={data} />
}

const NestedSubtopics = ({subtopics}: {subtopics: Subtopic[]}) => {
    const { updateSubtopic } = useContext(SelectionDispatchContext)
    const itemClasses = {
        base: "py-3 w-auto data-[hover=true]:bg-gray-50" ,
        title: "font-normal text-medium data-[hover=true]:bg-gray-50",
        trigger: "px-2 py-0 data-[hover=true]:bg-gray-50 rounded-lg h-14 flex items-center bg-gray-50 ",
        indicator: "text-medium",
        content: "text-small px-2 data-[hover=true]:bg-gray-50",
    };
    return (
        <Accordion showDivider={false} itemClasses={itemClasses}>
            {subtopics.map((subtopic: Subtopic) => {
                const [title, subtitle] = subtopic.description!.split(':')
                const hasSubtopics = subtopic.subtopics?.length > 0
                return  (
                    <AccordionItem
                        key={subtopic.alt_id}
                        aria-label={`subtopic ${subtopic.alt_id}`}
                        subtitle={subtitle ?? ''}
                        title={
                            subtopic.is_referenced
                                ? (
                                    <Link
                                        href={`/subtopics/${subtopic.id}`}
                                        key={subtopic.alt_id}
                                        className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
                                        onClick={() => updateSubtopic({ id: String(subtopic.id), name: title })}
                                    >
                                        {title}
                                    </Link>
                                ) : title
                        }
                        hideIndicator={!hasSubtopics}
                        disableAnimation={!hasSubtopics}
                        disableIndicatorAnimation={!hasSubtopics}
                    >
                        {hasSubtopics ? <NestedSubtopics subtopics={subtopic.subtopics} /> : null}
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

export default SubtopicList;