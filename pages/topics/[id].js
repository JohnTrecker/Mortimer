import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Topic = ({supabase}) => {
    const [subtopics, setSubtopics] = useState([])
    const [error, setError] = useState(false)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const fetchSubtopics = async () => {
            const {data, error} = await supabase
                .from('subtopic')
                .select('id, alt_id, description')
                .eq('topic_id', id);
            
            setSubtopics(data)
            setError(error)
        }

        fetchSubtopics()
    }, [])

    if (error) router.push('/topics')

    return (
        <ul>
            {subtopics && subtopics.map(sub => {
                let indent = sub.alt_id.split('.').length
                let style = {
                    textIndent: `${indent * 20}px`,
                }
                return (
                    <li key={sub.id} style={style}>
                        <Link
                            href={`/subtopics/${sub.id}`}
                        >
                            {sub.description}
                        </Link>
                    </li>

                )
            })}
        </ul>
    )
}

export default Topic