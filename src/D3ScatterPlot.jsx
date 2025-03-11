import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3ScatterPlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);

  // Load CSV data
  useEffect(() => {
    d3.csv("/internships_v_jobs.csv").then((loadedData) => {
      const parsedData = loadedData.map(d => ({
        x: +d.Internships_Completed,  // Ensure numeric conversion
        y: +d.Job_Offers
      }));
      setData(parsedData);
    }).catch(error => console.error("Error loading CSV:", error));
  }, []);

  // Draw the scatterplot
  useEffect(() => {
    if (!data) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${600} ${400}`);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X and Y scales
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.x) * 0.9, d3.max(data, d => d.x) * 1.1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.y) * 0.9, d3.max(data, d => d.y) * 1.1])
      .range([height, 0]);

    // X and Y axes
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    // Scatterplot points
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8);

  }, [data]);

  return (
    <div>
      <h2>D3 Scatterplot with CSV Data</h2>
      {data ? <svg ref={svgRef} style={{ width: "100%", maxWidth: "600px", height: "400px", border: "1px solid #ccc" }} /> : <p>Loading data...</p>}
    </div>
  );
};

export default D3ScatterPlot;