import { useEffect, useState } from 'react'
import LinkedList from '../../components/LinkedList'

export default function TopicsList({supabase}) {
    const [topics, setTopics] = useState([])
    const [error, setError] = useState(null)

    useEffect(fetchTopics, [supabase])

    function fetchTopics(){
        supabase
            .from('topic')
            .select('*')
            .then(({data, error}) => {
                setTopics(data)
                setError(error)
            })
            .catch(err => setError(err.message))
    }

    return <LinkedList data={topics} path='topics/' nameKey='name' />
}
