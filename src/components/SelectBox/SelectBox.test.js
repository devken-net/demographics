import React from 'react';
import ReactDOM from 'react-dom';
import { SelectBox } from './SelectBox';
import { mount } from 'enzyme';

describe('SelectBox.js', () => {
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
    ReactDOM.render(<SelectBox />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('renders name as title', () => {
    const wrapper = mount(<SelectBox name="Countries"/>);
    const title = wrapper.find('.SelectBox-title');

    expect(title.text()).toEqual("Countries");
  });
  it('renders options', () => {
    const wrapper = mount(<SelectBox options={countries}/>);
    const optionsList = wrapper.find('.SelectBox-list');

    expect(optionsList.children().length).toEqual(countries.length);
  });
  it('renders options with default value', () => {
    const wrapper = mount(<SelectBox options={countries} value={countries[0]}/>);
    const selected = wrapper.find('.SelectBox-list .selected');

    expect(selected.text()).toEqual(countries[0].name);
  });
  it('throws selected value on clicked', (done) => {
    const onUserSelect = (value) => {
      expect(value).toEqual(countries[1]);
      done();
    }
    const wrapper = mount(<SelectBox options={countries} value={countries[0]} onSelect={onUserSelect}/>);
    const optionsList = wrapper.find('.SelectBox-list');
    const toBeSelected = optionsList.find('#BE');
    const selected = wrapper.find('.SelectBox-list .selected');

    // on first load. the default selected value must be index 0.
    expect(selected.text()).toEqual(countries[0].name);

    // Simulate user select an item. 
    // Once we clicked it should call onUserSelect().
    toBeSelected.simulate('click');
  });
});
