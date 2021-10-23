import {useState} from 'react'
import Link from 'next/link'
import LinkedList from './LinkedList'
import Dropdown from './Dropdown'

export default function LinkedListItem({id, path, value, subItems}){
    const href = `${path}${id}`
    
    return subItems?.length > 0
        ? <Dropdown header={value} href={href}>
                <LinkedList
                    data={subItems}
                    path='/subtopics/'
                    nameKey='description'
                    indent
                />
            </Dropdown>
        : <div className='row'>
            <Link href={href}>{value}</Link>
          </div>
}
