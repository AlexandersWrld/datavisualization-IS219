import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3ScatterPlot = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
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
    const tooltip = d3.select(tooltipRef.current);

    // Scatterplot points
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 3)
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip
          .style("visibility", "visible")
          .html(`GPA: ${d.x.toFixed(2)}<br/>Salary: $${d.y.toLocaleString()}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 40}px`);
      })
      .on("mousemove", function (event) {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 40}px`);
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

  }, [data]);

  return (
    <div>
      {data ? (
        <svg ref={svgRef} style={{ width: "100%", maxWidth: "1200px", height: "800px", border: "1px solid #ccc", background: "#fff"}} />
      ) : (
        <p>Loading data...</p>
      )}

    <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "rgba(0, 0, 0, 0.8)", 
        color: "#fff", padding: "8px", borderRadius: "5px", fontSize: "14px", pointerEvents: "none",
        }}
      ></div>

    </div>
  );
};

export default D3ScatterPlot;
