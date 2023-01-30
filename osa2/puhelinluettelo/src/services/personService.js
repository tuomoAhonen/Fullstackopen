import axios from 'axios';

const dburl = 'http://localhost:3001/persons';

const getAll = () => 
  axios
    .get(dburl)
    .then(response => response.data);

const createPerson = (newPerson) => 
  axios
    .post(dburl, newPerson);

const updatePerson = (id, updatedPerson) => 
  axios
    .put(`${dburl}/${id}`, updatedPerson);

const deletePerson = (id) => 
  axios
    .delete(`${dburl}/${id}`);
    

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