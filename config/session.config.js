const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { app } = require('../app')

app.use(session({
    secret: 'cersei',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 123456789
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://moutmoutonfire:Oliverdu33.@dyma.shehxsx.mongodb.net/test?retryWrites=true',
        ttl : 60 * 60 * 24 * 7
    })
}))