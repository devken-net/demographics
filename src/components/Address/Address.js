import React from 'react';
import { SelectBox } from '../SelectBox';
import { usePersistedState } from "../../store/persistedState";

/**
 * A higher order component for the display and interaction of addresses.
 */
function Address({ countries, states, cities, onChange }) {
  // Set address state.
  const [selectedCountry, setCountry] = usePersistedState('country', '');
  const [selectedState, setState] = usePersistedState('state', '');
  const [selectedCity, setCity] = usePersistedState('city', '');

  // Updates address state when user select an item from SelectBox.
  const onSelect = (value, type) => {
    if(type === "Country") {
      setCountry(value);
      setState({});
      setCity({});
      onChange(states[value.id], type);
    } else if(type === "State") {
      setState(value);
      setCity({});
      onChange(cities[value.id], type);
    } else if(type === "City") {
      setCity(value);
    }
  }

  return (
    <div className="Address row">
      <div className="Location-box col-sm">
        <SelectBox
          name="Country"
          options={countries}
          value={selectedCountry}
          onSelect={onSelect}>
        </SelectBox>
      </div>
      <div className="Location-box col-sm">
        <SelectBox
          name="State"
          options={(selectedCountry && states[selectedCountry.id]) || []}
          value={selectedState}
          onSelect={onSelect}>
        </SelectBox>
      </div>
      <div className="Location-box col-sm">
        <SelectBox
          name="City"
          options={(selectedState && cities[selectedState.id]) || []}
          value={selectedCity}
          onSelect={onSelect}>
        </SelectBox>
      </div>
    </div>
  );
}

export { Address };
