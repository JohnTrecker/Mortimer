import React from 'react'
import {HierarchyRectangularNode} from 'd3-hierarchy';
import { Geneology } from './types';
import { format as _format} from 'd3-format';
import { getRectFill, getRectHeight, labelVisible } from './utils';

interface Props {
    width: number,
    d: HierarchyRectangularNode<Geneology>,
    transitionRectangles: (_) => void,
    color: (s: string) => string,
}

export default function Rectangle({d, color, width, transitionRectangles}: Props) {
    const format = _format(",d");
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
)}