import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const D3ScatterPlot2 = () => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv("/degrees-that-pay-back.csv").then((loadedData) => {
      const parsedData = loadedData.map(d => ({
        major: d["Undergraduate_Major"],
        startingSalary: +d["Starting_Median_Salary"].replace(/[$,]/g, ""),
        midCareerSalary: +d["Mid_Career_Median_Salary"].replace(/[$,]/g, "")
      })).sort((a, b) => b.startingSalary - a.startingSalary);
      setData(parsedData);
    }).catch(error => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    if (!data) return;

    const margin = { top: 50, right: 100, bottom: 150, left: 250 };
    const width = 1400 - margin.left - margin.right;
    const height = 1000 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("viewBox", `0 0 ${1400} ${1000}`);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.major))
      .range([0, height])
      .padding(0.7);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.startingSalary, d.midCareerSalary)) * 1.1])
      .range([0, width]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(10).tickFormat(d3.format("$.2s")))
      .selectAll("text")
      .style("font-size", "18px");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .style("font-size", "18px");

    const tooltip = d3.select(tooltipRef.current);

    g.selectAll(".start-circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "start-circle")
      .attr("cx", d => xScale(d.startingSalary))
      .attr("cy", d => yScale(d.major) + yScale.bandwidth() / 2)
      .attr("r", 8)
      .attr("fill", "#69b3a2")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`${d.major}<br/>Starting Salary: $${d.startingSalary.toLocaleString()}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 40}px`);
      })
      .on("mousemove", event => {
        tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 40}px`);
      })
      .on("mouseout", () => {
        tooltip.style("visibility", "hidden");
      });

    g.selectAll(".mid-circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "mid-circle")
      .attr("cx", d => xScale(d.midCareerSalary))
      .attr("cy", d => yScale(d.major) + yScale.bandwidth() / 2)
      .attr("r", 8)
      .attr("fill", "#ff5733")
      .attr("opacity", 0.8)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .html(`${d.major}<br/>Mid-Career Salary: $${d.midCareerSalary.toLocaleString()}`)
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
