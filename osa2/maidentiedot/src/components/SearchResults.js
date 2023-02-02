const SearchResults = ({countries, search, displaycountry, weather, setweather}) => {
  const filterResults = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()));
  
  if (filterResults.length > 10) {
    return (
      <p>Too many matches, give another character/letter to find match(es).</p>
    );
  } else if (filterResults.length < 10 && filterResults.length > 1) {
    return (
      <table>
        <tbody>
          {
            filterResults.map((result, index) => 
              <tr key={index}>
                <td>
                  {result.name.common}
                </td>
                <td>
                  <input type='button' value='show' onClick={() => displaycountry(result.name.common)} />
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  } else if (filterResults.length === 1) {
    const lastResult = filterResults.map((result) => result);
    //console.log(weather);
    if (weather === null || lastResult[0].capital[0].toLowerCase() !== weather.name.toLowerCase()) {
      //console.log(lastResult[0].capital[0]);
      setweather(lastResult[0].capital[0]);
    }
    //console.log(weather);
    return (
      <div>
        <h2>{lastResult[0].name.common}</h2>
        <p>Capital: {lastResult[0].capital[0]}</p>
        {/*
          lastResult[0].capital.length === 1 ?
          <p>Capital: {lastResult[0].capital[0]}</p>
          :
          lastResult[0].capital.length > 1 ?
          lastResult[0].capital.map(capital => 
            <p>{capital}</p>
          )
          :
          <p>Not found.</p>
        */}
        <p>Area: {lastResult[0].area} km&#178;</p>
        <p>Population: {lastResult[0].population}</p>
        <p style={{marginBottom: 5}}>Languages:</p>
        <ul style={{marginTop: 0, paddingLeft: 20}}>
          {
            Object.keys(lastResult[0].languages).map((key, index) => 
                <li key={index}>{lastResult[0].languages[key]}</li>
            )
          }
        </ul>
        <img src={lastResult[0].flags.png} alt={`${lastResult[0].name.common}'s flag`} />
        {
          weather !== null ?
          <div>
            <h2>Weather in {lastResult[0].capital[0]}</h2>
            <p>Temperature: {Math.round(weather.main.temp)} &#8451;<br /> Feels like: {Math.round(weather.main.feels_like)} &#8451;</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].icon} icon`} />
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
          :
          <p>Error. No weather information available.</p>
        }
      </div>
    );
  } else {
    return (
      <p>Not Found!</p>
    );
  }
}

export default SearchResults;