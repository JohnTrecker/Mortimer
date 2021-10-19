import Link from 'next/link'
import LinkedList from '../../components/LinkedList'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { flattenSubtopics, mockResponse } from '../../utils'

export default function SubtopicList({supabase}) {
    const [subtopics, setSubtopics] = useState([])
    const [error, setError] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(fetchSubtopics, [id, supabase])

    if (error) return (<p>Error fetching subtopics</p>)

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
                if (error?.message === 'FetchError: Network request failed') {
                    throw new Error()
                }
                setSubtopics(data)
            })
            .catch(_err => {
                mockResponse(`/subtopics?id=${id}`)
                    .then(data => data.json())
                    .then(data => setSubtopics(data[0]?.subtopics))
                    .catch(err => {
                        setError(err)
                    })
            })
    }
}
