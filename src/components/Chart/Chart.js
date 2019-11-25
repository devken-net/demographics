import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
}  from 'react-vis';
import 'react-vis/dist/style.css';
import './Chart.css';

/**
 * Format values into chart supported values.
 * This can be a separate file if the application needs to support multiple input format.
 */
const formatData = (arr) => arr.map(({ name, population }) => ({ x: name, y: Number(population) }));

/**
 * This is a reusable lower order component to display Bar Chart.
 */
function Chart({ value }) {
  let data = (value && formatData(value)) || [] ;

  return (
    <div className="Chart">
      <XYPlot
        margin={{bottom: 70}}
        xType="ordinal" 
        width={500} 
        height={450} animation={true}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis tickSize={0.05} />
        <VerticalBarSeries 
          data={data}
        />
      </XYPlot>
    </div>
  );
}

export { Chart };
