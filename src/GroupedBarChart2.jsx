import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

// Helper function to calculate the mode
const calculateMode = (arr) => {
  const frequency = {};
  let maxCount = 0;
  let mode = null;

  arr.forEach((value) => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxCount) {
      maxCount = frequency[value];
      mode = value;
    }
  });

  return mode;
};

const GroupedBarChart2 = ({ csvData }) => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  // Load and parse data from CSV file
  useEffect(() => {
    d3.csv("/education_career_success.csv").then(loadedData => {
      const parsedData = loadedData.map(d => ({
        group: d.Field_of_Study,
        category: +d.Internships_Completed, // Convert to number to sort
        value: +d.Job_Offers, // Ensure the job offers are numbers
      }));
      setData(parsedData);
    });
  }, [csvData]);

  // Calculate mode and render the chart
  useEffect(() => {
    if (!data || data.length === 0) return; // Skip if no data

    // Group data by Field_of_Study and Internships_Completed, and calculate modal Job_Offers
    const aggregatedData = d3.rollup(
      data,
      (v) => calculateMode(v.map(d => d.value)), // Calculate the mode of Job_Offers
      (d) => d.group, // Group by Field_of_Study
      (d) => d.category // Then group by Internships_Completed
    );

    // Flatten the data back into an array
    const finalData = [];
    aggregatedData.forEach((categories, group) => {
      categories.forEach((value, category) => {
        finalData.push({ group, category, value });
      });
    });

    // Sort the categories (Internships_Completed) in ascending order
    const categories = [...new Set(finalData.map(d => d.category))].sort((a, b) => a - b);

    const margin = { top: 70, right: 150, bottom: 90, left: 90 },
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const groups = [...new Set(finalData.map(d => d.group))].sort();

    const x0 = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding(0.5);

    const x1 = d3.scaleBand()
      .domain(categories) // Use sorted categories
      .range([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(finalData, d => d.value)])
      .nice()
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(categories)
      .range(["#b8b8b8", "#4682B4", "#32CD32", "#FFD700", "#b81c00", "#b81c00"]);

    // Render bars
    svg.append("g")
      .selectAll("g")
      .data(groups)
      .join("g")
      .attr("transform", d => `translate(${x0(d)},0)`)
      .selectAll("rect")
      .data(d => finalData.filter(e => e.group === d))
      .join("rect")
      .attr("x", d => x1(d.category))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => color(d.category));

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x0));

    svg.append("g").call(d3.axisLeft(y));

    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 60)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text("Field Of Study");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -70)
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", "16px")
      .text("Modal Number of Job Offers");

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 20},0)`);

    legend.append("text")
      .attr("x", 0)
      .attr("y", -10)
      .attr("font-size", "16px")
      .text("No. of Internships Completed")
      .style("font-weight", "bold");

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
      <h3>Figure 3: A Grouped Bar Chart Showing the Modal No. of Job Offers against & No. of Internships Completed</h3>
      <svg ref={svgRef} style={{ width: "100%", maxWidth: "1000px", height: "100%", border: "1px solid #ccc", background: "#fff"}}></svg>
    </div>
  );
};

export default GroupedBarChart2;
