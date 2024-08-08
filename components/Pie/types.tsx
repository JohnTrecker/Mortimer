import { Tables } from "../../database.types.ts";

/*
interface Category {
    id: number,
    category: string,
    topic: Topic[],
}
*/
export type Category = Tables<'category'> 

/*
interface Topic {
    name: string,
    id: number,
    category_id: number,
    subtopics: Subtopic[],
}
*/
export type Topic = Tables<'topic'>

/*
interface Subtopic {
    id: number,
    number: string, // alphanumeric with periods, e.g. 1.1.a, 2.3, 3, etc.
    topic_id: number,
    category_id: number,
    subtopic: string,
    subtopics: Subtopic[],
}
*/
export type Subtopic = Tables<'subtopic'>