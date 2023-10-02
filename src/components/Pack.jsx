import React, { useEffect , useState, useRef} from 'react';
import { csv} from 'd3-fetch';
import { scaleLinear, scaleBand, scaleLog } from 'd3-scale';
import { extent } from 'd3-array';
import { forceSimulation, forceCenter, forceCollide, forceManyBody } from 'd3-force';
import { select } from 'd3-selection';


function Pack({width, height}) {
    const [data, setData] = useState([])
    const svgRef = useRef(null)
    useEffect(() => {
        csv('./budget.csv', (d) => {
            return {
              amount : +d["amount"],
              sector: d["sector"],
            }
          }).then((res) => {
            setData(res)
          }) 
    }, [])

    const xScale = scaleLinear()
      .domain([0, 4000])
      .range([0, width])
    
    const yScale = scaleBand()
      .domain(data.map(item => item.sector))
      .range([height/2, 0])

  const svg = select(svgRef.current)

useEffect(()=>{
    const node = svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", d => xScale(d.amount))
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .style("fill", "gray")
      // .style("fill-opacity", 0.3)
      .attr("stroke", "#69a2b2")
      .style("stroke-width", 2)

  let simulation =  forceSimulation()
  .force("center", forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
  .force("charge", forceManyBody().strength(25)) // Nodes are attracted one each other of value is > 0
  .force("collide", forceCollide().radius(45).iterations(1)) // Force that avoids circle overlapping

  simulation
  .nodes(data)
  .on("tick", function(d){
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
  })

  node.on("mouseover", function(d,i) {
    

    select(this).style("fill", "green")
 })
})


    return (
        <div>
            <svg ref={svgRef} height={height} width={width} style={{ background: 'yellow' }}>
            </svg>
        </div>
    );
}

export default Pack;