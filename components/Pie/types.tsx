export interface Category {
    id: number,
    category: string,
    topic: Topic[],
}
/*
*/
// export interface Category extends Tables<'category'> {
//     topics: Topic[]
// } 

export interface Topic {
    id: number,
    name: string,
    category_id: number,
    subtopics: Subtopic[],
}
/*
*/
// export interface Topic extends Omit<Tables<'topic'>, 'contributors' | 'image_url' | 'referrer_id' | 'subtopics' > {
//     subtopics: Subtopic[]
// }

export interface Subtopic {
    id: number,
    number: string, // alphanumeric with periods, e.g. 1.1.a, 2.3, 3, etc.
    // topic_id: number,
    // category_id: number,
    subtopic: string,
    subtopics: Subtopic[],
}
/*
*/
// export interface Subtopic extends Omit<Tables<'subtopic'>, 'alt_id' | 'description' | 'is_referenced' | 'referrer_id' > {
//     subtopic: string,
//     subtopics: Subtopic[]
//     category_id: number,
//     number: Pick<Tables<'subtopic'>, 'alt_id'>, // alphanumeric with periods, e.g. 1.1.a, 2.3, 3, etc.
// }