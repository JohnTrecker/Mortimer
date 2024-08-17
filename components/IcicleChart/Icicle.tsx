import React, {useState} from 'react';
import {_color, getRectFill, genTarget, depthFirstTraversal, getRectHeight, labelVisible } from './utils';
import { hierarchy as _hierarchy, format as _format, HierarchyRectangularNode} from 'd3';
import { Geneology } from './types';
import data from '../../data/zoomable-icicle-data.json';

export default function Icicle({initialRoot, width, height}) {
    const [focus, setFocus] = useState(initialRoot);
    const [root, setRoot] = useState(initialRoot);

    const transitionRectangles = (_, selectedNode: HierarchyRectangularNode<Geneology>) => {
        setFocus(focus === selectedNode ? selectedNode.parent : selectedNode);

        const newRoot = Object.create(root)
        depthFirstTraversal(newRoot, (d) => {
            const target = genTarget(selectedNode, d, height)
            const newHeight = getRectHeight(target)

            d.height = newHeight
            d.x0 = target.x0
            d.x1 = target.x1
            d.y0 = target.y0
            d.y1 = target.y1
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
                const translate = `translate(${d.y0},${d.x0})`
                const rectHeight = getRectHeight(d);
                const rectFill = getRectFill(d, color);
                const textFillOpacity = +labelVisible(d, width);
                const tspanFillOpacity = +labelVisible(d, width) * 0.7;
                const tspanValue = format(d.value)

                return (
                    <g
                        key={`${d.data.name}-${d.data.value}`}
                        transform={translate}
                        onClick={(event) => transitionRectangles(event, d)}
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