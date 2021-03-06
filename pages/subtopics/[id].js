import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OrderedList from '/components/OrderedList'
import Citation from '/components/Citation'
import { mockResponse } from '/utils'
import { REFS_QUERY } from '/constants'

export default function ReferencesList({supabase}) {
    const [references, setReferences] = useState([])
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchReferences, [id, supabase])
    
    if (!references.length) return <p>Loading...</p>
    if (error) return <p>Error fetching references. Try again in a minute.</p>

    return (
        <OrderedList data={references} path='/excerpt/'>
            <Citation/>
        </OrderedList>
    )

    function fetchReferences() {
        if (!id) return
        supabase
            .from('reference')
            .select(REFS_QUERY)
            .eq('subtopic_id', id)
            .then(({data, error}) => {
                if (error?.message) throw new Error(error)
                setReferences(data)
            })
            .catch(err => {
                mockResponse('/references')
                    .then(mockData => setReferences(mockData))
                    .catch(_ => setError(err))
            })
        }
}
