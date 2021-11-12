import {useState} from 'react'
import OrderedList from './OrderedList'
import Text from './Text'

export default function OrderedListItem({classes, href, value, subItems}){
    return subItems?.length > 0
        ? <details>
            <summary>
                <Text href={href} value={value}/>
            </summary>
            <OrderedList
                data={subItems}
                path='/subtopics/'
                nameKey='description'
                indent
            />
          </details>
        : <div className={classes}>
            <Text href={href} value={value}/>
          </div>
}
