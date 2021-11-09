import Link from 'next/link'
import OrderedList from '/components/OrderedList'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mockResponse, nestSubtopics } from '/utils'

export default function SubtopicList({supabase}) {
    const [subtopics, setSubtopics] = useState([])
    const [error, setError] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(fetchSubtopics, [id, supabase])

    if (!subtopics.length) return <p>Loading...</p>
    if (error) return <p>Error fetching subtopics. Try again in a minute.</p>

    return <OrderedList
                data={subtopics}
                path='/subtopics/'
                nameKey='description'
                indent
            />

    function fetchSubtopics(){
        if (!id) return
        supabase
            .from('subtopic')
            .select('id, alt_id, description, is_referenced') // TODO: convert to camelCase
            .eq('topic_id', id)
            .order('id', {ascending: true})
            .then(({data, error}) => {
                if (error?.message) throw new Error(error)
                setSubtopics(nestSubtopics(data))
            })
            .catch(err => {
                mockResponse('/subtopics')
                    .then(mockData => setSubtopics(nestSubtopics(mockData))) // TODO: nest in server
                    .catch(_ => setError(err))
            })
    }
}
