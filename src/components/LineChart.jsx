import React from 'react';
import { line, curveBasis } from 'd3-shape';
import { scaleLinear } from 'd3-scale';
import { max, extent } from 'd3-array';
import { format } from 'd3-format';


function LineChart({data, width, height}) {
      const margin = { top: 40, bottom: 40, left: 60, right: 30}

      const formatScale = format(".2s")

    const yScale = scaleLinear()
        .domain([450000*1000000, max(data, d => d.total)])
        .range([height, 0])

    const yearsTick = data.map(d => d.year)

    const xScale = scaleLinear()
    .domain(extent(data, d => d.year))
    .range([0, width]);

    let path = line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.total))
        .curve(curveBasis)(data)
        

        console.log(path)

    return (
        <div className=''>
            <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} style={{ background: 'griay' }} >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                <text 
                style={{ fill: 'white', fontSize: '1.25em', fontWeight: 800 }}
                x={width/2}
                dy={'-1.2em'}
                >Kenya Total Public Debt</text>
                  <path
                    className='line'
                    d={path}
                    stroke={"white"}
                    transition
                    style={{ transition: 'stroke-dashoffset 0.5s ease 0s' }}
                    strokeWidth={1.5}
                    strokeDasharray={0}
                    strokeDashoffset={0}
                    fill={"none"}
                  />
                  <g>
                  <text  
                    transform={`translate(${height,0})`}  
                    style={{ fontSize: '0.925em', fill: 'white'}}
                    x={width/2}
                    y={height+ margin.bottom} 
                    dy={''}>
                        Budget Allocated (kSH)
                  </text>
                  <line
                          y1={height}
                          x1={0}
                          y2={height}
                          x2={width}
                          stroke={"white"}
                          strokeWidth={1}
                         />

                   {xScale.ticks().map(tick => {
                    console.log('tick', tick)
                    return (
                        <>
                          <line
                          y1={height}
                          x1={xScale(tick)}
                          y2={height+5}
                          x2={xScale(tick)}
                          stroke={"white"}
                          strokeWidth={2}
                         
                          
                         />
                        <text
                          x={xScale(tick)}
                          y={height}
                          fill={"white"}
                          dy={"1.5em"}
                          textAnchor={'middle'}
                          style={{ fontSize: '0.875em' }}
                        >
                            {`${tick}`}
                        </text>
                        </>
                    )
                   })}

                <text  
                    transform={`translate(${0,0}) rotate(-90)`}  
                    style={{ fontSize: '0.925em', fill: 'white'}}
                    x={-height/2}
                    y={0} 
                    dy={'-3.25em'}>
                        Years
                </text>
                 <line
                          x1={0}
                          y1={0}
                          x2={0}
                          y2={height}
                          stroke={"white"}
                         />
                   {yScale.ticks().map(tick => {
                    console.log('tick', tick)
                    return (
                        <>
                        <line
                          x1={0}
                          y1={yScale(tick)}
                          x2={-5}
                          y2={yScale(tick)}
                          stroke={"white"}
                          strokeWidth={3}
                         />
                        <text
                          x={0}
                          y={yScale(tick)}
                          fill={"white"}
                          dx={'-2.5em'}
                          textAnchor={'start'}
                          dy={'0.45em'}
                          style={{ fontSize: '0.875em' }}
                        >
                            {formatScale(tick)}
                        </text>
                        </>
                    )
                   })}
                  </g>
                </g>
            </svg>
        </div>
    );
}

export default LineChart;