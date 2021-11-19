import { cloneElement } from 'react'
import OrderedListItem from './OrderedListItem'
import { getOrderedListItemDetails } from '../utils'
import styles from '/styles/OrderedList.module.css'

export default function OrderedList({ data, path, nameKey, children, indent: shouldIndent = false }) {
    return (
        <ol>
            {data && data.map((item, i) => {
                const { id, subtopics, alt_id: altId } = item
                const { classes, href } = getOrderedListItemDetails(item, path)
                const indentClass = indent(item, shouldIndent)

                return <li key={`${id}-${i}`} className={indentClass}>
                    {children
                        ? cloneElement(children, {path, ...item})
                        : <OrderedListItem
                            classes={classes}
                            href={href}
                            value={getValue(altId ?? id, item[nameKey])}
                            subItems={subtopics}
                          /> 
                    }
                </li>
            })}
        </ol>
    )

    function indent(item, indent){
        const {alt_id: altId, subtopics} = item
        if (!indent || !altId) return null
        
        const hasSubtopics = Array.isArray(subtopics) && subtopics.length > 0
        let level = altId.split('.')?.length        
        if (level === 1 && hasSubtopics) level = 0
        if (level === 1 && !hasSubtopics) level = 1
        if (level > 1) level = 1
        
        return styles[`indent-${level}`] ?? styles['indent-1']
    }

    function getValue(id, description){
        return (
            <div className={styles.numbered}>
                <sup className={styles.alt}>{id}.</sup>
                <p>{description}</p>
            </div>
        )
    }
}
