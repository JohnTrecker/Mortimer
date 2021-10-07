import { cloneElement } from 'react'
import Link from 'next/link'

export default function LinkedList({ data, path, nameKey, indent = false, children }) {
    return (
        <ul>
            {data && data.map(item => 
                <li key={item.id}>
                    {children
                        ? cloneElement(children, {path, ...item})
                        : (
                            <Link
                                href={`${path}${item.id}`}
                                style={indent ? {textIndent: getIndention(item.alt_id)} : {}}
                            >   
                                {item[nameKey]}
                            </Link>
                        ) 
                    }
                </li>
            )}
        </ul>
    )

    function getIndention(str){
        const level = str.split('.').length
        return level === 1
            ? `20px`
            : `${level * 20}px`
    }
}
