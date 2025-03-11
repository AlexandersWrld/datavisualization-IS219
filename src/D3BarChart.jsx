import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3BarChart = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv("/education_career_success.csv").then((loadedData) => {
      const groupedData = d3.rollup(
        loadedData,
        v => d3.mean(v, d => Number(d.Job_Offers) || 0), // Calculate average
        d => d.Internships_Completed.trim() // Group by Internship Count
      );
    
      // Convert the Map to an array and sort by Internship Count
      const averagedData = Array.from(groupedData, ([category, value]) => ({
        category: Number(category), // Convert category back to number
        value
      })).sort((a, b) => a.category - b.category); // Sort in ascending order
    
      console.log("Averaged Data:", averagedData);
      setData(averagedData);
    });
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${600} ${400}`);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // X-Axis Scale (Internships Completed)
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.category)) // Ensure proper mapping
      .range([0, width])
      .padding(0.2);

    // Y-Axis Scale (Job Offers)
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 1]) // Prevent NaN issues
      .nice()
      .range([height, 0]);

    // Add X Axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `Internships: ${d}`))
      .selectAll("text")
      .attr("font-size", "12px");

    // Add Y Axis
    g.append("g").call(d3.axisLeft(yScale).ticks(5));

    // Append Y Axis
g.append("g").call(d3.axisLeft(yScale));

// Y-Axis Label
g.append("text")
  .attr("transform", "rotate(-90)") // Rotate to vertical
  .attr("x", -height / 2) // Centered along Y-axis
  .attr("y", -margin.left + 15) // Adjust position to the left
  .attr("text-anchor", "middle") // Center align
  .attr("font-size", "14px")
  .attr("fill", "#333")
  .text("Average Number of Job Offers");

    // Draw bars with correct height
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.category))
      .attr("y", height) // Start from bottom
      .attr("width", xScale.bandwidth())
      .attr("height", 0) // Start at 0 for animation
      .attr("fill", "#69b3a2")
      .transition()
      .duration(800)
      .attr("y", d => yScale(d.value)) // Move to correct position
      .attr("height", d => height - yScale(d.value)); // Ensure correct height

  }, [data]);

  return (
    <div>
      <h2>D3 Bar Chart from CSV</h2>
      {data ? <svg ref={svgRef} style={{ width: "100%", maxWidth: "600px", height: "400px", border: "1px solid #ccc" }} /> : <p>Loading data...</p>}
    </div>
  );
};

export default D3BarChart;
