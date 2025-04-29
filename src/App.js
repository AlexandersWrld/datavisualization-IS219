import React from 'react';
import D3ScatterPlot from './D3ScatterPlot';
import D3ScatterPlot2 from './D3ScatterPlot2';
import GroupedBarChart2 from './GroupedBarChart2';
import StackedBarChart from './StackedBarChart';
import BarChart from './BarChart';


import './App.css';

function App() {

  return (
    <div className="App">

    <div className="titleblock">
    <div className="hometext">
    <h1>Data Vizualisation Project</h1>
    <h2>How do the choices made in one's academic journey impact their career outcomes?</h2>
    <p>In the age of information, the professional landscape has seen much change in the way skills and knowledge are passed on. 
      In many fields, especially those centered around technology, education is no longer the only ticket in to the professional world. 
      There are many who believe academia to be optional for entry. In my project, I seek to take an objective look at the data 
      and come to a conclusion on whether or not school is the be-all, end-all for career sucess.</p>
      <a href="#scatterplot2"> ENTER </a>
    </div>
    </div>

    <div id="section-1"> 

       <div className="card" id="scatterplot2">
  
        <div className="card-graph">
          <D3ScatterPlot2 />
        </div>
        <div className="card-text">
          <h2>Figure 1: Median Starting and Mid-Career Salary by Undergraduate Major</h2>
          <p>The figure on the left shows a point diagram which plots students' median starting salary & median mid-career salary against their major. 
          This was done with the intention of trying to visualize a correlation between student's major and their earnings throughout their career. </p>
          <h2>Analysis</h2>
          <p>There is a strong correlation between the two that can be observed. STEM careers generally held higher
            starting salaries and greater potential for career growth.
          </p>
          <p>This suggests that a student's choice of major is relevant to their career outcome.</p>
        </div>
      </div>

    <div id="keystats"> 

      <div className="card" id="highest-paid">
        <div className="card-text">
          <h3>Highest Starting Salary</h3>
          <h3>$74,300</h3>
          <h4>Physician Assistant</h4>
        </div>
      </div>

      <div className="card" id="lowest-paid">
        <div className="card-text">
          <h3>Lowest Starting Salary</h3>
          <h3>$34,000</h3>
          <h4>Spanish</h4>
        </div>
      </div>

      <div className="card" id="highest-midcareer">
        <div className="card-text">
          <h3>Highest Mid-Career Salary</h3>
          <h3>$107,000</h3>
          <h4>Chemical Engineering</h4>
        </div>
      </div>
      
      <div className="card" id="Lowest-midcareer">
        <div className="card-text">
          <h3>Lowest Mid-Career Salary</h3>
          <h3>$52,000</h3>
          <h4>Education & Religion &#40;tie&#41; </h4>
        </div>
      </div>

    </div>

    </div>


    <div id="section-2"> 

    <div className="card" id="scatterplot-info">
        <div className="card-text">
          <h2>The Scatterplot & its Validity</h2>
          <p>Scatter diagrams are effective for displaying correlation because they visually show the relationship between 
            two variables, making it easy to identify patterns, trends, or associations. By plotting individual data points, 
            you can quickly assess whether a positive, negative, or no correlation exists, as well as spot outliers or anomalies 
            in the data.</p>
            <p>Additionally, scatter diagrams can reveal the strength and 
            direction of a relationship and highlight whether the correlation is linear or nonlinear.</p>
        </div>
      </div>
      
      <div className="card" id="scatterplot">
  
        <div className="card-graph">
          <D3ScatterPlot />
        </div>
        <div className="card-text">
          <h2>Figure 2: A Scatterplot Showing Starting Salaries Compared to Participants' College GPA</h2>
          <p>The figure on the left shows a scatter plot graph which plots students' college GPA against their starting salary. 
          This was done with the intention of trying to visualize a correlation between GPA and students' earnings right out of school. </p>
          <h2>Analysis</h2>
          <p>There appears to be no correlation between either variable, with statistical outliers at every level.</p>
          <p>This suggests that grades were not always a factor in career success after graduation.</p>
        </div>
      </div>


      </div>



    <div id="section-3">

    <div className="card" id="BarChart">
        <div className="card-graph">
          <BarChart />
        </div>
        <div className="card-text">
          <h2>Figure 3: Percent Increase from Starting to Mid-Career Salary by Major</h2>
          <p>The figure on the left shows a scatter plot graph which plots students' college GPA against their starting salary. 
          This was done with the intention of trying to visualize a correlation between GPA and students' earnings right out of school. </p>
          <h2>Analysis</h2>
          <p>There appears to be no correlation between either variable, with statistical outliers at every level.</p>
          <p>This suggests that grades were not always a factor in career success after graduation.</p>
        </div>
      </div>

    </div>

      <div className="stackedbar">
      <StackedBarChart />
      <p> The above figure shows a stacked bar chart which displays the total number of graduates in the data set, grouped by salary range and divided by Major.
      <br></br>
      This was done with the intention of trying to determine which fields of study were most lucrative to pursue.
      <br></br>
      This was also done to establish any correlation between starting salary and major. However, there seems to be very little.</p>
      </div>

    </div>
  );
}

export default App;
