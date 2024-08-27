// import OrderedList from '../../components/OrderedList'
// import Search from '../../components/Search'
// import Categories from '../../components/Categories'
// import PieChart from '../../components/Pie/Pie'
// import useSearch from '../../hooks/useSearch'
// import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { useFetch, useWindowSize } from '../../hooks'
import Icicle from '../../components/IcicleChart/Icicle'
import categories from '../../data/categories'

const TopicsList = ({supabase}) => {
    // const {data: topics, loading, error} = useFetch('topics', supabase)
    // const [data, input, search, clear] = useSearch(topics, 'name')
    // const {data: categories, loading, error} = useFetch('categories', supabase)
    const {width, height} = useWindowSize()

    // if (loading) return <p>loading...</p>
    // if (error) return <p>Oops, something broke. Please try again.</p>

    return (
        <Icicle data={categories} width={width} height={height}/>
    )
}

export default TopicsList;
// <>
    {/* <Search input={input} search={search} clear={clear}/>
    <OrderedList data={data} path='topics/' nameKey='name' /> */}
    {/* <Categories data={categories}/> */}
    {/* <ParentSize>{() => <PieChart categories={categories} supabase={supabase}/>}</ParentSize> */}
// </>