import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as d3Fetch from "d3-fetch";

const StackedBarChart = ({ csvFile }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    d3Fetch.csv("/education_career_success.csv").then(data => {
      const salaryRanges = [
        "<20k", "20k-30k", "30k-40k", "40k-50k", "50k-60k", "60k-70k", "70k-80k",
        "80k-90k", "90k-100k", "100k+"];
      const rangeBins = [20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 125000, 150000, 175000, Infinity];

      const majors = Array.from(new Set(data.map(d => d.Field_of_Study)));
      const rangeData = salaryRanges.map((range, i) => ({ range, ...Object.fromEntries(majors.map(m => [m, 0])) }));

      data.forEach(d => {
        const salary = +d.Starting_Salary;  // Ensure salary is a number
        const major = d.Field_of_Study;
        
        for (let i = 0; i < rangeBins.length; i++) {
          if (salary < rangeBins[i]) {
            rangeData[i][major] = (rangeData[i][major] || 0) + 1;  // Ensure numeric addition
            break;
          }
        }
      });

      setProcessedData(rangeData);
    });
  }, [csvFile]);

  useEffect(() => {
    if (processedData.length === 0) return;

    const width = 1200, height = 700, margin = { top: 40, right: 200, bottom: 100, left: 100 };
    const svg = d3.select(svgRef.current).attr("viewBox", `0 0 ${width} ${height}`);
    svg.selectAll("*").remove();

    const x = d3.scaleBand().domain(processedData.map(d => d.range)).range([margin.left, width - margin.right]).padding(0.2);
    const y = d3.scaleLinear().domain([0, d3.max(processedData, d => d3.sum(Object.values(d).slice(1)))]).nice().range([height - margin.bottom, margin.top]);
    const color = d3.scaleOrdinal().domain(Object.keys(processedData[0]).slice(1)).range(d3.schemeCategory10);

    const stack = d3.stack()
      .keys(Object.keys(processedData[0]).slice(1)) // Get all major names
      .value((d, key) => +d[key]); // Ensure values are treated as numbers

    const series = stack(processedData);
    
    const tooltip = d3.select(tooltipRef.current);
    
    svg.append("g")
    .selectAll("g")
    .data(series)
    .enter()
    .append("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter()
    .append("rect")
    .attr("x", d => x(d.data.range))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth())
    .on("mouseover", function (event, d) {
      const total = d3.sum(Object.values(d.data).slice(1));
      const count = d[1] - d[0];
      const percentage = ((count / total) * 100).toFixed(2);
      const major = this.parentNode.__data__.key;

      tooltip
        .style("visibility", "visible")
        .html(
          `<strong>Salary Range:</strong> ${d.data.range}<br/>
           <strong>Major:</strong> ${major}<br/>
           <strong>Graduates:</strong> ${count}<br/>
           <strong>Percentage:</strong> ${percentage}%`
        );
    })
    .on("mousemove", function (event) {
      tooltip
        .style("top", `${event.pageY - 40}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
    });


    svg.append("g").selectAll("g").data(series).enter().append("g").attr("fill", d => color(d.key)).selectAll("rect").data(d => d).enter().append("rect")
      .attr("x", d => x(d.data.range))
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth());

    svg.append("g").attr("transform", `translate(0,${height - margin.bottom})`).call(d3.axisBottom(x).tickSize(0)); // remove tick lines
    svg.append("g").attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y).ticks(20).tickSize(10)); // increase ticks for more granularity

    // X-axis label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 40)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Salary Ranges");

    // Y-axis label
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Number of Students");

    // Legend
    const legend = svg.append("g").attr("transform", `translate(${width - margin.right + 20},${margin.top})`);
    Object.keys(processedData[0]).slice(1).forEach((major, i) => {
      const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 25})`);
      legendRow.append("rect").attr("width", 20).attr("height", 20).attr("fill", color(major));
      legendRow.append("text").attr("x", 25).attr("y", 15).attr("text-anchor", "start").style("font-size", "14px").text(major);
    });

    
  }, [processedData]);

  return (
    <div>
      <h3>Figure 2: A Stacked Bar Chart Showing The Total Number of Graduates Grouped by Salary Ranges and Proportioned by Major</h3>
      <svg ref={svgRef} style={{ width: "100%", maxWidth: "1200px", height: "800px", border: "1px solid #ccc", background: "#fff"}}></svg>
    
    <div ref={tooltipRef} style={{ position: "absolute", visibility: "hidden", background: "rgba(0, 0, 0, 0.8)", color: "#fff",
      padding: "8px", borderRadius: "5px", fontSize: "14px", pointerEvents: "none",
    }}
  ></div>
    
    </div>
    
  );
};

export default StackedBarChart;
