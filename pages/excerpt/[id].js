import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { extractExcerpt, mockResponse } from '/utils'
import Text from '/components/Text'

const Excerpt = ({supabase}) => {
    const [excerpt, setExcerpt] = useState('')
    const [error, setError] = useState(false)

    const router = useRouter()
    const { id } = router.query

    useEffect(fetchExcerpt, [id, supabase])

    if (error) return <p>Error fetching excerpt. Try again in a minute.</p>

    return <Text value={excerpt} />

    function fetchExcerpt() {
        if (!id) return
        supabase
            .from('excerpt')
            .select('text')
            .eq('id', id)
            .then(({data, error}) => {
                if (error?.message) throw new Error(error)
                setExcerpt(extractExcerpt(data)) // TODO: extract in server
            })
            .catch(err => {
                mockResponse('/excerpts')
                    .then(mockData => setExcerpt(extractExcerpt(mockData)))
                    .catch(_ => setError(err))
            })

    }
}

export default Excerpt