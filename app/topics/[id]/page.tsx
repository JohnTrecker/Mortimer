'use client'

import OrderedList from '@/components/OrderedList'
import { useFetch } from '@/hooks/useFetch'

const SubtopicList = () => {
    const { data, loading, error } = useFetch('subtopics')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error fetching subtopics. Try again in a minute.</p>

    return <OrderedList
                data={data}
                path='/subtopics/'
                nameKey='description'
                indent
            />
}

export default SubtopicList;