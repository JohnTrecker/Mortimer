import React, {useState} from 'react';
import {_color, getRectFill, genTarget, getRectHeight, labelVisible, partitionData, breadthFirstTraversal } from './utils';
import { hierarchy as _hierarchy, HierarchyRectangularNode} from 'd3-hierarchy';
import { format as _format} from 'd3-format';
import { Geneology } from './types';

interface Data {
    value: string,
    children: ReadonlyArray<Data>
}
interface Props {
    data: Readonly<Data>
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

    const format = _format(",d");
    const color = _color(data.children.length)

    return (
       <svg
           viewBox={`[0, 0, ${width}, ${height}]`}
           width={width}
           height={height}
           style={{"maxWidth": "100%", "height": "auto", "font": "10px sans-serif"}}
       >
           {root.descendants().map((d: HierarchyRectangularNode<Geneology>) => {
                const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`
                const translation = d.target ? `translate(${d.target.y0},${d.target.x0})` : `translate(${d.y0},${d.x0})`
                const rectHeight = getRectHeight(d.target ? d.target : d);
                const rectFill = getRectFill(d, color);
                const textFillOpacity = +labelVisible(d.target ? d.target : d, width);
                const tspanFillOpacity = +labelVisible(d.target ? d.target : d, width) * 0.7;
                const tspanValue = format(d.value)

                return (
                    <g
                        key={`${d.data.name}-${tspanValue}`}
                        transform={translation}
                        onClick={(_) => transitionRectangles(d)}
                        style={{"cursor": "pointer", "transition": "all 0.6s ease"}}
                        className="group"
                    >
                    <rect
                            width={d.y1 - d.y0 - 1}
                            height={rectHeight}
                            fillOpacity={0.6}
                            fill={rectFill}
                        />
                    <text
                            x={4}
                            y={13}
                            fillOpacity={textFillOpacity}
                            style={{"userSelect": "none"}}
                            pointerEvents="none"
                        >
                        <tspan>
                                {d.data.name}
                            </tspan>
                        <tspan fillOpacity={tspanFillOpacity}>
                                {tspanValue}
                            </tspan>
                    </text>
                    <title>{groupTitle}</title>
                </g>
            )})}
       </svg>
    )
}

// {root.descendants().map((d: HierarchyRectangularNode<Geneology>) =>
//     <Rectangle 
//         d={d}
//         width={width}
//         height={height}
//         root={root}
//         setRoot={setRoot}
//         focus={focus}
//         setFocus={setFocus}
//     />
// )}