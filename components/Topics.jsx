import { useEffect, useState } from "react"
import Link from 'next/link'

const Topics = ({ supabase }) => {
    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        const fetchTopics = async () => {
            let {data, error} = await supabase
                .from('topic')
                .select('*')
                
            setTopics(data)
        }

        fetchTopics()
    }, [])

    return (
        <ul>
            {topics.map(topic => 
                <Link
                    key={topic.id}
                    href={`topics/${topic.id}`}
                >
                    {topic.name}
                </Link>
            )}
        </ul>
    )
}

export default Topics