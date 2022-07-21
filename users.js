"mongo --host localhost -u user -p password --authenticationDatabase admin test"

//use admin
//db.auth('user','pwd')
db.createUser({user:"ali",pwd:"ali",roles:["userAdminAnyDatabase"]})

 //mongo -u ali -p ali --authenticationDatabase admin
 //shop alidev pass dev

 db.updateUser("appdev",{roles:["readWrite",{role:"readWrite",db:"blog"}]})

 db.updateUser("ali",{roles:["userAdminAnyDatabase",{role:"readWrite",db:"Shop"}]})









