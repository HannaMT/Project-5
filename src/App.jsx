import React, { useState, useEffect }from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [info, setInfo] = useState(0)

  useEffect(() => {
    const fetchCityForecast = async () =>{
      const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=NewYork&key=${ACCESS_KEY}`);
      const jsonData = await response.json();
      setInfo(jsonData);
      console.log(info);
    };
    fetchCityForecast().catch(console.error);
  },[]);

  return (
    <div className="body">
    <div className="Side-Bar">
      <div id="Header">
        <h2><img src="logo.png"/> Meteorology</h2>
      </div>
      <div id="NavBar">
        <p>Dashboard</p>
        <p>Search</p>
        <p>About</p>
      </div>
    </div>
    
    <div>
      <div id="Card">
        <div id="card1">
          <h2>{info.city_name}</h2>
          <h2>{info.country_code}</h2>
        </div>
        <div id="card2">
          <h2>{info ? info.data.length : null}</h2>
          <h2>Days</h2>
        </div>
        <div id="card3">
          <h2>{info ? info.data[0].datetime : null}</h2>
          <h2>Today</h2>
        </div>
      </div>

      <div id="List">
        <div id="top">
          <div id="top1"><input type="text" placeholder="Enter Date"/></div>
          <div id="top2"><p>List Length</p> <input type="range" min="0.0" max="1.6" step="0.1"/></div>
          <div id="top3"><button>Search</button></div>
        </div>
        <table>
          <thead>
            <th>Date</th>
            <th>Max Temperature</th>
            <th>Min Temperature</th>
            <th>Average Temperature</th>
          </thead>
          <tbody>
            {info ? info.data.map(function(datetime, i){
              return <tr>
                <td>{info.data[i].datetime}</td>
                <td>{info.data[i].max_temp}</td>
                <td>{info.data[i].min_temp}</td>
                <td>{Math.floor((info.data[i].max_temp + info.data[i].min_temp)/2)}</td>
                </tr>
            }):null}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default App
