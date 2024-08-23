import { partition, hierarchy as _hierarchy, HierarchyRectangularNode} from 'd3-hierarchy';
import { format as _format} from 'd3-format';
import { scaleOrdinal} from 'd3-scale';
import { interpolateRainbow} from 'd3-scale-chromatic';
import {quantize} from 'd3-interpolate'
import {Geneology, Target} from './types'
import { nestSubtopics } from '../../utils';

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

export const getRectHeight = (d: HierarchyRectangularNode<Geneology>): number =>
    d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);

export const labelVisible = (d: HierarchyRectangularNode<Geneology>, width: number): boolean =>
    d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 55;

const nestData = (data: Geneology): Array<Geneology> => {
    return data.children.map(category => ({
        ...category,
        children: category.children.map(topic =>
            ({...topic, children: nestSubtopics(topic.children)}))}))

}

export const partitionData = (data, width, height): HierarchyRectangularNode<Geneology>  => {
    // Compute the layout.
    const nestedData = nestData(data)
    const hierarchy = _hierarchy(
        {name: 'Explore by Topic ', value: 9, children: nestedData},
        (d) => {
            d.value = d.children ? d.children.length + 1 : d.size ?? 0
            return d.children
        },
    )
        .sum(d => d.value)
        .sort((a, b) => b.height - a.height || b.value - a.value);

    const partitionLayout = partition()
        .size([height, (hierarchy.height + 1) * width / 3])
        .padding(0)
        (hierarchy);

    return partitionLayout as HierarchyRectangularNode<Geneology>
}
