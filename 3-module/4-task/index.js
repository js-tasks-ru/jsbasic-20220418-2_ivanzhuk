function showSalary(users, age) {
  let result = '';
  let symbol = ''
  users.forEach((user) => {
    if (user.age <= age) {
      result += symbol + `${user.name}, ${user.balance}`;
      symbol = '\n';
    }
  })
  return result
}
