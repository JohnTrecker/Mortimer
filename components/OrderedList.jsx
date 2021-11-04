import { cloneElement } from 'react'
import OrderedListItem from './OrderedListItem'
import styles from '../styles/OrderedList.module.css'

export default function OrderedList({ data, path, nameKey, children, indent = false }) {
    return (
        <ol>
            {data && data.map((item, i) => 
                <li key={`${item.id}-${i}`} style={indent && item.alt_id ? {marginLeft: indent(item.alt_id)} : null}>
                    {children
                        ? cloneElement(children, {path, ...item})
                        : <OrderedListItem
                            id={item.id}
                            path={path}
                            value={getValue(item.alt_id ?? item.id, item[nameKey])}
                            subItems={item.subtopics}
                            isReferenced={item.is_referenced ?? true}
                          /> 
                    }
                </li>
            )}
        </ol>
    )

    function indent(str){
        const level = str.split('.').length
        return level === 1
            ? null
            : `${level * 1}em`
    }

    function getValue(altId, description){
        return (
            <div className={styles.numbered}>
                <sup className={styles.alt}>{altId}.</sup>
                <p>{description}</p>
            </div>
        )
    }
}
