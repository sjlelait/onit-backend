// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// connect Task Model
const Task = require('./models/task');
// connect Tasks Controller
const tasksRouter = require('./controllers/tasks');
// initialize app
const app = express();

// app settings settings
require('dotenv').config();

const { PORT, DATABASE_URL } = process.env;

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

// mount routes
// router for routes
app.use(tasksRouter);

// INDUCES
    // test route -- working
app.get('/', (req, res) => {
    res.send('Welcome to onit');
});


// tell app to listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`)
});