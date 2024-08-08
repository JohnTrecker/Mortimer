import React, { useState, useEffect } from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import { animated, useTransition, to } from '@react-spring/web';
import { Tables } from "../database.types.ts";

// types
interface Category extends Tables<'category'> {
    topic: Topic[];
}

export interface Topic {
    name: string,
    id: number,
    category_id: number,
    subtopics: Subtopic[],
}

export interface Subtopic {
    id: number,
    number: string, // alphanumeric with periods, e.g. 1.1.a, 2.3, 3, etc.
    subtopic: string,
    subtopics: Subtopic[],
}

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
    width?: number;
    height?: number;
    margin?: typeof defaultMargin;
    animate?: boolean;
    categories: Category[];
    supabase: any;
};

export default function PieChart({
    width = window.innerWidth,
    height = window.innerHeight,
    margin = defaultMargin,
    animate = true,
    categories,
    supabase,
    }: PieProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);

    useEffect(() => {
        function handleEscape(e) {
            if (e.keyCode == 27) {
                if (selectedSubtopic) {
                    console.log('subtopic block executed')
                    return setSelectedSubtopic(null)
                } 
                if (selectedTopic) {
                    console.log('topic block executed')
                    return setSelectedTopic(null)
                } 
                if (selectedCategory) {  
                    return setSelectedCategory(null)
                }
            }
        }
        window.addEventListener('keyup', handleEscape);
        return () => window.removeEventListener('keyup', handleEscape);
      }, [selectedCategory, selectedTopic, selectedSubtopic]);

    // data
    const topics: Topic[] = categories.map((c) => c.topic).flat();

    // accessor functions
    const categorySegment = (d: Category) => d.topic.length / 102;
    const topicSegment = (_) => 0.2;
    const subtopicSegment = (_) => 0.2;

    // color scales
    const categoryRange = [...[...Array(10).keys()].map((i) => `rgba(93,30,91,${i === 0 ? 1.0 : 0.1 * i})`)]
    
    const getCategoryColor = scaleOrdinal({
        domain: categories.map((c) => c.id),
        range: categoryRange,
        });

    const totalTopics = selectedCategory ? selectedCategory.topic.length : 102
    const topicRange = getContinuiousRange(totalTopics).map((i) => `rgba(255,255,255,${i/totalTopics})`)
    // write a function that when iterating over a range like [1,2,3] returns the following output: [1,2,3,2,1]
    
    // returns a continoius range of colors from white to white
    function getContinuiousRange(n: number) { 
        const firstHalf = [...Array(Math.round(n/2 + 1)).keys()].slice(1)
        const secondHalf = [...firstHalf].reverse()
        return [...firstHalf, ...secondHalf]
    }
    const getTopicColor = scaleOrdinal({
        domain: topics.map((t) => t.id),
        range:  topicRange,
    });

    // pie dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2.4;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 50;
    const donutOpacity = selectedTopic ? '0.6' : '1.0'

    if (width < 10) return null;

    return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <GradientPinkBlue id="visx-pie-gradient" />
        <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />

        <Group width={width/100} height={height/100} scale={'10'} top={centerY + margin.top} left={centerX + margin.left} opacity={donutOpacity}>

            {/* Categories & Subtopic Details */}
            <Pie
                data={
                    selectedCategory ? categories.filter(({ category }) => category === selectedCategory.category) : categories
                }
                pieValue={categorySegment}
                outerRadius={radius - donutThickness * 1.3}
            >
                {(pie) => {
                return selectedSubtopic
                    ? (
                        <text
                        fill="white"
                        dy="0.33em"
                        fontSize="x-large"
                        textAnchor="middle"
                        pointerEvents="none"
                        >
                            {selectedSubtopic?.subtopic}
                        </text>
                    )
                    : ( <AnimatedPie<Category>
                        {...pie} 
                        animate={false}
                        getKey={(arc) => arc.data.category}
                        onClickDatum={({ data }) =>
                            setSelectedCategory(selectedCategory && data.category === selectedCategory.category ? null : data)
                        }
                        getColor={(arc) => getCategoryColor(arc.data.id)}
                    />
                )}}
            </Pie>

            {/* Topics */}
            {true && <Pie
            // {selectedCategory && <Pie
                data={
                selectedTopic
                    ? [selectedTopic]
                    : selectedCategory
                        ? categories
                            .filter(({ category }) => category === selectedCategory.category)[0]
                            .topic
                        : topics
                }
                pieValue={topicSegment}
                pieSortValues={() => -1}
                outerRadius={radius}
                innerRadius={radius - donutThickness}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => {
                    return selectedSubtopic ? null : (
                    // return (
                    <AnimatedPie<Topic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { name } }) => name}
                        onClickDatum={({ data }) => {
                            const shouldReinitializeSelectedTopic = selectedTopic?.name === data.name
                            const shouldUpdateCategory = data.category_id !== selectedCategory?.id
                            if (shouldReinitializeSelectedTopic) {
                                return setSelectedTopic(null)
                            }
                            if (shouldUpdateCategory) {
                                setSelectedCategory(categories.find(c => c.id === data.category_id) ?? null)
                            }
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                        sub1={selectedSubtopic}
                    />
                )}}
            </Pie>}

            {/* Subtopics */}
            {selectedTopic && <Pie
                data={
                selectedSubtopic ? [{selectedSubtopic}] :
                    selectedTopic
                        ? topics.filter(({ name }) => name === selectedTopic.name)[0].subtopics
                        : selectedCategory
                            ? categories
                                .filter(({ category }) => category === selectedCategory.category)[0]
                                .topic.map((t) => t.subtopics).flat()
                            : topics.map((t) => t.subtopics).flat()
                }
                pieValue={subtopicSegment}
                pieSortValues={() => -1}
                outerRadius={radius + donutThickness}
                // innerRadius={(data) => {
                //     console.log({data})
                //     const additionalSize = hoveredSubtopic && hoveredSubtopic.id == data.id ? 5 : 0;
                //     return radius + 5;
                // }}
                innerRadius={radius + 5}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => (
                    <AnimatedPie<Subtopic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { subtopic } }) => subtopic}
                        onClickDatum={({ data }) => {
                            const subtopic1 = pie.arcs[0]?.data?.selectedSubtopic
                            const subtopic2 = data.selectedSubtopic
                            console.log({subtopic1, subtopic2})
                            const subtopic = data.selectedSubtopic ?? data
                            const subtopicID = data.selectedSubtopic?.id ?? data.id
                            animate &&
                            setSelectedSubtopic(
                                selectedSubtopic && selectedSubtopic.id === subtopicID ? null : subtopic,
                            )
                        }}
                        // onHoverDatum={ ({ data: {id} }) => {
                        //     const currentArc = pie.arcs.find((arc) => arc.data.id === id)
                        //     setSelectedSubtopic(currentArc?.data)
                        // }}
                        // onUnhoverDatum={() => setHoveredSubtopic(null)}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                    />
                )}
            </Pie>}

        </Group>

        {animate && (
        <text
            textAnchor="end"
            x={width - 16}
            y={height - 16}
            fill="white"
            fontSize={11}
            fontWeight={300}
            pointerEvents="none"
        >
            Click segments to update
        </text>
        )}
    </svg>
    );
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
  onHoverDatum?: (d: PieArcDatum<Datum>) => void;
  onUnhoverDatum?: () => void;
  sub1?: Subtopic | null;
  delay?: number;
};

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
  onHoverDatum = () => {},
  onUnhoverDatum = () => {},
  sub1 = null,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.2;
    const isSubtopic = Boolean(arc.data && arc.data.subtopic)
    const isSubtopicSelected = Boolean(sub1)

    return (
      <g key={key}>
        <animated.path
          // compute tod path d attribute from intermediate angle values
          d={to([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            }),
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum(arc)}
          onTouchStart={() => onClickDatum(arc)}
          onMouseLeave={() => onUnhoverDatum()}
        />
        {hasSpaceForLabel && (!isSubtopic || isSubtopicSelected) && (
          <animated.g style={{ opacity: props.opacity }}>
                <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    // dy="0.33em"
                    fontSize="x-large"
                    textAnchor="middle"
                    pointerEvents="none"
                >
                    {getKey(arc)}
                </text>
          </animated.g>
        )}
      </g>
    );
  });
}