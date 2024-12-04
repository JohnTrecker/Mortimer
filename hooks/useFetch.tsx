'use client'

import { useState, useEffect, useContext } from 'react'
import { SupabaseContext } from '@/context/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { extractExcerpt, mockResponse, nestSubtopics } from '@/utils'
import { useParams } from 'next/navigation'

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
}

const fetchTopics = (supabase: SupabaseClient) => {
    return supabase
        .from('topic')
        .select('id, name')
        .order('id', {ascending: true})
}

const fetchSubtopics = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('subtopic')
        .select('id, alt_id, description, is_referenced') // TODO: convert to camelCase
        .eq('topic_id', id)
        .order('id', {ascending: true})
}

const fetchExcerpt = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('excerpt')
        .select('text')
        .eq('id', id)
}

const fetchReferences = (supabase: SupabaseClient, id: string) => {
    return supabase
        .from('reference')
        .select('id,pages,work(author,title,translator),summary(summary),excerpt_id')
        .eq('subtopic_id', id)
}

interface Fetch { uri: string, id: string, supabase: SupabaseClient }

const _fetch = ({uri, id, supabase}: Fetch) => {
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

export const useFetch = (uri: string) => {
    const {supabase} = useContext(SupabaseContext)
    const [data, setData] = useState([])
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    useEffect(() => {
        if (data.length) return
        if (!supabase) return

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