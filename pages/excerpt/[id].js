import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/References.module.css'

const Excerpt = ({supabase}) => {
    const [excerpt, setExcerpt] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchExcerpt, [id, supabase])

    if (error) router.push(`/topics`)

    return (
        <p style={styles.excerpt}>{excerpt}</p>
    )

    function fetchExcerpt() {
        if (!id) return
        supabase
            .from('excerpt')
            .select('text')
            .eq('id', id)
            .then(({data, error}) => {
                if (Array.isArray(data) && data.length > 0) setExcerpt(data[0].text)
                setError(error)
            })
    }

}

export default Excerpt