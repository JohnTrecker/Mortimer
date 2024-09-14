"use client"

import React, {useState, memo} from 'react'
import { Tree } from './types';
import { format as _format} from 'd3-format';
import { getRectFill, getRectHeight, labelVisible } from './utils';
import styles from '@/styles/Icicle.module.css'
import Reference from '@/components/Reference/Reference'
import Link from 'next/link';

interface Props {
    width: number,
    d: Tree,
    transition: (d: Tree, b: boolean) => void,
    color: (s: string) => string,
    focusDepth: number,
}

export default function Rectangle({d, color, width, focusDepth, transition}: Props) {
    const [showChildren, setShowChildren] = useState<boolean>(true);

    const format = _format(",d");
    const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join(" > ")}\n\nClick to view ${format(d.value)} Subtopics`
    const translation = d.target ? `translate(${d.target.y0},${d.target.x0})` : `translate(${d.y0},${d.x0})`
    const rectHeight = getRectHeight(d.target ? d.target : d);
    const rectFill = getRectFill(d, color);
    const shouldDisplayText = labelVisible(d, width, focusDepth)
    const showToggleRefs = d.data.is_referenced && d.data.children?.length > 0
    const href = d.data.is_referenced ? `/subtopics/${d.data.id}` : null

    const handleShowRefs = (e, d) => {
        e.stopPropagation()
        transition(d, true)
        setShowChildren((prev) => !prev)
    }

    return (
        <g
            transform={translation}
            onClick={(_) => transition(d, false)}
            className={styles.group}
            style={{
                transition: 'transform 0.4s ease-out'
            }}
        >
            <rect
                width={d.y1 - d.y0 - 1}
                height={rectHeight}
                fillOpacity={0.6}
                fill={rectFill}
                style={{
                    transition: 'width 0.4s ease-out, height 0.4s ease-out'
                }}
            />
            {shouldDisplayText &&
                <foreignObject
                    width={d.y1 - d.y0}
                    height={rectHeight}
                >
                    <p className={styles.text}>{d.data.name}</p>
                    {showToggleRefs &&
                            <Link href={href}>
                                <p
                                    className={styles.toggle}
                                    onClick={(e) => handleShowRefs(e,d)}
                                >
                                    show references
                                </p>
                            </Link>
                    }
                </foreignObject>
            }
            <title>
                {groupTitle}
                {/* <p className={styles.title}> &#128073;</p> */}
            </title>
        </g>
    )
};
