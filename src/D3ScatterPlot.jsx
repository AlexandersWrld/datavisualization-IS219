import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3ScatterPlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);
  
  // Load CSV data
  useEffect(() => {
    d3.csv("/education_career_success.csv").then((loadedData) => {
      const parsedData = loadedData.map(d => ({
        x: +d.University_GPA,  // Numeric conversion
        y: +d.Starting_Salary
      }));
      setData(parsedData);
    }).catch(error => console.error("Error loading CSV:", error));
  }, []);

  // Draw the scatterplot
  useEffect(() => {
    if (!data) return;

    const margin = { top: 50, right: 80, bottom: 80, left: 100 }; // Increase margins for larger chart
    const width = 1200 - margin.left - margin.right; // Increase width
    const height = 800 - margin.top - margin.bottom; // Increase height

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${1200} ${800}`); // Adjust SVG size

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X and Y scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) * 0.9, d3.max(data, d => d.x) * 1.1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) * 0.9, d3.max(data, d => d.y) * 1.1])
      .range([height, 0]);

    // X and Y axes with labels
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(8).tickFormat(d3.format(".2f"))); // Adjust tick count

    g.append("g")
      .call(d3.axisLeft(yScale));

    // Add axis labels
    g.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("University GPA");

    g.append("text")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 30)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text("Starting Salary ($)");

    // Tooltip setup
    const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // Scatterplot points
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 4)  // Slightly larger points
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`GPA: ${d.x.toFixed(2)}<br/>Salary: $${d.y}`)
          .style("left", `${event.pageX + 5}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });

  }, [data]);

  return (
    <div>
      <h3>Figure 1: A Scatterplot Showing Starting Salaries Compared to Participants' College GPA</h3>
      {data ? (
        <svg ref={svgRef} style={{ width: "100%", maxWidth: "1200px", height: "800px", border: "1px solid #ccc" }} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default D3ScatterPlot;
