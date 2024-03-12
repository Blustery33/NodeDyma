const path = require('path');
const express = require('express');
const app = express();
const axios = require("axios");
const morgan = require("morgan");
require('./database/index')
const router = require('./routes')
const errorHandler = require('errorhandler')
const cookieParser = require('cookie-parser')

exports.app = app;
require('./config/session.config')
require('./config/passport.config')


app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const getCurrentUser = (req, res, next) => {
    req.user = {
        name: 'guillaume',
        authenticated: true
    }
    next();
}
const isAuthenticated = (req, res, next) => {
    if (req.user.authenticated){
        console.log('user ok')
        next()
    }else{
        res.sendStatus(403)
    }
}
//app.use('/foo', getCurrentUser, isAuthenticated)

// Exemple de base pour une image mais si plusieurs images, on ne peut pas faire une route pour chaque image //
// app.get('/public/images/findusersearch.png', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'public/images/findusersearch.png'))
// })
// END //

// middleware static pour toutes les images du dossier public
app.use(express.static(path.join(__dirname, 'public')))
// END //

// Function d'express qui permet de récup le BODY(JSON) du POST et de le transformer en un OBJET //
app.use(express.json());
// END

// Function qui permet de récup le BODY(QUERY) du POST et de le transformer en un OBJET //
app.use(express.urlencoded({ extended : true }))
// END

// Middleware npm package, pour avoir divers information de la requête "VERBE"
app.use(morgan('tiny'));
// END

// app.param('userId', (req,res,next, value, name) => {
//     console.log({
//         value,
//         name
//     })
//     next();
// })
//
// app.get('/user/:userId', (req,res) => {
//     //console.log(req.params)
//     res.end();
// })


// app.route('/user/:userId')
//     .get((req,res) => {
//         res.send('user')
//     })
//     .put((req,res) => {
//             res.send('user');
//     })
//     .delete((req,res) => {
//         res.send('user');
//     })


if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}

app.use((err, req, res, next) => {
    const env = process.env.NODE_ENV;
    if(env === 'production'){
        res.status(500).render('error', { error : {
            code: err.code || 500,
            message: err.message
            }
        });
    }
});

app.use(cookieParser())

app.use(router);

app.listen(3000);