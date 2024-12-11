'use client'

import { useState, useEffect, useContext } from 'react'
import { useParams } from 'next/navigation'
import { SupabaseContext } from '@/context/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { extractExcerpt, mockResponse, nestSubtopics } from '@/utils'

const URI = {
    CATEGORIES: 'categories',
    TOPICS: 'topics',
    SUBTOPICS: 'subtopics',
    REFERENCES: 'references',
    EXCERPT: 'excerpt',
}

const fetchCategories = (supabase: SupabaseClient) => {
    return supabase
        .from('category')
        .select('id, category, topic(id, name, category_id, subtopics)')
        .order('id', {ascending: false})
        // .rpc('topicsbycategory')
        // .select('*')
}

const fetchTopics = (supabase: SupabaseClient) => {
    return supabase
        .from('topic')
        .select('id, name')
        .order('id', {ascending: true})
        // .from('topics')
        // .select('*')
}

const fetchSubtopics = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('subtopic')
        .select('id, alt_id, description, is_referenced') // TODO: convert to camelCase
        .eq('topic_id', id)
        .order('id', {ascending: true})
        // .rpc('get_subtopics_by_topic', { topic_id : id})
        // .select('*')
}

const fetchExcerpt = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('excerpt')
        .select('text')
        .eq('id', id)
        // .rpc('get_excerpt', {excerpt_id: id})
        // .select('*')
}

const fetchReferences = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('reference')
        .select('id,pages,work(author,title,translator),summary(summary),excerpt_id')
        .eq('subtopic_id', id)
        // .rpc('get_references_by_subtopic', {subtopic_id: id})
        // .select('*')
}

const _fetch = (uri: string, supabase: SupabaseClient, id?: string,) => {
    switch (uri) {
        case URI.CATEGORIES:
            return fetchCategories(supabase)
        case URI.TOPICS:
            return fetchTopics(supabase)
        case URI.SUBTOPICS:
            return fetchSubtopics(supabase, id ?? '')
        case URI.REFERENCES:
            return fetchReferences(supabase, id ?? '')
        case URI.EXCERPT:
            return fetchExcerpt(supabase, id ?? '')
    }
}

export const useFetch = (uri: string) => {
    const {supabase} = useContext(SupabaseContext)
    const [data, setData] = useState([])
    const [error, setError] = useState<Error | undefined>(undefined)
    const [loading, setLoading] = useState(true)
    let {id} = useParams()
    if (Array.isArray(id)) id = id[0]

    useEffect(() => {
        if (data.length || !supabase) return

        // @ts-expect-error Types undefinable
        const handleResponse = ({ data, error }) => {
            if (error?.message) {
                throw new Error(error)
            }
            switch (uri) {
                case URI.SUBTOPICS:
                    // @ts-expect-error Re-configure after migration
                    setData(nestSubtopics(data))
                    break;
                case URI.EXCERPT:
                    // @ts-expect-error Re-configure after migration
                    setData(extractExcerpt(data))
                    break;
                default:
                    setData(data)
            }
            setLoading(false)
        }

        const handleError = (err: Error) => {
            mockResponse(`/${uri}`)
                .then(mockData => {
                    switch (uri) {
                        case URI.SUBTOPICS:
                            // @ts-expect-error Re-configure after migration
                            setData(nestSubtopics(mockData))
                            break;
                        case URI.EXCERPT:
                            // @ts-expect-error Re-configure after migration
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


        // @ts-expect-error Re-configure after migration
        _fetch(uri, supabase, id)
        .then(handleResponse)
            // @ts-expect-error Re-configure after migration
            .catch(handleError);
    }, [uri, id, supabase, data.length])

    return {data, loading, error}
}