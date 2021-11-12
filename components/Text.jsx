import Link from 'next/link'

export default function Text({href = null, value}){
    return href !== null
        ? <Link href={href} prefetch={false}>
            <a>{value}</a>
          </Link>
        : <p>{value}</p>
}