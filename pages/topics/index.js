import { useEffect, useState } from 'react'
import OrderedList from '../../components/OrderedList'
import { mockResponse } from '../../utils'

export default function TopicsList({supabase}) {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)

    useEffect(fetchTopics, [supabase])

    if (error) return <p>Oops, something broke. Please try again later.</p>

    return <OrderedList data={topics} path='topics/' nameKey='name' />

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
            .catch(err => setError(err))
    }
}
