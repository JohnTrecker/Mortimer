import { scaleOrdinal, quantize, hierarchy as _hierarchy, interpolateRainbow, partition, create, format as _format, Hierarchy, HierarchyRectangularNode} from 'd3';
import {Geneology, Target} from './types'

// Create the color scale.
export const _color = (numChildren: number): (s: string) => string => scaleOrdinal(quantize(interpolateRainbow, numChildren + 1));

export const getRectFill = (d: HierarchyRectangularNode<Geneology>, color: Function): string => {
    if (!d.depth) return "#ccc";
    while (d.depth > 1) d = d.parent;
    return color(d.data.name);
}
export const genTarget = (p, d: HierarchyRectangularNode<Geneology>, height: number): Target => ({
    x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
    x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
    y0: d.y0 - p.y0,
    y1: d.y1 - p.y0
})

export const depthFirstTraversal = (node: HierarchyRectangularNode<Geneology>, callback: Function) => {
    if (node.children) {
        for (const child of node.children) {
            depthFirstTraversal(child, callback)
        }
    }
    return callback(node)
}

export const getRectHeight = (d: HierarchyRectangularNode<Geneology> | Target): number =>
    d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);

export const labelVisible = (d: HierarchyRectangularNode<Geneology>, width: number): boolean =>
    d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
