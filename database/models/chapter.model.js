const mongoose = require('mongoose');
const schema = mongoose.Schema;


// const validator1 = {
//     validator : function (v){
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 if(v === '123'){
//                     reject(false)
//                 }else{
//                     resolve(true)
//                 }
//             }, 3000)
//         })
//     },
//     message : 'Ne doit pas etre 123'
// }

const chapterSchema = schema({
    title : {
        type : String,
        required : [true, "on doit préciser un titre"]
        //validate: validator1
        // require : [true, 'Le titre est requis'],
        // minlength : [3, 'Trop court'],
        // maxlength : [20, 'trop long'],
        //enum: ['voiture', 'moto']
    },
    difficulty: {
        type: Number,
        // min: 1,
        // max: 10
    },
    nbrOfLesson : { type : Number, required : [true, "Nombre de leçons requises"]},
    index : Number,
    active : Boolean
}, {
    timestamps : true
})

chapterSchema.pre('save', function(){
    return Chapters.countDocuments().exec().then( nbr => this.index = nbr + 1);
})

const Chapters = mongoose.model('chapters', chapterSchema)
// const newChapter = new Chapters({
//     title : 'react',
//     nbrOfLesson : '15',
//     active : true
// })
// newChapter.save()

module.exports = Chapters;