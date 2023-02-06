import axios from 'axios';

//const dburl = 'http://localhost:3001/api/persons';
const dburl = 'https://backendpuhelinluettelo.vercel.app/api/persons';

const getAll = async () => 
  await axios.get(dburl).then(response => response.data);

const createPerson = async (newPerson) => 
  await axios.post(dburl, newPerson);

const updatePerson = async (id, updatedPerson) => 
  await axios.put(`${dburl}/${id}`, updatedPerson);

const deletePerson = async (id) => 
  await axios.delete(`${dburl}/${id}`);
    
// eslint-disable-next-line
export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
};

/*
const getAll = async () => {
  const response = await axios.get(dburl);
  return response.data;
}

const getAll = async () => await axios.get(dburl).then(response => response.data);

const functions = {
  getAll,
  createPerson,
  updatePerson,
  deletePerson
}

export default functions; 
*/