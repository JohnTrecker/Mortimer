import { cloneElement } from 'react'
import OrderedListItem from './OrderedListItem'
import { getOrderedListItemDetails } from '../utils'
import styles from '/styles/OrderedList.module.css'

export default function OrderedList({ data, path, nameKey, children, indent = false }) {
    return (
        <ol>
            {data && data.map((item, i) => {
                const { id, subtopics, alt_id: altId, is_referenced: isReferenced = true } = item
                const { classes, href } = getOrderedListItemDetails(id, path, isReferenced)

                return <li key={`${id}-${i}`} className={indent(altId)}>
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

    function indent(altId){
        if (!indent || !altId) return null
        const className = `indent-${altId.split('.')?.length}`
        const classRef = styles[className] ?? styles['indent-1']
        return indent ? classRef : null
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
