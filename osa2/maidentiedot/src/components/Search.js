const Search = ({search, inputchanged, onclicksearch}) => 
  <p>Country to find: <input type='text' name='search' onChange={inputchanged} value={search} onClick={onclicksearch} /></p>;

export default Search;