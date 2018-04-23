const mongoose = require("mongoose");

const Cache = require("../models/cacheModel");

mongoose.Promise = Promise;
mongoose
.connect('mongodb://localhost/read-me-if-you-can', {useMongoClient: true})
.then(() => {
console.log('Connected to Mongo!')
}).catch(err => {
console.error('Error connecting to mongo', err)
});


const cache = [
  {
      coordinates: [0, 0],
      clue: "The book is hidden under a green garbage", 
      user: "5addeb7f28f2bc2018fab863",
},
  {
      coordinates: [0, 0],
      clue: "The book is hidden in a local supermarket", 
      user: "5addeb7f28f2bc2018fab862",
},
  {
      coordinates: [0, 0],
      clue: "The book is hidden behind a gutter", 
      user: "5addeb7f28f2bc2018fab864",
},
  {
      coordinates: [0, 0],
      clue: "The book is hidden under a bench in a park", 
      user: "5addeb7f28f2bc2018fab865",
 }
];


Cache.create(cache)
.then( () => {
    console.log(`Created ${cache.length} fake books`);
})
.catch( (err) => {
    console.log(`Error connecting to mongo`, err);
});