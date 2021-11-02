import {cloneElement, useState} from 'react'
import Link from 'next/link'
import Chevron from './Chevron'

export default function Dropdown({header, href, children, className}){
    const [isShown, setIsShown] = useState(false)

    return (
        <>
            <div className={className}>
                {href
                    ? <Link href={href}>{header}</Link>
                    : <span>{header}</span>
                }
                <Chevron onClick={handleClick} expanded={isShown}/>
            </div>
            {
                isShown && cloneElement(children)
            }
        </>
    )

    function handleClick(){
     setIsShown(prev => !prev)
    }
}