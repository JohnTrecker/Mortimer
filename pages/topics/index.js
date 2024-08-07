import OrderedList from '../../components/OrderedList'
import Search from '../../components/Search'
import Categories from '../../components/Categories'
import useSearch from '../../hooks/useSearch'
import { useFetch } from '../../hooks/useFetch'

const TopicsList = ({supabase}) => {
    const {data: topics, loading, error} = useFetch('topics', supabase)
    const [data, input, search, clear] = useSearch(topics, 'name')

    if (loading) return <p>loading...</p>
    if (error) return <p>Oops, something broke. Please try again.</p>

    return (
        <>
            <Search input={input} search={search} clear={clear}/>
            <OrderedList data={data} path='topics/' nameKey='name' />
        </>
    )
}

export default TopicsList;