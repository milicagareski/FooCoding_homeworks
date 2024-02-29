function totalSalary(people) {
  const getSalary = [];
  people.forEach((person) => {
    getSalary.push(Number(person.salary));
  });
  const total = getSalary.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return total;
}

module.exports = totalSalary;
