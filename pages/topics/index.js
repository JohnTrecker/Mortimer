import { SupabaseClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Topics = ({supabase}) => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
        const fetchTopics = async () => {
            const {data, error} = await supabase
                .from('topic')
                .select('*');

            setTopics(data)
        }

        fetchTopics()
    }, [])

    return (
        <ul>
            {topics.map(topic => (
                <li key={topic.id}>
                    <Link
                        href={`topics/${topic.id}`}
                    >
                        {topic.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Topics