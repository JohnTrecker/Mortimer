'use server'

import { z } from 'zod'
import { ActionResponse } from '@/types/reference'
import { Database, Tables } from '@/utils/database.types'
import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

const referenceSchema = z.object({
    topic_id: z.number(),
    subtopic_id: z.number(),
    author_id: z.number(),
    work_id: z.number(),
    author: z.string(),
    volume: z.number().optional(),
    notes: z.string().optional(),
    upvotes: z.number().optional(),
    downvotes: z.number().optional(),
    pages: z.string().min(1, 'Page reference is required'),
    referrer_id: z.string(),
    summary: z.string().min(1, 'Summary or key sentence is required'),
    text: z.string().min(1, 'A few sentences or paragraphs are required'),
})


const _referenceSchema = referenceSchema.omit({
    summary: true,
    text: true,
}).extend({
    summary_id: z.number(), // generated from `insertSummary` response
    excerpt_id: z.number(), // generated from `insertExcerpt` response
})

type ReferenceFormData = z.infer<typeof referenceSchema>
type _ReferenceFormData = z.infer<typeof _referenceSchema>


export async function submitReference(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
    const supabase = await createClient()

    try {
        const rawData: ReferenceFormData = {
            topic_id: Number(formData.get('topic_id')),
            subtopic_id: Number(formData.get('subtopic_id')),
            author_id: Number(formData.get('author_id')),
            work_id: Number(formData.get('work_id')),
            author: formData.get('author') as string,
            volume: Number(formData.get('volume')),
            notes: formData.get('notes') as string,
            upvotes: Number(formData.get('upvotes')),
            downvotes: Number(formData.get('downvotes')),
            pages: formData.get('pages') as string,
            referrer_id: formData.get('referrer_id') as string,
            summary: formData.get('summary') as string,
            text: formData.get('text') as string,
        }

        // Validate the form data
        const validatedData = referenceSchema.safeParse(rawData)

        if (!validatedData.success) {
            return {
                success: false,
                message: 'Please fix the errors in the form',
                errors: validatedData.error.flatten().fieldErrors,
            }
        }

        // save the reference to database
        // console.log('Reference submitted:', validatedData.data)
        const excerpt_id = await insertExcerpt(supabase, validatedData.data)
        const summary_id = await insertSummary(supabase, validatedData.data)

        // Validate form data
        const validatedRef = _referenceSchema.safeParse({...validatedData.data, excerpt_id, summary_id})

        if (!validatedRef.success) {
            return {
                success: false,
                message: 'Error talking to database.',
            }
        }

        const reference = await insertReference(supabase, validatedRef.data)

        return {
            success: true,
            message: 'Reference saved successfully.',
            data: reference,
        }
    } catch (error) {
        return {
            success: false,
            message: `An unexpected error occurred. ${error}`,
        }
    }
}

// insert excerpt
const insertExcerpt = async (supabase: SupabaseClient<Database>, formData: ReferenceFormData): Promise<number> => {
    if (!supabase) throw Error('Supabase client unavailable.')
    const { data: excerpt, error } = await supabase
        .from('excerpt')
        .insert([
            { text: formData.text },
        ])
        .select('id')
        .single()

    if (error) throw Error(`Unable to insert new excerpt: ${error.message}`)
    return excerpt.id
}

// instert summary
const insertSummary = async (supabase: SupabaseClient<Database>, formData: ReferenceFormData): Promise<number> => {
    if (!supabase) throw Error('Supabase client unavailable.')
    const { data: summary, error } = await supabase
        .from('summary')
        .insert([
            { summary: formData.summary, referrer_id: formData.referrer_id },
        ])
        .select('id')
        .single()
    if (error) throw Error(`Unable to insert new summary: ${error.message}`)
    return summary.id
}

// insert reference
const insertReference = async (supabase: SupabaseClient<Database>, formData: _ReferenceFormData): Promise<Tables<'reference'>> => {
    if (!supabase) throw Error('Supabase client unavailable.')
    const { data: reference, error } = await supabase
        .from('reference')
        .insert([
            { ...formData },
        ])
        .select()
        .single()
    if (error) throw Error(`Unable to insert new reference: ${error.message}`)
    return reference
}