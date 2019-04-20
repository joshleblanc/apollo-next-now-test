const mongoose = require('mongoose');

let connectionString = 'mongodb://localhost:27017/apollo-next-now-test';
if(process.env.MONGO_URL) {
  connectionString = process.env.MONGO_URL;
}

console.log(connectionString);
mongoose.connect(connectionString, {useNewUrlParser: true});