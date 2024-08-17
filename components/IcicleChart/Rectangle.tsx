import React, {useState} from 'react'
import {color, scaleOrdinal, quantize, interpolateRainbow, format as _format, HierarchyRectangularNode} from 'd3';
import { Target, Geneology } from './types';

interface Props {
    width: number,
    height: number,
    d: HierarchyRectangularNode<Geneology>,
    focus: HierarchyRectangularNode<Geneology>,
    root: HierarchyRectangularNode<Geneology>,
    setRoot: (a) => {},
    setFocus: (a) => {},
}

export default function Rectangle({width, height, d, root, focus, setRoot, setFocus}: Props) {
    const getRectHeight = (d): number => {
        return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
    }
    const genTarget = (p, d) => ({
        x0: (d.x0 - p.x0) / (p.x1 - p.x0) * height,
        x1: (d.x1 - p.x0) / (p.x1 - p.x0) * height,
        y0: d.y0 - p.y0,
        y1: d.y1 - p.y0
    })

    const clicked = (_, p) => {
        // On click, change the focus and transitions it into view.
        setFocus(focus === p ? p.parent : p);

        const newRoot = Object.create(root)
        newRoot.each((d) => {
            const target = genTarget(p, d)
            d.height = getRectHeight(target)
            
            d.x0 = target.x0
            d.x1 = target.x1
            d.y0 = target.y0
            d.y1 = target.y1
        });
        setRoot(newRoot)    

        // const t = cell.transition().duration(750)
        // .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

        // rect.transition(t).attr("height", d => rectHeight(d.target));
        // text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
        // tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
    }

    // Create the color scale.
    const color = scaleOrdinal(quantize(interpolateRainbow, 5)); // d.children.length + 1));

    const getRectFill = (d: HierarchyRectangularNode<Target>): string => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
    }
    const labelVisible = (d): boolean => {
        return d.y1 <= width && d.y0 >= 0 && d.x1 - d.x0 > 16;
    }

    const format = _format(",d");
    const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`
    const translate = `translate(${d.y0},${d.x0})`
    const rectHeight = d.height ?? getRectHeight(d);
    const rectFill = getRectFill(d);
    const textFillOpacity = +labelVisible(d);
    const tspanFillOpacity = +labelVisible(d) * 0.7;
    const tspanValue = format(d.value)

    return (
        <g
            key={d.data.name}
            transform={translate}
            onClick={(event) => clicked(event, d)}
            style={{"cursor": "pointer", "transition": "all 0.6s ease"}} // TODO: Add transform to style
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
            <tspan>{d.data.name}</tspan>
            <tspan fillOpacity={tspanFillOpacity}>{tspanValue}</tspan>
        </text>
        <title>{groupTitle}</title>
    </g>
)}