import Link from 'next/link'

export default function Text({href = null, value}){
    return href !== null
        ? <Link href={href} prefetch={false}>
            {value}
          </Link>
        : <p>{value}</p>
}