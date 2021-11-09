import { useEffect, useState } from 'react'
import OrderedList from '../../components/OrderedList'
import Search from '../../components/Search'
import { mockResponse } from '../../utils'

export default function TopicsList({supabase}) {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')

    useEffect(fetchTopics, [supabase])

    if (error) return <p>Oops, something broke. Please try again later.</p>
    let filteredTopics = topics.filter(top => top.name.includes(search))

    return (
        <>
            <Search input={search} search={handleSearch} clear={cancelSearch}/>
            <OrderedList data={filteredTopics} path='topics/' nameKey='name' />
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
    }

    function handleSearch(e){ setSearch(e.target.value ?? '') }
    function cancelSearch(_){ setSearch('') }
}
