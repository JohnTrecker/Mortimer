import Link from 'next/link'
import LinkedList from '../../components/LinkedList'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { mockResponse } from '../../utils'

export default function SubtopicList({supabase}) {
    const [subtopics, setSubtopics] = useState([])
    const [error, setError] = useState(null)
    const router = useRouter()
    const { id } = router.query

    useEffect(fetchSubtopics, [id, supabase])

    if (error) return (<p>Error fetching subtopics. Try again in a minute.</p>)

    return <LinkedList
                data={subtopics}
                path='/subtopics/'
                nameKey='description'
                indent
            />

    function fetchSubtopics(){
        if (!id) return
        supabase
            .from('subtopic')
            .select('id, alt_id, description, is_referenced')
            .eq('topic_id', id)
            .order('id', {ascending: true})
            .then(({data, error}) => {
                if (error?.message === 'FetchError: Network request failed') {
                    throw new Error()
                }
                setSubtopics(nestSubtopics(data))
            })
            .catch(err => {
                setError(err)
            })
    }


    function nestSubtopics(subs){ // TODO: format data in server
        const memo = {}
        const alpha = 'abcdefghijklmnopqrstuvwxyz'
            .split('')
            .reduce((memo, letter, number) => ({...memo, [letter]: number}), {})
        
        for (let sub of subs) {
            const { alt_id } = sub
            const [primary, secondary, tertiary] = alt_id.split('.')

            if (tertiary) {
                memo[primary].subtopics[alpha[secondary]].subtopics.push({...sub})
                continue
            }
            if (secondary) {
                memo[primary].subtopics.push({...sub, subtopics: []})
                continue
            }
            if (primary) {
                memo[primary] = {...sub, subtopics: []}
                continue
            }
        }

        return Object.values(memo)
    }
}
