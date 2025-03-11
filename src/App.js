import React from 'react';
import D3ScatterPlot from './D3ScatterPlot';
import GroupedBarChart2 from './GroupedBarChart2';
import StackedBarChart from './StackedBarChart';


import './App.css';

function App() {

  return (
    <div className="App">
      <D3ScatterPlot />
      <br></br>
      <p> The above figure shows a scatter plot graph which plots students' college GPA against their starting salary.</p>
      <p> This was done with the intention of trying to visualize a correlation between GPA and students' earnings right out of school.</p>
      <p> There appears to be no correlation between either variable, with statistical outliers at every level.</p>
      <br></br>
      <StackedBarChart />
      <p> The above figure shows a stacked bar chart which displays the total number of graduates in the data set, grouped by salary range and divided by Major.</p>
      <p> This was done with the intention of trying to determine which fields of study were most lucrative to pursue.</p>
      <br></br>
      <GroupedBarChart2 />
      
    </div>
  );
}

export default App;
