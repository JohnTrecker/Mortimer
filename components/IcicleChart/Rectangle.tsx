"use client"

import React, {useState} from 'react'
import { Tree } from './types';
import { format as _format} from 'd3-format';
import { getRectProps } from './utils';
import styles from '@/styles/Icicle.module.css'
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
    const groupTitle = `${d.ancestors().map(d => d.data.name).reverse().join(" > ")}\n\nClick to view ${format(d.data.children?.length)} Subtopics`
    const {
        translation,
        rectHeight,
        rectFill,
        shouldDisplayText,
        showToggleRefs,
        href
    } = getRectProps(d, color, width, focusDepth);

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
