// Connect node.js to mongodb database
// we need to install mongodb package
// npm install mongodb
// then we can use it in our code using require
// whenever you're using new library , always check its documentation for usage - a good developer does that
const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
require("dotenv").config();
const url = process.env.URI;
if (!url) throw new Error("MONGODB_URL (or MONGODB_URI) not set in .env");
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("User");

  //   from documentation - https://mongodb.github.io/node-mongodb-native/7.0/
  // always get familiar with the documentation of any new library you use - that's when you will be great developer
  // always refer to official documentation for any library

  const data = {
    firstName: "Abhishek",
    lastName: "Kumar",
    city: "Mumbai",
    phoneNumber: "1234567890",
  };

  //   const insertResult = await collection.insertMany([data]);
  //   console.log("Inserted documents =>", insertResult);

  //   update the document
  const updateResult = await collection.updateOne(
    { firstName: "Abhishek" },
    { $set: { city: "Mangalore" } },
  );
  console.log("Updated documents =>", updateResult);

  // https://mongodb.github.io/node-mongodb-native/7.0/#md:find-all-documents
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

//   Output:

// $ node db.js
// [dotenv@17.2.3] injecting env (4) from .env -- tip: ⚙️  specify custom .env file path with { path: '/custom/path/.env' }
// Connected successfully to server
// Inserted documents => {
//   acknowledged: true,
//   insertedCount: 1,
//   insertedIds: { '0': new ObjectId('698352a3014275f549ebba4c') }
// }
// Found documents => [
//   {
//     _id: new ObjectId('69834bb1e626d9cc15ca7369'),
//     firstName: 'Abhishek Reddy',
//     lastName: 'Boddu',
//     city: 'Hyderabad',
//     phoneNumber: '8008389460'
//   },
//   {
//     _id: new ObjectId('698352a3014275f549ebba4c'),
//     firstName: 'Abhishek',
//     lastName: 'Kumar',
//     city: 'Mumbai',
//     phoneNumber: '1234567890'
//   }
// ]
// done.
