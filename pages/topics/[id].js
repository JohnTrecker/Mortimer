import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LinkedList from '../../components/LinkedList'

export default function SubtopicList({supabase}) {
    const [subtopics, setSubtopics] = useState([])
    const [error, setError] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(fetchSubtopics, [id, supabase])

    if (error) router.push('/topics')

    return <LinkedList
                data={subtopics}
                path='/subtopics/'
                nameKey='description'
                indent
            />

    function fetchSubtopics(){
        if (!id) return
        supabase
            .from('subtopic')
            .select('id, alt_id, description')
            .eq('topic_id', id)
            .then(({data, error}) => {
                setSubtopics(data)
                setError(error)
            })
            .catch(err => setError(err.message))
    }
}
