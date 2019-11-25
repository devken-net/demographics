import React from 'react';
import { Address } from "./components/Address";
import { Chart } from "./components/Chart";
import { usePersistedState } from "./store/persistedState";
import './App.css';
import countries from "./assets/countries.json";
import states from "./assets/states.json";
import cities from "./assets/cities.json";

function App() {
  // Setup chart props.
  const [chart, setChart] = usePersistedState('chart', countries);
  const onAddressChange = (value) => {
    setChart(value);
  }
  const locations = {
    countries,
    states,
    cities,
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>World Population</h1>
      </header>
      <main className="Location container-fluid">
        <Address {...locations} onChange={onAddressChange}/>
      </main>
      <section className="Demographics container-fluid">
          <h3>Population</h3>
          <Chart value={chart} />
      </section>
    </div>
  );
}

export default App;
