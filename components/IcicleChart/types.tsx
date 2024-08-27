export interface Target {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export interface Geneology {
    name: string;
    value: number;
    children: Geneology[];
    target?: Target;
}

export interface Category {
    name: string;
    id: number;
    children: Topic[];
}

export interface Topic {
    name: string;
    id: number;
    category_id: number;
    children: Subtopic[] | NestedSuptopic[];
}

export interface Subtopic {
    name: string;
    id: number;
    alt_id: string;
    is_referenced: boolean;
}

export interface NestedSuptopic extends Subtopic {
    children: NestedSuptopic[];
}