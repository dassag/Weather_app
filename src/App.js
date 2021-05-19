import React, {useState, useRef, useEffect} from "react";
const api={
  key:'05e59341e0bace9c222f7007980df209',
  url:'https://api.openweathermap.org/data/2.5/'
}

function App() {
const [query,setQuery]=useState('')
const[weather,setWeather]=useState({})

const inputRef = useRef('')

useEffect(() => {
  inputRef.current.focus()
})

const search= forecast=>{
  if(forecast.key==='Enter'){
    fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(res=>res.json())
    .then(result=>{
      setWeather(result)
      setQuery('')
      console.log(result)
    })
  }
}


let date = String(new window.Date())
date = date.slice(0,15)

  return (
    <div className={
      (typeof weather.main!="undefined")?
      ((weather.main.temp<10)?'app-snow':
      (weather.main.temp<20)?'app-cold':'App'):'App'}>
      <main>
        <div className="search-box"> 
          <input 
          type="text" 
          ref = {inputRef}
          className="search" 
          placeholder="Search your city"
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main !="undefined")?(
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{date}</div>
          </div>
          <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°C</div>
            <div className="feels">Feels like - {weather.main.feels_like}</div>
            <div className="variation">{weather.main.temp_max}↑ - {weather.main.temp_min}↓ </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>):('')}
      </main>
    </div>
  );
}

export default App;
