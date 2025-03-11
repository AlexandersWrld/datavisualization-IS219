import React from 'react';
import D3ScatterPlot from './D3ScatterPlot';
import GroupedBarChart from './GroupedBarChart';
import GroupedBarChart2 from './GroupedBarChart2';

import './App.css';

function App() {

  return (
    <div className="App">
      <D3ScatterPlot />
      <br></br>
      <GroupedBarChart />
      <GroupedBarChart2 />
    </div>
  );
}

export default App;
