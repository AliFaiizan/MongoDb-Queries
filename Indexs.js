db.explain().find({"dob.age":{$gt:60}}) //explain works for all find update and delete
db.explain("executionStats").find({"dob.age":{$gt:60}})

db.creatIndex({"dob.age":1})//1 for assending -1 for decending
db.contact.dropIndex({"dob.age":1});

db.contacts.createIndex({gender:1}) // text index
db.contacts.createIndex({"dob.age":1,gender:1})

db.contacts.explain().find({"dob.age":35}).sort({gender:1}) //it will use index form compound for sorting

db.contacts.createIndex({email:1},{unique:true})

db.creatIndex({"dob.age":1},{partialFilterExpression:{gender:"male"}})
db.contacts.find({"dob.age":{$gt:60},gender:"male"}) // we need to specify partial index in order to use it otherwise mongo will return default collection scan

db.user.createIndex({email:1},{unique:1})
db.users.insertMany([{name:"ali",email:"test@test.com"},{name:"faizan"}])


db.user.createIndex({email:1},{unique:1,partialFilterExpression:{email:{$exists:true}}})
 

db.session.insertOne({data:"123dfasdfgasdg",createdAt:new Date()})
db.session.createIndex({createdAt:1},{expireAfterSeconds:10}) //delete the collecton after 10 second (TTL)


//explain()
//** queryPlanner -> show summary for executed query + winning plan
//  executionStats -> Show Detailed Summary for executed Query+ wining plan + possible rejected plan

// allPlanExecution -> allPlanExecution Show detailed Summary for Executed Query+ Wining Plan+Wining Plan Secision Process

db.contacts.inserOne({name:"ali",hobbies:["cooking","sports"],addresses:[{street:"Ameer hamza"},{street:"jalalpur"}]})
db.contacts.createIndex({hobbies:1}) // it will be multikey (bigger)
db.contacts.creatIndex({addresses:1})
db.contacts.explain("executionStats").find({"addresses.street":"jalalpur"})

//Text Index

db.products.insertMany([{title:"Book",description:"Awesom Book"},{title:"Shirt",description:"it is a red shrit"}])

db.products.find({$text:{$search:"Shirt"}})

db.products.find({$text:{$search:"\"Shirt\""}}) //search for specific phrase

db.products.find({$text:{$search:"\"Shirt\""}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}})

db.products.createIndex({title:"text",description:"text"}) //combined text index

db.products.find({$text:{$search:"Shop - cooking"}})//exclude

db.products.createIndex({title:"text",description:"text"},{default_language:"english",weights:{title:1,description:10}})

db.products.createIndex({title:"text",description:"text"},{background:true})



