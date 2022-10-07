const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginRoutes = require('./routers/login-router');
const wizardsRoutes = require('./routers/wizards-router');

const mongo = config.get('db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', loginRoutes);
app.use('/wizards', wizardsRoutes);

(async function () {
    await mongoose.connect(mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
})().catch((err) => console.log(err));

module.exports = app;
