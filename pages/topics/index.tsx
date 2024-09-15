import { useFetch, useWindowSize } from '@/hooks'
import Icicle from '@/components/IcicleChart/Icicle'

const TopicsList = () => {
    const {data: categories, loading, error} = useFetch('categories')
    const {width, height} = useWindowSize()

    if (loading) return <p>loading...</p>
    if (error) return <p>Oops, something broke. Please try again.</p>

    return (
        <Icicle data={categories} width={width} height={height}/>
    )
}

export default TopicsList;

// PieChart usage (for desktop-sized media):
// <>
//      <ParentSize>{() => <PieChart categories={categories} supabase={supabase}/>}</ParentSize>
// </>