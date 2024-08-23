import React from 'react'
import {HierarchyRectangularNode} from 'd3-hierarchy';
import { Geneology } from './types';
import { format as _format} from 'd3-format';
import { getRectFill, getRectHeight, labelVisible } from './utils';
import { Text } from '@visx/text';

interface Props {
    width: number,
    d: HierarchyRectangularNode<Geneology>,
    transitionRectangles: (_) => void,
    color: (s: string) => string,
}

export default function Rectangle({d, color, width, transitionRectangles}: Props) {
    const format = _format(",d");
    const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join(" > ")}\nClick to view ${format(d.value)} Subtopics`
    const translation = d.target ? `translate(${d.target.y0},${d.target.x0})` : `translate(${d.y0},${d.x0})`
    const rectHeight = getRectHeight(d.target ? d.target : d);
    const rectFill = getRectFill(d, color);
    const textDisplay = +labelVisible(d.target ? d.target : d, width) ? "block" : "none";

    return (
        <g
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
            <Text
                y={12}
                x={10}
                verticalAnchor="start"
                width={width / 3}
                fontSize='1rem'
                style={{"display": textDisplay}}
            >
                    {d.data.name}
            </Text>
        <title>
            {groupTitle}
            <p style={{'fontSize': '100px'}}> &#128073;</p>
        </title>
    </g>
)}
/* <text
    x={4}
    y={13}
    fillOpacity={textFillOpacity}
    style={{"userSelect": "none", "wordWrap": "normal"}}
    pointerEvents="none"
> */
/* <tspan style={{"whiteSpace": "normal"}}> */
/* </tspan> */