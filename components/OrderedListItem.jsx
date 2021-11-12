import {useState} from 'react'
import Link from 'next/link'
import OrderedList from './OrderedList'

export default function OrderedListItem({classes, href, value, subItems}){
    return subItems?.length > 0
        ? <details>
            <summary>
                <Link href={href} prefetch={false}>
                    <a>{value}</a>
                </Link>
            </summary>
            <OrderedList
                data={subItems}
                path='/subtopics/'
                nameKey='description'
                indent
            />
          </details>
        : <div className={classes}>
            <Link href={href} prefetch={false}>
                <a>{value}</a>
            </Link>
          </div>
}
