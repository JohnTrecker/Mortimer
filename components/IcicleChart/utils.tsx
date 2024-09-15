import { partition, hierarchy as _hierarchy, HierarchyRectangularNode} from 'd3-hierarchy';
import { format as _format} from 'd3-format';
import { scaleOrdinal} from 'd3-scale';
import { interpolateRainbow} from 'd3-scale-chromatic';
import {quantize} from 'd3-interpolate'
import {Geneology, Target, Tree, Category, Subtopic, NestedSubtopic} from './types'
import { NUM_SECTIONS_VISIBLE } from './constants';
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

export function breadthFirstTraversal(root: HierarchyRectangularNode<Geneology>, callback: Function) {
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();

      if (node) {
        callback(node); // Add the node's value to the result array

        // Add the node's children to the queue
        if (node.children?.length) node.children.forEach(child => queue.push(child));
      }
    }
}

export function getRectProps(d: Tree, color: Function, width: number, focusDepth: number) {
    const D = d.target ?? d
    const translation = `translate(${D.y0},${D.x0})`
    const rectHeight = D.x1 - D.x0 - Math.min(1, (D.x1 - D.x0) / 2);
    const rectFill = getRectFill(d, color);
    const shouldDisplayText = labelVisible(d, width, focusDepth)
    const showToggleRefs = d.data.is_referenced && d.data.children?.length > 0
    const href = d.data.is_referenced ? `/subtopics/${d.data.id}` : null
    return {translation, rectHeight, rectFill, shouldDisplayText, showToggleRefs, href}
};

export const getRectHeight = (d: Tree): number => {
    const D = d.target ? d.target : d
    return D.x1 - D.x0 - Math.min(1, (D.x1 - D.x0) / 2);
}

export const labelVisible = (d: Tree, width: number, focusDepth: number): boolean => {
    // show only focus depth + child depth and show only labels that fit.
    if (d.depth - focusDepth > 1) return false
    const D = d.target ?? d;
    return D.y1 <= width && D.y0 >= 0 && D.x1 - D.x0 > 20;
}

function sortSubsByAltId(subs) {
    // Can we do this on the server?
    return subs.sort((a, b) => {
        const getId = (sub) => sub.alt_id.replace(/\D/g, '.').split('.').map(Number);
        const idA = getId(a);
        const idB = getId(b);
        for (let i = 0; i < Math.max(idA.length, idB.length); i++) {
            if (idA[i] === undefined) return -1;
            if (idB[i] === undefined) return 1;
            if (idA[i] !== idB[i]) return idA[i] - idB[i];
        }
        return 0;
    });
}

export const nestSubtopics = (subs: Subtopic[]): NestedSubtopic[] => { // TODO: deprecate once data formatted in server
    const memo = {}
    const alpha = 'abcdefghijklmnopqrstuvwxyz'
        .split('')
        .reduce((memo, letter, number) => ({...memo, [letter]: number}), {})

    for (let sub of sortSubsByAltId(subs)) {
        const { alt_id } = sub
        const [primary, secondary, tertiary] = alt_id.split('.')

        if (tertiary) {
            memo[primary].children[alpha[secondary]].children.push({...sub})
            continue
        }
        if (secondary) {
            memo[primary].children.push({...sub, children: []})
            continue
        }
        if (primary) {
            memo[primary] = {...sub, children: []}
            continue
        }
    }

    return Object.values(memo)
}

const nestData = (data: Category[]): Category[] => {
    return data.map(category => ({
        ...category,
        children: category.children.map(topic =>
            ({...topic, children: nestSubtopics(topic.children)}))}))

}

export const partitionData = (data: Category[], width: number, height: number): HierarchyRectangularNode<Geneology> => {
    const nestedData = nestData(data)
    const hierarchy = _hierarchy(
        {name: 'Explore by Topic ', children: nestedData},
    )
        .count()
        .sort((a, b) => a.children?.length - b.children?.length); // shortest first

    const partitionLayout = partition()
        .size([height, (hierarchy.height + 1) * width / NUM_SECTIONS_VISIBLE])
        (hierarchy);

    return partitionLayout as Tree
}
