const SearchFromArrayWithObjects = (searchWord, array, objectsProperty) => array.filter(object => 
  object[objectsProperty].toLowerCase().includes(searchWord.toLowerCase()));

export default SearchFromArrayWithObjects;