const mongoose = require('mongoose');
const Chapters = require("./models/chapter.model");
mongoose.connect('mongodb+srv://moutmoutonfire:Oliverdu33.@dyma.shehxsx.mongodb.net/test?retryWrites=true',
).then( () =>{
    console.log('Connexion Ok !')
}).catch( err =>{
    console.log(err)
});