function minAge(people) {
  const findMinAge = people.reduce((acc, cur) => {
    return acc > cur.age ? cur.age : acc;
  }, Infinity);
  return findMinAge;
}

module.exports = minAge;
