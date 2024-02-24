const compareID = (users) => {
  return users.sort((a, b) => b.id - a.id);
};

export default compareID;
