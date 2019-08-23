import React from 'react';
import './App.css';
import dotenv from 'dotenv'
//Render entry box for City, State 
// Do API call for lat long
// Do API call for weather
// Return Weather

dotenv.config()



class App extends React.Component {
  inputOnChangeHandler = (e) => {
    this.setState({inputText: e.target.value})
  }
  locationHandler = async () => {
    let locationFetch = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.MAPQUEST_KEY}&city=${this.state.inputText}`)
    let locationData = await locationFetch.json()
    let latitude = locationData.results[0].locations[0].latLng.lat
    let longitude = locationData.results[0].locations[0].latLng.lng
    let weatherFetch = await fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`)
    let weatherData = await weatherFetch.json()
    console.log(weatherData)
  }

  render() {
  return (
    <div className="App">
      <input onChange={this.inputOnChangeHandler}/>
      <button onClick={this.locationHandler}>Request</button>
    </div>
  );
  }
}

export default App;