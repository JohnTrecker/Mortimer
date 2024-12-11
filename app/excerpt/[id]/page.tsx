'use client'

import Loading from '@/app/loading'
import { useFetch } from '@/hooks/useFetch'

const Excerpt = () => {
    const {data, loading, error} = useFetch('excerpt')

    if (loading) return <Loading />
    if (error) return <p>Error fetching excerpt. Try again in a minute.</p>

    return <p className='m-8'>{data}</p>
}

export default Excerpt