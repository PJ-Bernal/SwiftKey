import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface KeyboardData {
  [key: string]: number
}

interface KeyboardHeatmapProps {
  usageData: KeyboardData
  width?: number
  height?: number
}

const KeyBoardHeatMap: React.FC<KeyboardHeatmapProps> = ({
  usageData,
  width = 600,
  height = 250,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ]

  const keySize = 50
  const padding = 8
  const legendHeight = 100
  const totalHeight = height + legendHeight

  useEffect(() => {
    if (!svgRef.current) return

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)

    const colorScale = d3
      .scaleSequential()
      .domain([0, d3.max(Object.values(usageData)) || 0])
      .interpolator(d3.interpolateViridis)

    const getTextColor = (backgroundColor: string): string => {
      const rgb = d3.color(backgroundColor)?.rgb()
      if (!rgb) return '#ffffff'
      const brightness = (rgb.r * 298 + rgb.g * 587 + rgb.b * 114) / 1000
      return brightness > 128 ? '#000000' : '#ffffff'
    }

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.8)')
      .style('color', '#fff')
      .style('padding', '8px 12px')
      .style('border-radius', '6px')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)')

    keyboardLayout.forEach((row, rowIndex) => {
      const rowOffset = rowIndex * 0.5 * keySize

      row.forEach((key, keyIndex) => {
        const usage = usageData[key] || 0
        const keyColor = colorScale(usage)
        const textColor = getTextColor(keyColor)

        const keyGroup = svg
          .append('g')
          .attr(
            'transform',
            `translate(${(keySize + padding) * keyIndex + rowOffset + padding * 2}, ${(keySize + padding) * rowIndex + padding})`
          )

        keyGroup
          .append('rect')
          .attr('width', keySize)
          .attr('height', keySize)
          .attr('rx', 12)
          .attr('fill', keyColor)
          .attr('stroke', '#ffffff')
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.1))')

        keyGroup
          .append('text')
          .attr('x', keySize / 2)
          .attr('y', keySize / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', textColor)
          .style('font-family', 'monospace')
          .style('font-size', '24px')
          .style('font-weight', 'regular')
          .style('user-select', 'none')
          .text(key)

        keyGroup
          .append('text')
          .attr('x', keySize - 8)
          .attr('y', keySize - 8)
          .attr('text-anchor', 'end')
          .attr('dominant-baseline', 'auto')
          .attr('fill', textColor)
          .style('font-family', 'Inter, sans-serif')
          .style('font-size', '12px')
          .style('font-weight', 'bold')
          .style('user-select', 'none')
          .text(usage)
      })
    })

    const legendWidth = width * 0.6
    const legendX = (width - legendWidth) / 2
    const legendY = height + 40

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'usage-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')

    const gradientStops = d3.range(0, 1.1, 0.1).map(t => ({
      offset: `${t * 100}%`,
      color: colorScale(t * d3.max(Object.values(usageData))!),
    }))

    gradient
      .selectAll('stop')
      .data(gradientStops)
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)

    const legendGroup = svg
      .append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`)

    legendGroup
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', 20)
      .attr('fill', 'url(#usage-gradient)')
      .attr('rx', 10)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('filter', 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))')

    const maxUsage = d3.max(Object.values(usageData)) || 0
    const legendLabels = [0, maxUsage / 2, maxUsage]
    const labelPositions = [0, legendWidth / 2, legendWidth]

    legendLabels.forEach((value, i) => {
      legendGroup
        .append('text')
        .attr('x', labelPositions[i])
        .attr('y', 40)
        .attr('text-anchor', i === 0 ? 'start' : i === 1 ? 'middle' : 'end')
        .style('font-family', 'Inter, sans-serif')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#333333')
        .text(Math.round(value))
    })

    legendGroup
      .append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Inter, sans-serif')
      .style('font-size', '18px')
      .style('font-weight', 'bold')
      .style('fill', '#333333')
      .text('Key Usage Frequency')

    return () => {
      tooltip.remove()
    }
  }, [usageData, width, height])

  return (
    <div className="w-full bg-gradient-to-br from-purple-50 to-blue-50 p-3 dark:from-gray-800 dark:to-gray-900 sm:p-4 md:p-5">
      <svg
        ref={svgRef}
        width={width}
        height={totalHeight}
        className="keyboard mx-auto"
      />
    </div>
  )
}

export default KeyBoardHeatMap
