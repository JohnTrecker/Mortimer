import OrderedList from '../../components/OrderedList'
import Search from '../../components/Search'
import Categories from '../../components/Categories'
import PieChart from '../../components/Pie/Pie'
import useSearch from '../../hooks/useSearch'
import { useFetch } from '../../hooks/useFetch'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Icicle from '../../components/IcicleChart/Icicle'
import data from '../../data/zoomable-icicle-data.json';
import { scaleOrdinal, quantize, hierarchy as _hierarchy, interpolateRainbow, partition, create, format as _format, HierarchyRectangularNode} from 'd3';


const TopicsList = ({supabase}) => {
    // const {data: topics, loading, error} = useFetch('topics', supabase)
    // const {data: categories, loading, error} = useFetch('categories', supabase)
    // const [data, input, search, clear] = useSearch(topics, 'name')

    // if (loading) return <p>loading...</p>
    // if (error) return <p>Oops, something broke. Please try again.</p>
    // Specify the chart’s dimensions.
    const width = 928;
    const height = 1200;

    // Compute the layout.
    const hierarchy = _hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.height - a.height || b.value - a.value);
    const initialRoot = partition()
        .size([height, (hierarchy.height + 1) * width / 3])
        (hierarchy);

    console.log({hierarchy, _hierarchy: _hierarchy(data), initialRoot})


    return (
        <Icicle initialRoot={initialRoot} width={928} height={1200}/>
    )
}

export default TopicsList;
// <>
    {/* <Search input={input} search={search} clear={clear}/>
    <OrderedList data={data} path='topics/' nameKey='name' /> */}
    {/* <Categories data={categories}/> */}
    {/* <ParentSize>{() => <PieChart categories={categories} supabase={supabase}/>}</ParentSize> */}
// </>