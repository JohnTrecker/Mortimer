import Text from '/components/Text'
import { useFetch } from '../../hooks/useFetch'

const Excerpt = ({supabase}) => {
    const {data, loading, error} = useFetch('excerpt', supabase)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error fetching excerpt. Try again in a minute.</p>

    return <Text value={data} />
}

export default Excerpt