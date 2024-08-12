import React, { useState, useEffect } from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { GradientPinkBlue } from '@visx/gradient';
import { animated, useTransition, to } from '@react-spring/web';
import { Category, Topic, Subtopic } from './types';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type PieProps = {
    width?: number;
    height?: number;
    margin?: typeof defaultMargin;
    animate?: boolean;
    categories: Category[];
};

export default function PieChart({
    width = window.innerWidth,
    height = window.innerHeight,
    margin = defaultMargin,
    animate = true,
    categories,
    }: PieProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic | null>(null);
    const [selectedSubtopic2, setSelectedSubtopic2] = useState<Subtopic | null>(null);
    const [selectedSubtopic3, setSelectedSubtopic3] = useState<Subtopic | null>(null);
    const [selectedSubtopic4, setSelectedSubtopic4] = useState<Subtopic | null>(null);
    const [hoveredSubtopic, setHoveredSubtopic] = useState<Subtopic | null>(null);

    useEffect(() => {
        // `function` syntax allows removeEventListener to refer to `this`
        function handleEscape(e) {
            if (e.keyCode == 27) {
                if (selectedSubtopic4) {
                    return setSelectedSubtopic4(null)
                } 
                if (selectedSubtopic3) {
                    return setSelectedSubtopic3(null)
                } 
                if (selectedSubtopic2) {
                    return setSelectedSubtopic2(null)
                } 
                if (selectedSubtopic) {
                    return setSelectedSubtopic(null)
                } 
                if (selectedTopic) {
                    return setSelectedTopic(null)
                } 
                if (selectedCategory) {  
                    return setSelectedCategory(null)
                }
            }
        }
        window.addEventListener('keyup', handleEscape);
        return () => window.removeEventListener('keyup', handleEscape);
      }, [selectedCategory, selectedTopic, selectedSubtopic, selectedSubtopic2, selectedSubtopic3, selectedSubtopic4]);

    // data
    const topics: Topic[] = categories.map((c) => c.topic).flat();
    const totalTopics = selectedCategory ? selectedCategory.topic.length : 102
    const topicRange = getContinuiousRange(totalTopics).map((i) => `rgba(255,255,255,${i/totalTopics})`)

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
    const donutThickness = 50;
    const subtopicReduction = [selectedSubtopic, selectedSubtopic2, selectedSubtopic3, selectedSubtopic4]
        .reduce((acc, sub) => acc + (sub === null ? 0 : 1), 0) * donutThickness
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom - (subtopicReduction / 2);
    const radius = Math.min(innerWidth, innerHeight) / 2.4;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutOpacity = selectedTopic ? '0.6' : '1.0'
    const getInnerRadius = (level: number) => radius + (level - 1) * donutThickness + 5
    const getOuterRadius = (level: number) => radius + level * donutThickness


    if (width < 10) return null;

    return (
    <svg width={width} height={height}>
        <GradientPinkBlue id="visx-pie-gradient" />
        <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />

        <Group width={width/100} height={height/100} scale={'10'} top={centerY + margin.top} left={centerX + margin.left} opacity={donutOpacity}>

            {/* Categories */}
            <Pie
                data={
                    selectedCategory ? categories.filter(({ category }) => category === selectedCategory.category) : categories
                }
                pieValue={categorySegment}
                outerRadius={radius - donutThickness - 5}
            >
                {(pie) => (
                    <AnimatedPie<Category>
                        {...pie} 
                        animate={false}
                        getKey={(arc) => arc.data.category}
                        onClickDatum={({ data }) =>
                            setSelectedCategory(selectedCategory && data.category === selectedCategory.category ? null : data)
                        }
                        getColor={(arc) => getCategoryColor(arc.data.id)}
                    />
                )}
            </Pie>

            {/* Topics */}
            {selectedCategory && <Pie
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
                {(pie) => (
                    <AnimatedPie<Topic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { name } }) => name}
                        onClickDatum={({ data }) => {
                            animate && setSelectedTopic(selectedTopic?.name === data.name ? null : data)
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                    />
                )}
            </Pie>}

            {/* Subtopics Level 1 */}
            {selectedTopic && <Pie
                data={
                selectedSubtopic ? [selectedSubtopic] : selectedTopic
                    ? topics.filter(({ name }) => name === selectedTopic.name)[0].subtopics
                    : selectedCategory
                        ? categories
                            .filter(({ category }) => category === selectedCategory.category)[0]
                            .topic.map((t) => t.subtopics).flat()
                        : topics.map((t) => t.subtopics).flat()
                }
                pieValue={subtopicSegment}
                pieSortValues={() => -1}
                innerRadius={getInnerRadius(1)}
                outerRadius={getOuterRadius(1)}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => (
                    <AnimatedPie<Subtopic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { subtopic } }) => subtopic}
                        onClickDatum={({ data }) => {
                            if (!animate) return
                            const shouldReinitializeSelectedSubtopic = selectedSubtopic?.id === data.id
                            if (shouldReinitializeSelectedSubtopic) {
                                return setSelectedSubtopic(null)
                            } else {
                                setSelectedSubtopic(data)
                            }
                        }}
                        onHoverDatum={({ data }) => {
                            setHoveredSubtopic(data)
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                        hoveredSubtopic={hoveredSubtopic}
                        isLevelSelected={selectedSubtopic ? true : false}
                    />
                )}
            </Pie>}

            {/* Subtopics Level 2 */}
            {selectedSubtopic && selectedSubtopic.subtopics.length > 0 && <Pie
                data={
                    selectedSubtopic2 ? [selectedSubtopic2] :
                    selectedSubtopic.subtopics
                }
                pieValue={subtopicSegment}
                pieSortValues={() => -1}
                innerRadius={getInnerRadius(2)}
                outerRadius={getOuterRadius(2)}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => (
                    <AnimatedPie<Subtopic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { subtopic } }) => subtopic}
                        onClickDatum={({ data }) => {
                            if (!animate) return
                            const shouldReinitializeSelectedSubtopic = selectedSubtopic2?.id === data.id
                            if (shouldReinitializeSelectedSubtopic) {
                                return animate && setSelectedSubtopic2(null)
                            } else {
                                animate &&
                                setSelectedSubtopic2(data)
                            }
                        }}
                        onHoverDatum={({ data }) => {
                            setHoveredSubtopic(data)
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                        hoveredSubtopic={hoveredSubtopic}
                        isLevelSelected={selectedSubtopic2 ? true : false}
                    />
                )}
            </Pie>}

            {/* Subtopics Level 3 */}
            {selectedSubtopic2 && selectedSubtopic2.subtopics.length > 0 && <Pie
                data={
                    selectedSubtopic3 ? [selectedSubtopic3] :
                    selectedSubtopic2.subtopics
                }
                pieValue={subtopicSegment}
                pieSortValues={() => -1}
                innerRadius={getInnerRadius(3)}
                outerRadius={getOuterRadius(3)}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => (
                    <AnimatedPie<Subtopic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { subtopic } }) => subtopic}
                        onClickDatum={({ data }) => {
                            if (!animate) return
                            const shouldReinitializeSelectedSubtopic = selectedSubtopic3?.id === data.id
                            if (shouldReinitializeSelectedSubtopic) {
                                return setSelectedSubtopic3(null)
                            } else {
                                animate &&
                                setSelectedSubtopic3(data)
                            }
                        }}
                        onHoverDatum={({ data }) => {
                            setHoveredSubtopic(data)
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                        hoveredSubtopic={hoveredSubtopic}
                        isLevelSelected={selectedSubtopic3 ? true : false}
                    />
                )}
            </Pie>}

            {/* Subtopics Level 4 */}
            {selectedSubtopic3 && selectedSubtopic3.subtopics.length > 0 && <Pie
                data={
                    selectedSubtopic4 ? [selectedSubtopic4] :
                    selectedSubtopic3.subtopics
                }
                pieValue={subtopicSegment}
                pieSortValues={() => -1}
                innerRadius={getInnerRadius(4)}
                outerRadius={getOuterRadius(4)}
                cornerRadius={3}
                padAngle={0.005}
            >
                {(pie) => (
                    <AnimatedPie<Subtopic>
                        {...pie}
                        animate={animate}
                        getKey={({ data: { subtopic } }) => subtopic}
                        onClickDatum={({ data }) => {
                            if (!animate) return
                            const shouldReinitializeSelectedSubtopic = selectedSubtopic4?.id === data.id
                            if (shouldReinitializeSelectedSubtopic) {
                                return setSelectedSubtopic4(null)
                            } else {
                                animate &&
                                setSelectedSubtopic4(data)
                            }
                        }}
                        onHoverDatum={({ data }) => {
                            setHoveredSubtopic(data)
                        }}
                        getColor={({ data: { id } }) => getTopicColor(id)}
                        hoveredSubtopic={hoveredSubtopic}
                        isLevelSelected={selectedSubtopic4 ? true : false}
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
  hoveredSubtopic?: Subtopic | null;
  delay?: number;
  isLevelSelected?: boolean;
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
  hoveredSubtopic = null,
  isLevelSelected = false,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    // arc measurements
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.2;
    
    // subtopic specific logic
    const isSubtopic = Boolean(arc.data?.subtopic)
    const isSubtopicHovered = Boolean(hoveredSubtopic?.id === arc.data?.id)

    // text to display
    const text = isSubtopic
        ? (isLevelSelected || isSubtopicHovered) ? getKey(arc) : null
        : getKey(arc)

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
          onMouseEnter={() => onHoverDatum(arc)}
          onMouseLeave={() => onUnhoverDatum()}
        />
        {hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
                <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy="0.33em"
                    fontSize="x-large"
                    textAnchor="middle"
                    pointerEvents="none"
                >
                    {text}
                </text>
          </animated.g>
        )}
      </g>
    );
  });
}