import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3ScatterPlot2 = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv("/degrees-that-pay-back.csv").then((loadedData) => {
      const parsedData = loadedData.map(d => ({
        major: d["Undergraduate Major"],
        salary: +d["Starting_Median_Salary"].replace(/[$,]/g, "")
      })).sort((a, b) => b.salary - a.salary); // Sort by salary descending
      setData(parsedData);
    }).catch(error => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    if (!data) return;

    const margin = { top: 50, right: 100, bottom: 150, left: 250 }; // Increased left margin for better label space
    const width = 1400 - margin.left - margin.right; // Increased width
    const height = 1000 - margin.top - margin.bottom; // Increased height for better spacing

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${1400} ${1000}`); // Adjusted for new dimensions

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Increased padding to space out the labels
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.major))
      .range([0, height])
      .padding(0.7); // Increased padding for better spacing between labels

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.salary) * 1.1])
      .range([0, width]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("$.2s")))
      .selectAll("text")
      .style("font-size", "18px"); // Increased font size for x-axis labels

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "18px"); // Increased font size for y-axis labels

    const tooltip = d3.select(tooltipRef.current);

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.salary))
      .attr("cy", d => yScale(d.major) + yScale.bandwidth() / 2)
      .attr("r", 8) // Increased circle size for better visibility
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`${d.major}<br/>Salary: $${d.salary.toLocaleString()}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 40}px`);
      })
      .on("mousemove", event => {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 40}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });
  }, [data]);

  return (
    <div>
      <h2>Figure 2: Median Starting Salary by Undergraduate Major</h2>
      {data ? (
        <svg ref={svgRef} style={{ width: "100%", maxWidth: "1400px", height: "1000px", border: "1px solid #ccc", background: "#fff" }} />
      ) : (
        <p>Loading data...</p>
      )}
      <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "rgba(0, 0, 0, 0.8)", 
          color: "#fff", padding: "8px", borderRadius: "5px", fontSize: "14px", pointerEvents: "none" }}></div>
    </div>
  );
};

export default D3ScatterPlot2;
