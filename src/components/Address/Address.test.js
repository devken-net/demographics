import React from 'react';
import ReactDOM from 'react-dom';
import { Address } from './Address';
import { mount } from 'enzyme';

// import assets
import countries from "../../assets/countries.json";
import states from "../../assets/states.json";
import cities from "../../assets/cities.json";

describe('Address.js', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Address />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders countries', () => {
    const wrapper = mount(<Address countries={countries} states={states} cities={cities}/>);
    const countriesList = wrapper.find('.Address').childAt(0).find('.SelectBox-list');
    const statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    const citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');

    expect(countriesList.children().length).toEqual(countries.length);
    expect(statesList.children().length).toEqual(0);
    expect(citiesList.children().length).toEqual(0);
  });
  it('renders states if have selected country', () => {
    const onChange = (value) => {
      expect(value).toEqual(states['BE']);
    }
    const wrapper = mount(<Address countries={countries} states={states} cities={cities} onChange={onChange}/>);
    let countriesList = wrapper.find('.Address').childAt(0).find('.SelectBox-list');
    let statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    let citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');
    const toBeSelected = countriesList.find('#BE');

    // expect that there will be no states and cities rendered yet.
    expect(countriesList.children().length).toEqual(countries.length);
    expect(statesList.children().length).toEqual(0);
    expect(citiesList.children().length).toEqual(0);

    // Let's simulate on clicking a country.
    toBeSelected.simulate('click');


    // Get the updated children of lists after re-render change was made.
    countriesList = wrapper.find('.Address').childAt(0).find('.SelectBox-list');
    statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');

    expect(countriesList.children().length).toEqual(countries.length);
    expect(statesList.children().length).toEqual(states['BE'].length);
    expect(citiesList.children().length).toEqual(0);
  });
  it('renders cities if have selected country and states', () => {
    const onChange = (value, type) => {
      if(type === 'Country') {
        expect(value).toEqual(states['BE']);
      } else if(type === 'State') {
        expect(value).toEqual(cities['Luxembourg']);
      }
    }
    const wrapper = mount(<Address countries={countries} states={states} cities={cities} onChange={onChange}/>);
    let countriesList = wrapper.find('.Address').childAt(0).find('.SelectBox-list');
    let statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    let citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');
    const toBeSelectedCountry = countriesList.find('#BE');

    // Let's simulate on clicking a country.
    toBeSelectedCountry.simulate('click');

    // Get the updated children of lists after re-render change was made.
    countriesList = wrapper.find('.Address').childAt(0).find('.SelectBox-list');
    statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');

    expect(statesList.children().length).toEqual(states['BE'].length);

    // Get the state to be selected.
    const toBeSelectedState = statesList.find('#Luxembourg');

    // Let's simulate on clicking a state.
    toBeSelectedState.simulate('click');

    // Get the updated children of lists after re-render change was made.
    statesList = wrapper.find('.Address').childAt(1).find('.SelectBox-list');
    citiesList = wrapper.find('.Address').childAt(2).find('.SelectBox-list');

    expect(statesList.children().length).toEqual(states['BE'].length);
    expect(citiesList.children().length).toEqual(cities['Luxembourg'].length);
  });

});