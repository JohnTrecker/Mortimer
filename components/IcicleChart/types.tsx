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