import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import styles from '../../styles/References.module.css'

const References = ({supabase}) => {
    const [references, setReferences] = useState([])
    const [error, setError] = useState(false)
    const [selected, setSelected] = useState(null)

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const fetchReferences = async () => {
            const {data, error} = await supabase
                .from('reference')
                .select(`
                    pages,
                    work(
                        author,
                        title,
                        translator
                    ),
                    summary(
                        summary
                    ),
                    excerpt_id
                `)
                .eq('subtopic_id', id);
            setReferences(data)
            setError(error)
        }

        fetchReferences()
    }, [])

    if (error) router.push(`/subtopics/${id}`)

    return (
        <ul>
            {references && references.map(ref => {
                const citation = `${ref.work.title}, ${ref.work.author}`
                return (
                    <li key={ref.id} className={styles.item}>
                        <p className={styles.summary}>{ref.summary.summary}</p>
                        
                        <div className={styles.citation}>
                            <p>{citation}</p>
                            <div className={styles.reference}>
                                <p>(</p>
                                <p className={styles.link}>
                                    <Link
                                        href={`/excerpt/${ref.excerpt_id}`}
                                        >
                                        {` ${ref.pages} `}
                                    </Link>
                                </p>
                                <p>)</p>
                            </div>
                        </div>

                    </li>
                )
            }
            )}
        </ul>
    )
}

export default References