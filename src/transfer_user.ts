export  let  transform_user_friend =  (user)=>{
  user.friends = user.friends.map(user=>{
    return {...user,...{notify:0}}
  })

  user.notifies.forEach(notify => {
    let notifyU =  user.friends.find( u => {
      return  u.id == notify.fromId
    })
    if(notifyU) {
      console.log(notifyU);
      console.log('hyc! handsome man');
      notifyU.notify = notify.nums
    }
  })

  return user
}
