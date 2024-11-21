import React, {useContext} from 'react'
import { useFetch } from '@/hooks/useFetch'
import OrderedList from '@/components/OrderedList';
import Citation from '@/components/Citation';

interface Props {
    id: string;
}

export default function References({id}: Props) {
    const {data} = useFetch('references', id)
    const {work, summary, pages, path, excerpt_id} = data
    // interface Props {
    //     id: string,
    //     work: {
    //         title: string;
    //         author: string;
    //     };
    //     summary: {
    //         summary: string;
    //     };
    //     pages: string;
    //     path: string;
    //     excerpt_id: string;
    // }
    return  (
        <OrderedList data={data} path='/excerpt/' nameKey='summary'>
            <Citation
                work={work}
                summary={summary}
                pages={pages}
                path={path}
                excerpt_id={excerpt_id}
            />
            {/* <>heres a citation.</> */}
        </OrderedList>
    )
}