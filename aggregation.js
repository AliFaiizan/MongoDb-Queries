db.persons.aggregate([ {$match:{gender:"female"}}]).pretty();

db.persons.aggregate([
    { $match: { gender: 'female' } },
    { $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
    {$sort:{totalPersons:1}}
]).pretty();

// db.persons.aggregate([
//     {$match:{gender:"male"}},
//     {$group:{_id:{location:"location.coordinate"},phone:{$sum:1}}},
//     {$sort:{cell:1}}
// ])

db.persons.aggregate([
    {$match:{gender:"male"}},
    {$project:{_id:0,gender:1,fullname:{$concat:["$name.first"," ","$name.last"]}}}
])

db.persons.aggregate([
    {$match:{gender:"male"}},
    {$project:{_id:0,gender:1,fullname:{$concat:[{$toUpper:"$name.first"}," ","$name.last"]}}}
])

db.persons.explain("executionStats").aggregate([
    {$match:{gender:"male"}},
    {$project:{_id:0,gender:1,fullname:{$concat:[
    {$toUpper:{$substrCP:["$name.first",0,1]}},{$substrCP:["$name.first",1,{$subtract:[{$strLenCP:"$name.first"},1]}]},
    " ",
    {$toUpper:{$substrCP:["$name.last",0,1]}},{$substrCP:["$name.last",1,{$subtract:[{$strLenCP:"$name.last"},1]}]}
]}}}
])
//explain("executionStats").
db.persons.aggregate([
    {$project:{_id:0,name:1,email:1,location:{type:"Point",coordinates:[{$convert:{input:"$location.coordinates.longitude",to:"double",onError:0,onNull:0}},{$convert:{input:"$location.coordinates.latitude",to:"double",onError:0,onNull:0}}]}}}, 
    {$project:{fullname:{$concat:[
    {$toUpper:{$substrCP:["$name.first",0,1]}},{$substrCP:["$name.first",1,{$subtract:[{$strLenCP:"$name.first"},1]}]},
    " ",
    {$toUpper:{$substrCP:["$name.last",0,1]}},{$substrCP:["$name.last",1,{$subtract:[{$strLenCP:"$name.last"},1]}]}
]},email:1,location:1}}
])


db.persons.aggregate([
    {$project:{_id:0,name:1,age:"$dob.age",dateofBirth:"$dob.date",gender:1,email:1,location:{type:"Point",coordinates:[{$convert:{input:"$location.coordinates.longitude",to:"double",onError:0,onNull:0}},{$convert:{input:"$location.coordinates.latitude",to:"double",onError:0,onNull:0}}]}}}, 
    {$project:{fullname:{$concat:[
    {$toUpper:{$substrCP:["$name.first",0,1]}},{$substrCP:["$name.first",1,{$subtract:[{$strLenCP:"$name.first"},1]}]},
    " ",
    {$toUpper:{$substrCP:["$name.last",0,1]}},{$substrCP:["$name.last",1,{$subtract:[{$strLenCP:"$name.last"},1]}]}
]},email:1,location:1,age:1,dateofBirth:1,gender:1}},
    
])

//shortcut conversion
db.persons.aggregate([
    {$project:{_id:0,name:1,age:"$dob.age",dateofBirth:{$toDate:"$dob.date"},gender:1,email:1,location:{type:"Point",coordinates:[{$convert:{input:"$location.coordinates.longitude",to:"double",onError:0,onNull:0}},{$convert:{input:"$location.coordinates.latitude",to:"double",onError:0,onNull:0}}]}}}, 
    {$project:{fullname:{$concat:[
    {$toUpper:{$substrCP:["$name.first",0,1]}},{$substrCP:["$name.first",1,{$subtract:[{$strLenCP:"$name.first"},1]}]},
    " ",
    {$toUpper:{$substrCP:["$name.last",0,1]}},{$substrCP:["$name.last",1,{$subtract:[{$strLenCP:"$name.last"},1]}]}
]},email:1,location:1,age:1,dateofBirth:1,gender:1}},
{$sort:{age:-1}}
     
]).pretty();



db.friends.aggregate([
    {$unwind:"$hobbies"},
    {$group:{_id:{age:"$age"},allhobbies:{$addToSet:"$hobbies"}}}  //$push
]).pretty()


db.friends.aggregate([
   {$project:{_id:0,examScore:{$slice:["$examScore",1]}}},  //[$examScore,2,1] start at 2 and give one element
   {$group:{_id:{age:"$age"},allhobbies:{$addtoSet:"$hobbies"}}}
]).pretty()




  db.friends.aggregate([
      {$project:{_id:0,scores:{$filter:{input:"$examScores", as: "ec",cond:{$gt:["$$ec.score",60]}}}}}
  ])


  //modified
  db.friends.aggregate([
      {$unwind:"$examScores"}, 
      {$sort:{"examScores.score":-1}},
    {$group:{_id:{name:"$name"},highestScore:{$push:{$max:"$examScores.score"}}}},
    {$project:{midScore:{$slice:["$highestScore",1,1]}}}           
  ]).pretty()
  

  db.persons
  .aggregate([
    {
      $bucket: {
        groupBy: '$dob.age',
        boundaries: [18, 30, 40, 50, 60, 120],
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' }
        }
      }
    }
  ])
  .pretty();

db.persons.aggregate([
    {
      $bucketAuto: {
        groupBy: '$dob.age',
        buckets: 5,
        output: {
          numPersons: { $sum: 1 },
          averageAge: { $avg: '$dob.age' }
        }
      }
    }
  ]).pretty();

  db.persons.aggregate([
    { $match: { gender: "male" } },
    { $project: { _id: 0, gender: 1, name: { $concat: ["$name.first", " ", "$name.last"] }, birthdate: { $toDate: "$dob.date" } } },
    { $sort: { birthdate: 1 } },
    { $skip: 10 },
    { $limit: 10 }
  ]).pretty();

  db.persons.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        email: 1,
        birthdate: { $toDate: '$dob.date' },
        age: "$dob.age",
        location: {
          type: 'Point',
          coordinates: [
            {
              $convert: {
                input: '$location.coordinates.longitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            },
            {
              $convert: {
                input: '$location.coordinates.latitude',
                to: 'double',
                onError: 0.0,
                onNull: 0.0
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        gender: 1,
        email: 1,
        location: 1,
        birthdate: 1,
        age: 1,
        fullName: {
          $concat: [
            { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
            {
              $substrCP: [
                '$name.first',
                1,
                { $subtract: [{ $strLenCP: '$name.first' }, 1] }
              ]
            },
            ' ',
            { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
            {
              $substrCP: [
                '$name.last',
                1,
                { $subtract: [{ $strLenCP: '$name.last' }, 1] }
              ]
            }
          ]
        }
      }
    },
    { $out: "transformedPersons" }
  ]).pretty();


  db.transformedPersons.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [-18.4, -42.8]
        },
        maxDistance: 1000000,
        num: 10,
        query: { age: { $gt: 30 } },
        distanceField: "distance"
      }
    }
  ]).pretty();
