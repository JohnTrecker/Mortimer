import {useState} from 'react'
import Link from 'next/link'
import OrderedList from './OrderedList'
import Dropdown from './Dropdown'

export default function OrderedListItem({id, path, value, subItems, isReferenced}){
    const href = isReferenced ? `${path}${id}` : null
    const classes = 'row'.concat(isReferenced ? ' link' : '')

    return subItems?.length > 0
        ? <Dropdown className={classes} header={value} href={href}>
                <OrderedList
                    data={subItems}
                    path='/subtopics/'
                    nameKey='description'
                    indent
                />
            </Dropdown>
        : <div className={classes}>
            <Link href={href}>{value}</Link>
          </div>
}
