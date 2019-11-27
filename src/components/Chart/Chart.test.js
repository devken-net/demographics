import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from './Chart';
import { mount } from 'enzyme';

describe('Chart.js', () => {
  const countries = [
    {
      id: "PH",
      name: "Philippines",
      population: "108702078"
    },
    {
      id: "BE",
      name: "Belgium",
      population: "11539328"
    },
    {
      id: "NL",
      name: "Netherlands",
      population: "17097130"
    }
  ];

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Chart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders data', () => {
    const wrapper = mount(<Chart value={countries}/>);
    const svg = wrapper.find('svg .rv-xy-plot__series.rv-xy-plot__series--bar');

    expect(svg.children().length).toEqual(countries.length);
  });
});