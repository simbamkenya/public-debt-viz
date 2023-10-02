import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { useEffect } from 'react';
import { format } from 'd3-format';

function BarChart({data, width, height}) {
    const formatScale = format(".2s")


    const margin = { top: 40, bottom: 30, left: 60, right: 40}
 
    const xScale = scaleLinear()
        .domain([450000*1000000, max(data, d => d.total)])
        .range([0, width]);


    const yearsTick = data.map(d => d.year)
    
    const yScale = scaleBand()
    .domain(data.map(d => d.year))
    .range([height, 0])
    
//  console.log(yScale.ticks())
    return (
        <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom} >
            <g transform={`translate(${margin.left}, ${margin.top})`} >
                <text 
                style={{ fill: 'white', fontSize: '1.25em', fontWeight: 800 }}
                x={width/2}
                dy={'-1.2em'}
                >Kenya Total Public Debt</text>
                
               <g>
               <text  
                    transform={`translate(${height,0})`}  
                    style={{ fontSize: '0.925em', fill: 'white'}}
                    x={width/2}
                    y={height+ margin.bottom} 
                    dy={''}>
                        Budget Allocated (kSH)
                </text>
                    {xScale.ticks().map((t,i) => {
                        return (
                           <>
                            <line 
                                x1={xScale(t)}
                                y={0}
                                x2={xScale(t)}
                                y2={height}
                                stroke={'white'}
                            />
                            <text
                                x={xScale(t)}
                                y={0}
                                fill="white"
                                textAnchor="middle"
                                fontSize={10}
                                dy={'-0.45em'}
                            >
                                {formatScale(t)}
                            </text>
                           </>
                        )
                    })}                
                </g>

                <g>
                <text  
                    transform={`translate(${0,0}) rotate(-90)`}  
                    style={{ fontSize: '0.925em', fill: 'white'}}
                    x={-height/2}
                    y={0} 
                    dy={'-3.25em'}>
                        Years
                </text>
                    {yearsTick.map((tick, i) => {
                        return (
                            <text
                              x={0}
                              dy={'1.0em'}
                              dx={'-0.25em'}
                              y={yScale(tick)}
                              fill={"white"}
                              style={{ fontSize: '0.875em' }}
                              textAnchor={"end"}
                             >
                                {tick}
                            </text>
                        )
                    })}
                </g>
               {data && data.map((item, i) => 
                    <rect
                        width={xScale(item.total)}
                        height={yScale.bandwidth()}
                        x={0}
                        y={yScale(item.year)}
                        style={{ fill: "blue", strokeWidth: 0.5, stroke: 'white' }}
                    />        
                )}

            </g>
        </svg>
    );
}

export default BarChart;