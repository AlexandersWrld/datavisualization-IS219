import React from 'react';
import D3ScatterPlot from './D3ScatterPlot';
import D3ScatterPlot2 from './D3ScatterPlot2';
import GroupedBarChart2 from './GroupedBarChart2';
import StackedBarChart from './StackedBarChart';


import './App.css';

function App() {

  return (
    <div className="App">

    <div className="titleblock">
    <h1>How do the choices made in one's academic journey impact their career outcomes?</h1>
    <p>In the age of information, the professional landscape has seen much change in the way skills and knowledge are passed on. 
      <br></br>
      In many fields, especially those centered around technology, education is no longer the only ticket in to the professional world. 
      <br></br>
      There are many who believe academia to be optional for entry. In my project, I seek to take an objective look at the data 
      and come 
      <br></br>
      to a conclusion on whether or not school is the be-all, end-all for career sucess.</p>
      </div>
      
      <div className="scatterplot">
      <D3ScatterPlot />
      <br></br>
      <p id="scattertext"> The above figure shows a scatter plot graph which plots students' college GPA against their starting salary.
      <br></br>
       This was done with the intention of trying to visualize a correlation between GPA and students' earnings right out of school.
       <br></br>
      There appears to be no correlation between either variable, with statistical outliers at every level.</p>
      </div>

      <div className="scatterplot2">
      <D3ScatterPlot2 />
      <br></br>
      <p id="scattertext2"> The above figure shows a point diagram which plots students' median starting salary & median mid-career salary against their major.
      <br></br>
       This was done with the intention of trying to visualize a correlation between student's major and their earnings throughout their career.</p>
      </div>

      <div className="stackedbar">
      <StackedBarChart />
      <p> The above figure shows a stacked bar chart which displays the total number of graduates in the data set, grouped by salary range and divided by Major.
      <br></br>
      This was done with the intention of trying to determine which fields of study were most lucrative to pursue.
      <br></br>
      This was also done to establish any correlation between starting salary and major. However, there seems to be very little.</p>
      </div>

      
      <div className="groupedbar">
      <GroupedBarChart2 />
      <p> The above figure shows a grouped bar chart which displays the modal number of job offers graduates received compared to the number of internships completed.
      <br></br>
      The graduates were grouped according to their majors in order to give a more objective look at each field of study.
      There seems to be no real trends within each group.</p>
      </div>
      
    </div>
  );
}

export default App;
