function minSalary(people) {
  const professionsAndSalary = people.map((person) => {
    return { profession: person.profession, salary: Number(person.salary) };
  });

  const getMin = professionsAndSalary.reduce((acc, cur) => {
    const isRepeated = acc.find(
      (person) => person.profession === cur.profession
    );

    if (!isRepeated || isRepeated.salary > cur.salary) {
      acc = acc.filter((people) => people.profession !== cur.profession);
      acc.push({ profession: cur.profession, salary: cur.salary });
    }

    return acc;
  }, []);
  return getMin;
}
module.exports = minSalary;
