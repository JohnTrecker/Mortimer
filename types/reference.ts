export interface ReferenceFormData {
    topic_id: number,                // ✅
    subtopic_id: number,             // ✅
    author_id: number,               // ✅ may have to create in the future
    work_id: number,                 // ✅ may have to create in the future
    author: string,                  // ✅
    volume?: number,                  // ✅
    notes?: string,                   // ✅
    // summary_id: number,           // generated from('summary').insert() response
    // excerpt_id: number,           // generated from('excerpt').insert() response
    upvotes?: number,                 // ✅
    downvotes?: number,               // ✅
    pages: string,                   // ✅
    referrer_id: string,             // ✅
    // NOT from Tables<'reference>
    summary: string,                 // ✅
    text: string                     // ✅
}

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof ReferenceFormData]?: string[];
    };
    data?: any;
}