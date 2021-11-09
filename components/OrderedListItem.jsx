import {useState} from 'react'
import Link from 'next/link'
import OrderedList from './OrderedList'
import Dropdown from './Dropdown'

export default function OrderedListItem({classes, href, value, subItems}){
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
