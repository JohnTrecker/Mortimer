import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OrderedList from '../../components/OrderedList'
import Citation from '../../components/Citation'

export default function ReferencesList({supabase}) {
    const [references, setReferences] = useState([])
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchReferences, [id, supabase])
    
    if (error) router.push('/topics')

    return (
        <OrderedList data={references} path='/excerpt/'>
            <Citation/>
        </OrderedList>
    )

    function fetchReferences() {
        if (!id) return
        supabase
            .from('reference')
            .select(`
                id,
                pages,
                work(
                    author,
                    title,
                    translator
                ),
                summary(
                    summary
                ),
                excerpt_id
            `)
            .eq('subtopic_id', id)
            .then(({data, error}) => {
                setReferences(data)
                setError(error)
            })
            .catch(err => err.message)
        }
}
