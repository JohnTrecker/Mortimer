import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Excerpt = ({supabase}) => {
    const [excerpt, setExcerpt] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const fetchExcerpt = async () => {
            const {data, error} = await supabase
                .from('excerpt')
                .select('text')
                .eq('id', id);
            
            if (data) {
                setExcerpt(data[0].text)
            }
            setError(error)
        }

        fetchExcerpt()
    }, [])

    if (error) router.push(`/topics`)

    return (
        <p style={{margin:15}}>{excerpt}</p>
    )
}

export default Excerpt