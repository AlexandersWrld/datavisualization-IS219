import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ dataUrl }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any existing content

    const width = 1200;
    const height = 800;
    const margin = { top: 30, right: 20, bottom: 150, left: 60 };

    d3.csv("/degrees-that-pay-back.csv").then((data) => {
      // Parse percentage as float
      data.forEach((d) => {
        d.PercentChange = parseFloat(
          d["Percent_change_from_Starting_to_Mid-Career_Salary"]
        );
      });

      // Sort by percent change descending
      data.sort((a, b) => b.PercentChange - a.PercentChange);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.Undergraduate_Major))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.PercentChange)])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0))
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .style("font-size", "15px");

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(10).tickFormat((d) => `${d}%`))
          .call((g) => g.select(".domain").remove());

      svg
        .append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Undergraduate_Major))
        .attr("y", (d) => y(d.PercentChange))
        .attr("height", (d) => y(0) - y(d.PercentChange))
        .attr("width", x.bandwidth())
        .attr("fill", "#4682B4");

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);


    });
  }, [dataUrl]);

  return <svg ref={svgRef} style={{ width: "100%", maxWidth: "1300px", height: "900px", border: "1px solid #ccc", background: "#fff" }}></svg>;
};

export default BarChart;