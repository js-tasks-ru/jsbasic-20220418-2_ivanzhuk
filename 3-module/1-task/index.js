function namify(users) {
  const userNames = []
  users.forEach((user) => {
    userNames.push(user.name);
  })
  return userNames
}
