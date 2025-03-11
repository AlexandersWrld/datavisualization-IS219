import React from 'react';
import D3TimeSeriesChart from './D3TimeSeriesChart';
import D3BarChart from './D3BarChart';
import D3ScatterPlot from './D3ScatterPlot';

function App() {
  return (
    <div className="App">
      <D3BarChart />
      <D3ScatterPlot /> 
    </div>
  );
}

export default App;
