// 'use client'

// import { useState, useEffect } from 'react';
// import { extractExcerpt, mockResponse, nestSubtopics } from '@/utils'
// import { Database, Tables, Enums } from "@/utils/database.types";
// import { SupabaseClient } from '@supabase/supabase-js';

// const URI = {
//     CATEGORIES: 'categories',
//     TOPICS: 'topics',
//     SUBTOPICS: 'subtopics',
//     REFERENCES: 'references',
//     EXCERPT: 'excerpt',
// }

// // const insertCategory = (supabase: SupabaseClient) => {
// //     return supabase
// //         .from('category')
// //         .from('topic')
// //         .insert({})
// //         .order('id', { descending: true })
// // }

// // const insertTopic = (supabase: SupabaseClient) => {
// //     return supabase
// //         .insert({})
// //         .order('id', { ascending: true })
// // }

// // const insertSubtopic = (supabase: SupabaseClient, id) => {
// //     return supabase
// //         .from('subtopic')
// //         .insert({})
// //         .eq('topic_id', id)
// //         .order('id', { ascending: true })
// // }

// // const insertExcerpt = (supabase: SupabaseClient, id) => {
// //     return supabase
// //         .from('excerpt')
// //         .insert({})
// //         .eq('id', id)
// // }

// const insertReference = (supabase: SupabaseClient, entry: Tables<'reference'>) => {
//     return supabase
//         .from('reference')
//         .insert(entry)
//         .select()
// }

// interface InsertArgs {
//     uri: string;
//     entry: string;
//     supabase: SupabaseClient;
// }

// const _insert = ({ uri, entry, supabase }: InsertArgs) => {
//     switch (uri) {
//         // case URI.CATEGORIES:
//         //     return insertCategory(supabase: SupabaseClient)
//         // case URI.TOPICS:
//         //     return insertTopic(supabase: SupabaseClient)
//         // case URI.SUBTOPICS:
//         //     return insertSubtopic(supabase: SupabaseClient, entry)
//         case URI.REFERENCES:
//             return insertReference(supabase: SupabaseClient, entry)
//         // case URI.EXCERPT:
//         //     return insertExcerpt(supabase: SupabaseClient, entry)
//         default:
//             return 
//     }
// }

// export const useInsert = (uri: string, entry, supabase) => {
//     const [response, setResponse] = useState(null)
//     const [error, setError] = useState(undefined)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         if (!entry) return

//         const handleResponse = ({ data, error }) => {
//             if (error?.message) {
//                 throw new Error(error)
//             }
//             switch (uri) {
//                 // case URI.SUBTOPICS:
//                 //     setResponse(nestSubtopics(data))
//                 //     break;
//                 // case URI.EXCERPT:
//                 //     setResponse(extractExcerpt(data))
//                 //     break;
//                 default:
//                     setResponse(data)
//             }
//             setLoading(false)
//         }

//         const handleError = (err: any) => {
//             mockResponse(`/${uri}`)
//                 .then(mockData => {
//                     switch (uri) {
//                         case URI.SUBTOPICS:
//                             setResponse(nestSubtopics(mockData))
//                             break;
//                         case URI.EXCERPT:
//                             setResponse(extractExcerpt(mockData))
//                             break;
//                         default:
//                             setResponse(mockData);
//                     }
//                     setLoading(false);
//                 })
//                 .catch(() => {
//                     setError(err);
//                     setLoading(false);
//                 })
//         }

//         _insert({ uri, entry, supabase })
//             .then(handleResponse)
//             .catch(handleError);
//     }, [uri, entry])

//     return { response, loading, error }
// }