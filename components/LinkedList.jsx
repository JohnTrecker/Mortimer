import { cloneElement } from 'react'
import LinkedListItem from './LinkedListItem'
import styles from '../styles/LinkedList.module.css'

export default function LinkedList({ data, path, nameKey, indent = false, children }) {
    return (
        <ul>
            {data && data.map(item => 
                <li
                    key={item.id}
                    style={indent ? {marginLeft: getIndention(item.alt_id)} : null}
                >
                    {children
                        ? cloneElement(children, {path, ...item})
                        : <LinkedListItem href={`${path}${item.id}`} value={getValue(item.alt_id ?? item.id, item[nameKey])}/> 
                    }
                </li>
            )}
        </ul>
    )

    function getIndention(str){
        const level = str.split('.').length
        return level === 1
            ? null
            : `${level * 2}em`
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
