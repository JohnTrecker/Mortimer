import OrderedList from '@/components/OrderedList'
import Citation from '@/components/Citation'
import { useFetch } from '@/hooks/useFetch'

const ReferencesList = () => {
    const {data, loading, error} = useFetch('references')

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error fetching references. Try again in a minute.</p>

    return (
        <OrderedList data={data} path='/excerpt/'>
            <Citation/>
        </OrderedList>
    )
}

export default ReferencesList;
