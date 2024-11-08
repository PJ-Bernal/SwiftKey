// Types.ts
interface KeyData {
  key: string
  usage: number
}

interface KeyboardData {
  [key: string]: number
}

interface KeyboardHeatmapProps {
  usageData: KeyboardData
  width?: number
  height?: number
}

// KeyboardHeatmap.tsx
import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const KeyboardHeatmap: React.FC<KeyboardHeatmapProps> = ({
  usageData,
  width = 700,
  height = 300,
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  // Keyboard layout configuration
  const keyboardLayout = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
  ]

  const keySize = 45
  const padding = 15
  const legendHeight = 80
  const totalHeight = height + legendHeight

  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)

    // Create color scale
    const colorScale = d3
      .scaleSequential()
      .domain([0, d3.max(Object.values(usageData)) || 0])
      .interpolator(t => {
        if (t === 0) return '#f0f0f0'
        const midPoint = 0.5
        return t <= midPoint
          ? d3.interpolateRgb('#f0f0f0', '#ff7043')(t * 2)
          : d3.interpolateRgb('#ff7043', '#7e57c2')((t - midPoint) * 2)
      })

    // Function to get contrasting text color
    const getTextColor = (backgroundColor: string): string => {
      const rgb = d3.color(backgroundColor)?.rgb()
      if (!rgb) return '#000000'
      const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
      return brightness > 128 ? '#000000' : '#ffffff'
    }

    // Create tooltip
    const tooltip = d3.select('body').append('div').classed('tooltip', true)

    // Draw keyboard
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

        // Key background
        keyGroup
          .append('rect')
          .attr('width', keySize)
          .attr('height', keySize)
          .attr('rx', 4)
          .attr('fill', keyColor)
          .attr('stroke', '#999')
          .attr('stroke-width', 1)
          .on('mouseover', event => {
            tooltip
              .style('visibility', 'visible')
              .html(`<strong>Key: ${key}</strong><br/>Usage: ${usage}`)
              .style('left', `${event.pageX + 10}px`)
              .style('top', `${event.pageY - 28}px`)
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden')
          })

        // Key letter
        keyGroup
          .append('text')
          .attr('x', keySize / 2)
          .attr('y', keySize / 2)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', textColor)
          .style('font-family', '')
          .style('font-size', '18px')
          .style('font-weight', '')
          .style('user-select', 'none')
          .text(key)

        // Usage number
      })
    })

    // Add legend
    const legendWidth = width * 0.7
    const legendX = (width - legendWidth) / 2
    const legendY = height + 20

    // Create gradient
    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'usage-gradient')
      .attr('x1', '0%')
      .attr('x2', '100%')

    const gradientStops = [
      { offset: '0%', color: '#f0f0f0' },
      { offset: '50%', color: '#ff7043' },
      { offset: '100%', color: '#7e57c2' },
    ]

    gradient
      .selectAll('stop')
      .data(gradientStops)
      .enter()
      .append('stop')
      .attr('offset', d => d.offset)
      .attr('stop-color', d => d.color)

    // Draw legend
    const legendGroup = svg
      .append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`)

    legendGroup
      .append('rect')
      .attr('width', legendWidth)
      .attr('height', 20)
      .attr('fill', 'url(#usage-gradient)')
      .attr('rx', 4)
      .attr('stroke', '#999')
      .attr('stroke-width', 1)

    // Add legend labels
    const maxUsage = d3.max(Object.values(usageData)) || 0
    const legendLabels = [0, maxUsage / 2, maxUsage]
    const labelPositions = [0, legendWidth / 2, legendWidth]

    legendLabels.forEach((value, i) => {
      legendGroup
        .append('text')
        .attr('x', labelPositions[i])
        .attr('y', 35)
        .attr('text-anchor', i === 0 ? 'start' : i === 1 ? 'middle' : 'end')
        .style('font-family', 'Courier New, monospace')
        .style('font-size', '12px')
        .style('fill', '#333')
        .text(Math.round(value))
    })

    // Legend title
    legendGroup
      .append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'middle')
      .style('font-family', 'Courier New, monospace')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#333')
      .text('Key Usage Frequency')

    return () => {
      tooltip.remove()
    }
  }, [usageData, width, height])

  return (
    <svg ref={svgRef} width={width} height={totalHeight} className="keyboard" />
  )
}

export default KeyboardHeatmap
