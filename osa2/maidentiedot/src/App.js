import { React, useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import DisplayResults from "./components/DisplayResults";

const App = () => {
  const url = 'https://restcountries.com/v3.1/all';
  const apikey = process.env.REACT_APP_OPENWEATHER_APIKEY;
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);

  //console.log(weather);

  const fetchCountries = () => {
    axios
      .get(url)
      .then(response => setCountries(response.data))
      .catch(e => console.log(e));
  };

  useEffect(
    fetchCountries
  , []);

  const inputChanged = (e) => {
    setSearch(e.target.value);
    fetchCountries();
  };

  const onSearchBarClick = (e) => {
    if(e.target.value) {
      setSearch(e.target.value);
      fetchCountries();
    }
  }

  const displayCountry = (name) => 
    setCountries(countries.filter(country => country.name.common === name));

  const setWeatherInformationForCountry = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=en&appid=${apikey}`)
      .then(response => setWeather(response.data))
      .catch(e => console.log(e))
  }
  
  return (
    <div>
      <h1>Library of countries</h1>
      <Search search={search} inputchanged={inputChanged} onclicksearch={onSearchBarClick} />
      <DisplayResults countries={countries} search={search} displaycountry={displayCountry} weather={weather} setweather={setWeatherInformationForCountry} />
    </div>
  );
};

export default App;
