import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mockResponse } from '/utils'
import styles from '../../styles/References.module.css'

const Excerpt = ({supabase}) => {
    const [excerpt, setExcerpt] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchExcerpt, [id, supabase])

    if (error) return <p>Error fetching excerpt. Try again in a minute.</p>

    return (
        <p className={styles.excerpt}>{excerpt}</p>
    )

    function fetchExcerpt() {
        if (!id) return
        supabase
            .from('excerpt')
            .select('text')
            .eq('id', id)
            .then(({data, error}) => {
                if (error?.message === 'FetchError: Network request failed') {
                    throw new Error(error)
                }
                setExcerpt(getText(data))
                setError(error)
            })
            .catch(err => {
                mockResponse('/excerpts')
                    .then(mockData => setExcerpt(getText(mockData)))
                    .catch(_ => setError(err))
            })

    }

    function getText(data){
        let text = ''
        if (Array.isArray(data) && data.length > 0) text = data[0]?.text
        return text
    }
}

export default Excerpt