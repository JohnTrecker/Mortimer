import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LinkedList from '../../components/LinkedList'
import Citation from '../../components/Citation'

export default function ReferencesList({supabase}) {
    const [references, setReferences] = useState([])
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchReferences, [id, supabase])
    
    if (error) router.push('/topics')

    return (
        <LinkedList data={references} path='/excerpt/'>
            <Citation/>
        </LinkedList>
    )

    function fetchReferences() {
        if (!id) return
        supabase
            .from('reference')
            .select(`
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
