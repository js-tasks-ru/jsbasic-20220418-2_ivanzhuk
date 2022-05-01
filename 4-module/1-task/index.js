function makeFriendsList(friends) {
  let list = document.createElement('ul')
  let friendList = ''
  friends.forEach((friend) => {
    friendList += `<li>${friend.firstName} ${friend.lastName}</li>\n`
  })
  list.innerHTML = friendList;
  return list
}
