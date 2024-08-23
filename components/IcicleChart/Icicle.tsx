import React, {useState} from 'react';
import {_color, genTarget, partitionData, breadthFirstTraversal } from './utils';
import { hierarchy as _hierarchy, HierarchyRectangularNode} from 'd3-hierarchy';
import { format as _format} from 'd3-format';
import { Geneology } from './types';
import Rectangle from './Rectangle';

interface Props {
    data: Readonly<Geneology>
    width: number
    height: number
}
export default function Icicle({data, width, height}: Props) {
    const initialData = partitionData(data, width, height)
    const [root, setRoot] = useState(initialData);
    const [focus, setFocus] = useState(root);

    const transitionRectangles = (p: HierarchyRectangularNode<Geneology>) => {
        const isFocused = focus.data.name === p.data.name
        const newFocus = isFocused ? p.parent : p

        if (!newFocus) return // root clicked

        setFocus(newFocus);
        const newRoot = partitionData(data, width, height)

        breadthFirstTraversal(newRoot, (d) => {
            const target = genTarget(newFocus, d, height)
            d.target = target
        });
        setRoot(newRoot)
    }

    const color = _color(data.children?.length ?? 1)

    return (
       <svg
           viewBox={`[0, 0, ${width}, ${height}]`}
           width={width}
           height={height}
           style={{"maxWidth": "100%", "height": "auto", "font": "10px sans-serif"}}
       >
           {root.descendants().map((d: HierarchyRectangularNode<Geneology>, i) =>
                <Rectangle
                    key={`${d.data.name}-${i}`}
                    d={d}
                    width={width}
                    transitionRectangles={transitionRectangles}
                    color={color}
                />
            )}
        </svg>
    )
}