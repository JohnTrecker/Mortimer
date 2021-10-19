import Link from 'next/link'

export default function LinkedListItem({href, value}){
    return (
        <Link href={href}>   
            {value}
        </Link>
    )
}
