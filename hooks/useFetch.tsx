import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import { extractExcerpt, mockResponse, nestSubtopics } from '../utils'

const URI = {
    CATEGORIES: 'categories',
    TOPICS: 'topics',
    SUBTOPICS: 'subtopics',
    REFERENCES: 'references',
    EXCERPT: 'excerpt',
}

const fetchCategories = (supabase) => {
    return supabase
        .from('category')
        .select('name:category, id, children:topic(id, name, category_id, children:subtopic(id, alt_id, name:description, is_referenced))')
        .order('id', {descending: true})
}

const fetchTopics = (supabase) => {
    return supabase
        .from('topic')
        .select('id, name')
        .order('id', {ascending: true})
}

const fetchSubtopics = (supabase, id) => {
    return supabase
        .from('subtopic')
        .select('id, alt_id, description, is_referenced') // TODO: convert to camelCase
        .eq('topic_id', id)
        .order('id', {ascending: true})
}

const fetchExcerpt = (supabase, id) => {
    return supabase
        .from('excerpt')
        .select('text')
        .eq('id', id)
}

const fetchReferences = (supabase, id) => {
    return supabase
        .from('reference')
        .select('id,pages,work(author,title,translator),summary(summary),excerpt_id')
        .eq('subtopic_id', id)
}

const _fetch = ({uri, id, supabase}) => {
    switch (uri) {
        case URI.CATEGORIES:
            return fetchCategories(supabase)
        case URI.TOPICS:
            return fetchTopics(supabase)
        case URI.SUBTOPICS:
            return fetchSubtopics(supabase, id)
        case URI.REFERENCES:
            return fetchReferences(supabase, id)
        case URI.EXCERPT:
            return fetchExcerpt(supabase, id)
    }
}


export const useFetch = (uri: string, supabase) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (data.length) return

        const handleResponse = ({data, error}) => {
            if (error?.message) {
                throw new Error(error)
            }
            switch (uri) {
                case URI.SUBTOPICS:
                    setData(nestSubtopics(data))
                    break;
                case URI.EXCERPT:
                    setData(extractExcerpt(data))
                    break;
                default:
                    setData(data)
            }
            setLoading(false)
        }
        
        const handleError = (err: any) => {
            mockResponse(`/${uri}`)
                .then(mockData => {
                    switch (uri) {
                        case URI.SUBTOPICS:
                            setData(nestSubtopics(mockData))
                            break;
                        case URI.EXCERPT:
                            setData(extractExcerpt(mockData))
                            break;
                        default:
                            setData(mockData);
                    }
                    setLoading(false);
                })
                .catch(() => {
                    setError(err);
                    setLoading(false);
                })
            }
        
        _fetch({uri, id, supabase})
            .then(handleResponse)
            .catch(handleError);
    }, [uri, id])

    return {data, loading, error}
}