const util = require("util");
const {getChapters,getChapter,deleteChapter,createChapter, searchChapters} = require('../queries/chapter.queries')
const createError = require('http-errors')


// exports.chapterList = (req, res) => {
//     Chapter.find({}).exec().then(chapters => res.render('index', { chapters }))
// };

exports.chapterList = async (req, res, next) => {
    try {
        const chapters = await getChapters();
        res.render('index', { chapters });
    } catch(e) {
       next(e);
    }
};

exports.chapterDetails = async function(req, res, next) {
    try{
        const chapterId = await req.params.chapterId;
        const chapter = await getChapter(chapterId);
        if (chapter) {
            res.render('chapter', { chapter });
        } else {
            throw createError(404, 'Le chapitre n\'existe pas');
        }
    }catch (e) {
        next(e);
    }
};

exports.chapterDelete = async (req, res, next) => {
    try {
        const chapterId = req.params.chapterId;
        await deleteChapter(chapterId);
        const chapters = await getChapters();
        res.render('index', { chapters });
    } catch(e) {
        next(e);
    }
};


exports.chapterCreate = async (req,res, next) =>{
    try{
        await createChapter(req.body);
        res.redirect('/')
    } catch (err) {
        // Object.keys extrait toute les key de l'objet passé en paramètre
        const errors = Object.keys(err.errors).map( key => err.errors[key].message );
        console.log(util.inspect(err, { compact: true, depth: 5, breakLength: 80, colors: true }));
        res.status(400).render('index', { errors });
    }
};

exports.addChapter = async (req, res, next) => {
    try {
        res.render('form');
    } catch(e) {
        next(e);
    }
};

exports.searchChapters = async (req, res, next) => {
    try {
        const search = req.query.str;
        const chapters = await searchChapters(search);
        console.log(search)
        res.render('partials/chapter-list', { chapters });
    } catch (e) {
        next(e)
    }
}