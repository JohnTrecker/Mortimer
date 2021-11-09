import { useEffect, useState } from 'react'
import useSearch from '../../hooks/useSearch'
import OrderedList from '../../components/OrderedList'
import Search from '../../components/Search'
import { mockResponse } from '../../utils'

export default function TopicsList({supabase}) {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [data, input, search, clear] = useSearch(topics, 'name')

    useEffect(fetchTopics, [supabase])

    if (error) return <p>Oops, something broke. Please try again later.</p>

    return (
        <>
            <Search input={input} search={search} clear={clear}/>
            <OrderedList data={data} path='topics/' nameKey='name' />
        </>
    )

    function fetchTopics(){
        supabase
            .from('topic')
            .select('id, name')
            .order('id', {ascending: true})
            .then(({data, error}) => {
                if (error?.message) {
                    throw new Error(error)
                }
                setTopics(data)
            })
            .catch(err => {
                mockResponse('/topics')
                    .then(mockData => setTopics(mockData))
                    .catch(_ => setError(err))
            })
    }[]
}
