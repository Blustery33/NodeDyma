const chapterRoutes = require('./chapters');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const uploadFileRoutes = require('./file.routes');
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const User = require('../database/models/user.model')



//router.use('/chapters', chapterRoutes)
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/upload-file', uploadFileRoutes);

router.get('/chap', (req,res) =>{
    res.redirect('/chapters')
})


router.get('/protected', ensureAuthenticated, (req,res) =>{
    res.render('protected');
})

router.get('/authenticed', (req, res) => {
    res.render('auth', {user: req.user});
})

router.get('/', async (req,res, next) => {
    try{
        const users = await User.find({}).exec()
        const user = users && users.length ? users[1] : null;
        res.render('home', {user});
    } catch(e){
        next(e)
    }


})





// router.get('/get', (req,res) => {
//     res.render('index', {
//         name: 'Guillaume',
//         namee: '<span>Jean</span>',
//         authenticated : false,
//         friends : 11,
//         products: [
//             { title: 'produit 1', content: 'content1'},
//             { title: 'produit 2', content: 'content2'},
//             { title: 'produit 3', content: 'content3'},
//         ]
//     });
// })
// router.get('/test', (req,res) => {
//     res.render('index', {
//         name: 'GuillaumeEEEEEE',
//         namee: '<span>Jean</span>',
//         authenticated : false,
//         friends : 11,
//         products: [
//             { title: 'produit 1', content: 'content1'},
//             { title: 'produit 2', content: 'content2'},
//             { title: 'produit 3', content: 'content3'},
//         ]
//     });
// })

module.exports = router;