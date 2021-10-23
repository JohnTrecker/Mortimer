import { cloneElement } from 'react'
import LinkedListItem from './LinkedListItem'
import styles from '../styles/LinkedList.module.css'

export default function LinkedList({ data, path, nameKey, children, indent = false }) {
    return (
        <ul>
            {data && data.map((item, i) => 
                <li
                    key={`${item.id}-${i}`}
                    style={indent && item.alt_id ? {marginLeft: indent(item.alt_id)} : null}
                >
                    {children
                        ? cloneElement(children, {path, ...item})
                        : <LinkedListItem
                            id={item.id}
                            path={path}
                            value={getValue(item.alt_id ?? item.id, item[nameKey])}
                            subItems={item.subtopics}
                          /> 
                    }
                </li>
            )}
        </ul>
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
