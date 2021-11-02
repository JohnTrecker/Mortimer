import {useState} from 'react'
import Link from 'next/link'
import LinkedList from './LinkedList'
import Dropdown from './Dropdown'

export default function LinkedListItem({id, path, value, subItems, isReferenced}){
    const href = isReferenced ? `${path}${id}` : null
    const classes = 'row'.concat(isReferenced ? ' link' : '')

    return subItems?.length > 0
        ? <Dropdown className={classes} header={value} href={href}>
                <LinkedList
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
