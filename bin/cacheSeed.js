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
    location: {
        type: "Point",
        coordinates: [48.8762767, 2.3318527],
      },
    clue: "The book is hidden under a green garbage", 
    user: "5addeb7f28f2bc2018fab863",
},
  {
    location: {
        type: "Point",
        coordinates: [48.853185, 2.343240899999955],
      },
    clue: "The book is hidden in a local supermarket", 
    user: "5addeb7f28f2bc2018fab862",
},
  {
    location: {
        type: "Point",
        coordinates: [48.8489901, 2.333889],
      },
    clue: "The book is hidden behind a gutter", 
    user: "5addeb7f28f2bc2018fab864",
},
  {
    location: {
        type: "Point",
        coordinates: [48.83565499999999, 2.396356400000059],
      },  
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