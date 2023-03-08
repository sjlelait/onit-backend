// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth')

// initialize app
const app = express();

// app settings settings
require('dotenv').config();

// Firebase admin code

const { PORT, 
        DATABASE_URL, 
        GOOGLE_PRIVATE_KEY_ID, 
        GOOGLE_PRIVATE_KEY,
        GOOGLE_CLIENT_ID } = process.env;

admin.initializeApp({
    credential: admin.credential.cert({
  "type": "service_account",
    "project_id": "onit-f8dae",
    "private_key_id": GOOGLE_PRIVATE_KEY_ID,
    "private_key": GOOGLE_PRIVATE_KEY.replace(/\n/g, ''),
    "client_email": "firebase-adminsdk-n60hd@onit-f8dae.iam.gserviceaccount.com",
    "client_id": GOOGLE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-n60hd%40onit-f8dae.iam.gserviceaccount.com"
  })
  });


// database connection
mongoose.set('strictQuery', true);
mongoose.connect(DATABASE_URL);

// Mongo connection Events
mongoose.connection
.on('open', () => console.log('You are connected to MongoDB'))
.on('close', () => console.log('You are disconnected from MongoDB'))
.on('error', (error) => console.log(`MongoDB Error: ${error.message}`));


// mount middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// FB - Authorization/Authentication Middleware
app.use(async function(req, res, next) {
    // FB - capture the token
    const token = req.get('Authorization');
    if(token) {
      const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''))
       // adding a logged in user to request object(make it wait until user is authorized)
       req.user = user;
    } else{
        req.user = null;
    }
    next();
});

function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).send('you must be logged in first');
    }
    next();
 }

// mount routes
const tasksRouter = require('./controllers/tasks');
// INDUCES
    // test route -- working
app.get('/', isAuthenticated, (req, res) => {
    res.send('Welcome to onit');
});

    // router for routes
app.use('/tasks', tasksRouter);

// tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
});