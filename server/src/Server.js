let express = require("express");
let cors = require('cors');
let MongoClient = require("mongodb").MongoClient;

//include the bodyParser middleware
let bodyParser = require("body-parser");
//include the express-sanitizer middleware
let sanitizer = require("express-sanitizer");
//include the ObjectId function, this is used to target IDs in object data
let ObjectId = require("mongodb").ObjectId;

//database URL and Name
const URL = "mongodb://localhost:27017/";
const DB_NAME = "dbTips";

// construct application object via express
let app = express();
// add cors as middleware
app.use(cors());
//adding bodyParser to use json data
app.use(bodyParser.json());
//adding sanitizer middleware 
app.use(sanitizer());

//get method
app.get("/get", (request, response) => {
    let mongoClient;
    //connect to the mongo database
    MongoClient.connect(URL, { useNewUrlParser: true })
        .then(client => {
            mongoClient = client;
            //get reference to database via name
            let db = mongoClient.db(DB_NAME);
            //get reference to collection in DB
            let tipCollection = db.collection("tips");

            //get all documents of collection
            let cursor = tipCollection.find();

            //convert cursor to array to return as response
            return cursor.toArray();
        })
        .then(tipArray => {
            //close database connection
            mongoClient.close();
            let json = {
                "days":tipArray
            };
            //send response and json string
            response.status(200);
            response.send(json);
        })
        .catch(err => {
            console.log(`>>> ERROR : ${err}`);
            response.status(500);
            response.send({Error: `Server error with get : ${err}`});
            throw err;
        }
    );
});