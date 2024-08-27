import { HierarchyRectangularNode } from "d3-hierarchy";

export interface Target {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export interface Geneology {
    name: string;
    value: number;
    children: Category[];
    // target: Target;
}

export interface Tree extends HierarchyRectangularNode<any> {
    target?: Target;
}

export interface Category {
    name: string;
    id: number;
    value?: number;
    children: Topic[];
}

export interface Topic {
    name: string;
    id: number;
    value?: number;
    category_id: number;
    children: Subtopic[] | NestedSubtopic[];
}

export interface Subtopic {
    name: string;
    id: number;
    value?: number;
    alt_id: string;
    is_referenced: boolean;
}

export interface NestedSubtopic extends Subtopic {
    children: NestedSubtopic[];
}