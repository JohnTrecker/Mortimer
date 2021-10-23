import {cloneElement, useState} from 'react'
import Link from 'next/link'
import Chevron from './Chevron'

export default function Dropdown({header, href, children}){
    const [isShown, setIsShown] = useState(false)
    
    return (
        <>
            <div className="row">
                <Link href={href}>{header}</Link>
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