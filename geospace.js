db.places.insertOne({name:"gujrat",location:{type:"Point",coordinates:[.012341,12.1321]}})

db.places.find({location:{$near:{$geometry:{type:"Point",coordinates:[-123,32.00]}}}})

///create index for $near

db.places.createIndex({location:"2dsphere"})
db.places.find({location:{$near:{$geometry:{type:"Point",coordinates:[-123,32.00]},$max:500,$min:100}}})

//p1 : longitude latitude;
db.places.find({location:{$geoWithin:{$geometry:{$type:"polygon",coordinates:[[p1,p2,p3,p4,p1]]}}}})

//create index 

db.area.find({location:{$geoIntersect:{$geometry:{$type:"polygon",coordinates:[p1]}}}})

db.places.find({location:{$geoWithin:{$centerSphere:[p1,1/6278.1]}}}
)




