import SearchResults from "./SearchResults";

const DisplayResults = ({countries, search, displaycountry, weather, setweather}) => {
  return (
    <div>
      { 
        search ?
        <SearchResults countries={countries} search={search} displaycountry={displaycountry} weather={weather} setweather={setweather} />
        :
        <p>No results.</p>
      }
    </div>
  );
};

export default DisplayResults;