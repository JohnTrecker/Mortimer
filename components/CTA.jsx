import Link from 'next/link'
import styles from '/styles/container.module.css'
import { Button } from '@nextui-org/react'

export default function CTA(){
    return (
        <div className={styles.flexColumn}>
            <blockquote>{"Read the best books first or you may not have a chance to read them at all."}</blockquote>
            <br/>
            <cite>{"Henry David Thoreau"}</cite>
            <br/>
            <br/>
            <br/>
            <Link href="/topics" passHref={true}>
                <Button color="warning" variant="flat">Explore by Topic</Button>
            </Link>
        </div>
    )
}