function totalSalary(people) {
  const salary = people.map((person) => {
    return Number(person.salary);
  });

  const total = salary.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  return total;
}

module.exports = totalSalary;
