import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";

const ChartComponent = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const processedData = result.data.map((row, index) => ({ id: index, value: row.value }));
          setData(processedData);
        },
      });
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Input type="file" accept=".csv" onChange={handleFileUpload} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-2">Histogram</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="value" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
