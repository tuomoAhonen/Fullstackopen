import axios from "axios";

const urlAll = 'https://studies.cs.helsinki.fi/restcountries/api/all';
const urlByName = 'https://studies.cs.helsinki.fi/restcountries/api/name';

export const getAll = async () => {
  const result = await axios.get(urlAll);
  return result.data;
};

export const getCountry = async (name) => {
  const result = await axios.get(`${urlByName}/${name}`);
  return result.data;
};