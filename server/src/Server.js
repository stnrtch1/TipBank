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

//post method
app.post("/post", (request,response) => {
    let mongoClient;
    MongoClient.connect(URL, { useNewUrlParser: true})
        .then(client => {
            mongoClient = client;
            //get reference to database
            let db = mongoClient.db(DB_NAME);
            //get reference to collection
            let tipCollection = db.collection("tips");

            //sanitize all data before sending
            request.body.date = request.sanitize(request.body.date);
            request.body.money = request.sanitize(request.body.money);
            request.body.hours = request.sanitize(request.body.hours);

            return tipCollection.insertOne(request.body);
        })
        .then(result => {
            //set status codes
            response.status(200);
            response.send(result);
            mongoClient.close();
        })
        .catch(err => {
            console.log(`>>> ERROR : ${err}`);
            response.status(500);
            response.send({Error: `Server error with post : ${err}`});
            throw err;
        }
    );
});

//delete method
app.delete("/delete/:id", (request,response) => {
    //get the id from the request body
    let id = ObjectId(request.params.id);

    let mongoClient;
    MongoClient.connect(URL, { useNewUrlParser: true })
        .then(client => {
            mongoClient = client;
            //get reference to database... you get the point now
            let db = mongoClient.db(DB_NAME);
            let tipCollection = db.collection("tips");

            return tipCollection.deleteOne({"_id":id});
        })
        .then(result => {
            response.status(200);
            response.send(result);
            mongoClient.close();
        })
        .catch(err => {
            console.log(`>>> ERROR : ${err}`);
            response.status(406);
            response.send({Error: `Server error with delete : ${err}`});
            throw err;
        }
    );
});


app.listen(8080, () => console.log("Listening on port 8080"));