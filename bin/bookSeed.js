const mongoose = require("mongoose");

const Book = require("../models/bookModel");

mongoose.Promise = Promise;
mongoose
.connect('mongodb://localhost/read-me-if-you-can', {useMongoClient: true})
.then(() => {
console.log('Connected to Mongo!')
}).catch(err => {
console.error('Error connecting to mongo', err)
});

const books = [
    {
        title: "The Hunger Games",
        author: "Suzanne Collins", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41ix4sKb2WL._SY450_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7150",
        cache: "5adf3fb8b992ed3ad0f9b14c"

    },
    {
        title: "Harry Potter",
        author: "J.K. Rowling", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51mYy3Z7lXL._SX342_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7150",
        cache: "5adf3fb8b992ed3ad0f9b14c"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee", 
        imageUrl: "https://images-eu.ssl-images-amazon.com/images/I/51RnEUYWx1L.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7150",
        cache: "5adf3fb8b992ed3ad0f9b14d"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51x37AFMMDL._SX312_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c714f",
        cache: "5adf3fb8b992ed3ad0f9b14d"
    },
    {
        title: "Twilight",
        author: "Stephenie Meyer", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51DUJ9xNG0L._SX307_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c714f",
        cache: "5ae05d7cd7084e4d09182d48"
    },
    {
        title: "Foundation",
        author: "Isaac Asimov", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/410ysFH-yQL._SX295_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c714f",
        cache: "5ae05d7cd7084e4d09182d48"
    },
    {
        title: "It",
        author: "Stephen King", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/4117PWF91KL._SX320_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7151",
        cache: "5adf3fb8b992ed3ad0f9b14c"
    },
    {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51p6PYMc9nL._SX302_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7151",
        cache: "5adf3fb8b992ed3ad0f9b14c"
    },
    {
        title: "Dan Simmons",
        author: "The terror", 
        imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51bxq9rsjiL._SX320_BO1,204,203,200_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "pending",
        user: "5addddc034f09517a86c7151",
        cache: "5adf3fb8b992ed3ad0f9b14c"
    }
];

Book.create(books)
.then( () => {
    console.log(`Created ${books.length} fake books`);
})
.catch( (err) => {
    console.log(`Error connecting to mongo`, err);
});

