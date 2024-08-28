import React from 'react'
import { Tree } from './types';
import { format as _format} from 'd3-format';
import { getRectFill, getRectHeight, labelVisible } from './utils';
import styles from '../../styles/Icicle.module.css'

interface Props {
    width: number,
    d: Tree,    
    transitionRectangles: (d: Tree, b: boolean) => void,
    color: (s: string) => string,
}

export default function Rectangle({d, color, width, transitionRectangles}: Props) {
    const [showChildren, setShowChildren] = React.useState<boolean>(true);

    const format = _format(",d");
    const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join(" > ")}\n\nClick to view ${format(d.value)} Subtopics`
    const translation = d.target ? `translate(${d.target.y0},${d.target.x0})` : `translate(${d.y0},${d.x0})`
    const rectHeight = getRectHeight(d.target ? d.target : d);
    const rectFill = getRectFill(d, color);
    const shouldDisplayText = labelVisible(d.target ? d.target : d, width)
    const showToggleRefs = d.data.is_referenced && d.data.children?.length > 0

    const handleShowRefs = (e, d) => {
        e.stopPropagation()
        transitionRectangles(d, true)
        setShowChildren(!showChildren)
    }

    return (
        <g
            transform={translation}
            onClick={(_) => transitionRectangles(d, false)}
            className={styles.group}
        >
            <rect
                width={d.y1 - d.y0 - 1}
                height={rectHeight}
                fillOpacity={0.6}
                fill={rectFill}
            />
            {shouldDisplayText && <foreignObject
                width={d.y1 - d.y0}
                height={rectHeight}
            >
                <p className={styles.text}>{d.data.name}</p>
                {showToggleRefs && <p className={styles.toggle} onClick={(e) => handleShowRefs(e,d)}>show references</p>}
            </foreignObject>}
        <title>
            {groupTitle}
            {/* <p className={styles.title}> &#128073;</p> */}
        </title>
    </g>
)}
