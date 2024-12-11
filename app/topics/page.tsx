'use client'

import Link from 'next/link'
import { useContext } from 'react'
import Loading from '@/app/loading'
import { SelectionDispatchContext } from '@/context/selection'
import { useFetch } from '@/hooks/useFetch'


const TopicsList = () => {
    const { updateTopic } = useContext(SelectionDispatchContext)
    const { data: topics, loading, error } = useFetch('topics')
    // const {data: categories, loading, error} = useFetch('categories')
    // const [data, search, clear] = useSearch(topics, 'name')

    if (loading) return <Loading />
    if (error) return <p>Oops, something broke. Please try again.</p>

    return (
        <div className="container mx-auto flex col w-50 justify-center px-3">
            {/* <Search search={search} clear={clear}/> */}
            <ol className='ml-14'>
                {
                    topics.map((topic: {id: number, name: string}) => (
                        <li key={topic.id} className="list-[upper-roman]">
                            <Link
                                href={`topics/${topic.id}`}
                                prefetch={false}
                                onClick={() => updateTopic({id: String(topic.id), name: topic.name})}
                            >
                                {topic.name}
                            </Link>
                        </li>
                    ))
                }
            </ol>
            {/* <OrderedList data={data} path='topics/' nameKey='name'></OrderedList> */}
            {/* <Categories data={categories}/> */}
            {/* <ParentSize>{() => <PieChart categories={categories} supabase={supabase}/>}</ParentSize> */}
        </div>
    )
}

export default TopicsList;