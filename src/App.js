import React from 'react';
import D3ScatterPlot from './D3ScatterPlot';
import D3ScatterPlot2 from './D3ScatterPlot2';
import StackedBarChart from './StackedBarChart';
import BarChart from './BarChart';



import './App.css';

function App() {

  return (
    
    <div className="App">
    <meta name="viewport" content="width=device-width, initial-scale=0.5" />

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
          <h2>Lowest Starting Salary</h2>
          <h2>$34,000</h2>
          <h4>Spanish</h4>
        </div>
      </div>

      <div className="card" id="highest-midcareer">
        <div className="card-text">
          <h2>Highest Mid-Career Salary</h2>
          <h2>$107,000</h2>
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

    <div id="section-3">

    <div className="card" id="BarChart">
        <div className="card-graph">
          <BarChart />
        </div>
        <div className="card-text">
          <h2>Figure 2: Percent Increase from Starting to Mid-Career Salary by Major</h2>
          <p>The figure on the left is a bar chart displaying the overall percentage increase that graduate salaries saw
          by their mid-career, arranged according to their major. This was done in an attempt to measure how much growth could
          typically be expected in each career field. </p>
          <h2>Analysis</h2>
          <p>Without the added context from figure 1, a graph like this may be misleading. With the additonal
          information, however, not only can the magnitude of the growth be assessed, but also the significance of the growth 
          as it is reflected in real world earning increases.</p>
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
          <h2>Figure 3: A Scatterplot Showing Starting Salaries Compared to Participants' College GPA</h2>
          <p>The figure on the left shows a scatter plot graph which plots students' college GPA against their starting salary. 
          This was done with the intention of trying to visualize a correlation between GPA and students' earnings right out of school. </p>
          <h2>Analysis</h2>
          <p>There appears to be no correlation between either variable, with statistical outliers at every level.</p>
          <p>This suggests that grades were not always a factor in career success after graduation.</p>
        </div>
      </div>


      </div>

    <div id="section-4">

    <div className="card" id="StackedBar">
  
        <div className="card-graph">
        <StackedBarChart />
        </div>
        <div className="card-text">
          <h2>Figure 4: A Stacked Bar Chart Showing the Distibution of Graduates by Salary Range</h2>
          <p>The Figure shows a stacked bar chart which shows varying salary ranges for graduates. The slices bars show the distrubitons of students by major.
          This was done with the intention of trying to visualize if there was a disproportionate number of any one major in any salary range. </p>
          <h2>Analysis</h2>
          <p>There appears to be a very balanced distrubition of graduates in each salary range.
          This shows that there are top and also low earners within every major.</p>
        </div>
      </div>

    </div>

    <div id="section-5">

    <div className="card" id="conlusion">
        <div className="card-text">
          <h1>Lessons Learned / Conclusion</h1>
          <p>The answer to whether or not one's academic choices impact career outcomes is more nuanced than a simple yes or no.
            The data shown suggests that there are some factors that impact success more than others. Major seemed to be far more
            impactful to sucess than the grades obtained by students. </p>
        </div>
      </div>

    </div>

    </div>
  );
}

export default App;
