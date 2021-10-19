import { useEffect, useState } from 'react'
import LinkedList from '../../components/LinkedList'
import { mockResponse } from '../../utils'

export default function TopicsList({supabase}) {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)

    useEffect(fetchTopics, [supabase])

    function fetchTopics(){
        supabase
            .from('topic')
            .select('*')
            .then(({data, error}) => {
                if (error?.message === 'FetchError: Network request failed') {
                    throw new Error()
                }
                setTopics(data)
            })
            .catch(_err => {
                mockResponse('/topics')
                    .then(data => data.json())
                    .then(data => setTopics(data))
                    .catch(err => setError(err))
            })
    }

    if (error) return <p>Oops, something broke. Please try again later.</p>

    return <LinkedList data={topics} path='topics/' nameKey='name' />
}
