function sumSalary(salaries) {
  let result = 0;
  const values = Object.values(salaries);
  values.forEach((value) => {
    if (isFinite(value) && !isNaN(value)) {
      result += value;
    }
  })
  return result
}
