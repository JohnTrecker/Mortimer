import React, {useState} from 'react';
import {_color, genTarget, partitionData, breadthFirstTraversal } from './utils';
import { hierarchy as _hierarchy, HierarchyRectangularNode} from 'd3-hierarchy';
import { format as _format} from 'd3-format';
import { Geneology, Tree } from './types';
import Rectangle from './Rectangle';
import styles from '/styles/Icicle.module.css'
import { Category } from './types';

interface Props {
    data: Category[]
    width: number
    height: number
}
export default function Icicle({data, width, height}: Props) {
    const initialData = partitionData(data, width, height)
    const [root, setRoot] = useState(initialData);
    const [focus, setFocus] = useState(root);

    const transitionRectangles = (clickedRect: HierarchyRectangularNode<Geneology>, suppressChildren: boolean) => {
        const isFocused = focus.data.name === clickedRect.data.name
        const newFocus = (suppressChildren || !isFocused)
            ? clickedRect : clickedRect.parent
        
        if (!newFocus) return // root clicked

        setFocus(newFocus);
        const newRoot = partitionData(data, width, height)

        breadthFirstTraversal(newRoot, (d) => {
            const isSupressableNode = d.parent?.data.name === clickedRect.data.name && suppressChildren

            if (isSupressableNode) {
                d.x0 = 0
                d.x1 = 1
                d.y0 = 0
                d.y1 = 1
                d.target = undefined
                return
            }
            const target = genTarget(newFocus, d, height)
            d.target = target
        });
        setRoot(newRoot)
    }

    const color = _color(data.length ?? 1)

    return (
        <svg
            viewBox={`[0, 0, ${width}, ${height}]`}
            width={width}
            height={height}
            className={styles.svg}
        >
        {root.descendants().map((d: Tree, i) =>
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