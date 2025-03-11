import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const GroupedBarChart = ({ csvData }) => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    d3.csv("/education_career_success.csv").then(loadedData => {
      const parsedData = loadedData.map(d => ({
        group: +d.Internships_Completed,
        category: d.Field_of_Study,
        value: +d.Starting_Salary
      }));
      setData(parsedData);
    });
  }, [csvData]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 70, right: 150, bottom: 90, left: 90 },
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const groups = [...new Set(data.map(d => d.group))].sort((a, b) => a - b);
    const categories = [...new Set(data.map(d => d.category))];

    const x0 = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.2);

    const x1 = d3.scaleBand()
      .domain(categories)
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
          .domain(categories)
          .range(["#ffd500", "#545454", "#007822", "#d97400", "#001f8f", "#7a4500", "#b51800"]);

    svg.append("g")
      .selectAll("g")
      .data(groups)
      .join("g")
      .attr("transform", d => `translate(${x0(d)},0)`)
      .selectAll("rect")
      .data(d => data.filter(e => e.group === d))
      .join("rect")
      .attr("x", d => x1(d.category))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.category));
      

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    svg.append("g").call(d3.axisLeft(y));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 60)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text("No. of Internships Completed");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -70)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text("Starting Salary");

    const legend = svg.append("g")
      .attr("transform", `translate(${width + 20},0)`);

    categories.forEach((cat, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`);

      legendRow.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", color(cat));

      legendRow.append("text")
        .attr("x", 18)
        .attr("y", 10)
        .text(cat)
        .attr("font-size", "14px")
        .attr("alignment-baseline", "middle");
    });
  }, [data]);

  return (
    <div>
      <h3>Figure 2: A Grouped Bar Chart Showing the Max Starting Salaries by Major & No. of Internships Completed</h3>
        <svg ref={svgRef}></svg>
  </div>
)
};


export default GroupedBarChart;