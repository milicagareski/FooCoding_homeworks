function maxAge(people) {
  const findMaxAge = people.reduce((acc, cur) => {
    return acc < cur.age ? cur.age : acc;
  }, -Infinity);
  return findMaxAge;
}

module.exports = maxAge;
