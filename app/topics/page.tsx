'use client'

import OrderedList from '@/components/OrderedList'
import Search from '@/components/Search'
import useSearch from '@/hooks/useSearch'
import { useFetch } from '@/hooks/useFetch'
// import Categories from '@/components/Categories'
// import PieChart from '@/components/Pie/Pie'
// import ParentSize from '@visx/responsive/lib/components/ParentSize';


const TopicsList = () => {
    const {data: topics, loading, error} = useFetch('topics')
    // const {data: categories, loading, error} = useFetch('categories', supabase)
    const [data, input, search, clear] = useSearch(topics, 'name')

    if (loading) return <p>loading...</p>
    if (error) return <p>Oops, something broke. Please try again.</p>

    return (
        <>

            <Search input={input} search={search} clear={clear}/>
            <OrderedList data={data} path='topics/' nameKey='name' />
            {/* <Categories data={categories}/> */}
            {/* <ParentSize>{() => <PieChart categories={categories} supabase={supabase}/>}</ParentSize> */}
        </>
    )
}

export default TopicsList;