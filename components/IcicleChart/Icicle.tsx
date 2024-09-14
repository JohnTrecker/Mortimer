import React, { useState, useCallback, useMemo } from 'react';
import { _color, genTarget, partitionData, breadthFirstTraversal } from './utils';
import { HierarchyRectangularNode } from 'd3-hierarchy';
import { Geneology, Tree, Category } from './types';
import Rectangle from './Rectangle';
import styles from '@/styles/Icicle.module.css'

interface Props {
    data: Category[]
    width: number
    height: number
}

export default function Icicle({data, width, height}: Props) {
    const initialData = useMemo(() => partitionData(data, width, height), [data, width, height]);
    const [root, setRoot] = useState(initialData);
    const [focus, setFocus] = useState(initialData);

    const color = useMemo(() => _color(data.length ?? 1), [data.length]);

    const transitionRectangles = useCallback((clickedRect: HierarchyRectangularNode<Geneology>, suppressChildren: boolean) => {
        const isFocused = focus.data.name === clickedRect.data.name;
        const newFocus = (suppressChildren || !isFocused) ? clickedRect : clickedRect.parent;

        if (!newFocus) return; // root clicked

        setFocus(newFocus);
        const newRoot = partitionData(data, width, height);

        breadthFirstTraversal(newRoot, (d) => {
            const isSupressableNode = d.parent?.data.name === clickedRect.data.name && suppressChildren;

            if (isSupressableNode) {
                d.x0 = d.y0 = 0;
                d.x1 = d.y1 = 1;
                d.target = undefined;
                return;
            }
            d.target = genTarget(newFocus, d, height);
        });
        setRoot(newRoot);
    }, [data, width, height, focus]);

    const rectangles = useMemo(() => 
        root.descendants()
            .map((d: Tree, i) => {
                // const showRefs = focus.data.name === d.data.name && d.data.is_referenced
                return (
                    <Rectangle
                        key={`${d.data.id}-${i}`}
                        d={d}
                        width={width}
                        color={color}
                        focusDepth={focus.depth}
                        transition={transitionRectangles}
                    />
                )
            }),
    [width, transitionRectangles]);

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            height={height}
            className={styles.svg}
        >
            {rectangles}
        </svg>
    );
}
