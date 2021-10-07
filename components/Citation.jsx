import styles from '../styles/References.module.css'
import Link from 'next/link'

export default function Citation({work, summary, pages, path, excerpt_id}){
    const citation = `${work.title}, ${work.author}`
    return (
        <>
            <p className={styles.summary}>{summary.summary}</p>
            
            <div className={styles.citation}>
                <p>{citation}</p>
                <div className={styles.reference}>
                    <p>(</p>
                    <Link
                        href={`${path}${excerpt_id}`}
                        passHref
                    >
                        <p className={styles.link}>{` ${pages} `}</p>
                    </Link>
                    <p>)</p>
                </div>
            </div>
        </>
    )
}