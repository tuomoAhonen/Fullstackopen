const infolog = (...i) => {
  console.log(...i);
};

const errorlog = (...e) => {
  console.log(...e);
};

module.exports = {infolog, errorlog};