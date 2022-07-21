db.sales
  .find({
    $expr: {
      $gt: [
        {
          $cond: {
            if: { gte: ["$volume", 190] },
            then: { $subtract: ["$volume", 30] },
            else: "$volume",
          },
        },
        "$target",
      ],
    },
  })
  .pretty();
db.user.updateOne(
  { _id: "ObjectId(60decb42ba739a2634894437)" },
  { $set: { "hobbies.$": { title: "Sports", frequency: 1 } } }
);
db.user.updateOne(
  { hobbies: { $elemMatch: { title: Sports, frequency: { $lt: 2 } } } },
  { $set: { "hobbies.$.frequency": 10 } }
);

db.user.find(
  { "hobbies.frequency": { $gt: 3 } },
  { $set: { "hobbies.$.goodFrequency": true } }
);

db.user.updateMany(
  { "hobbies.frequency": { $lte: 1 } },
  { $inc: { "hobbies.$[].frequency": 1 } }
);
