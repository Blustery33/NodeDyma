const chapterRoutes = require('./chapters');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');


//router.use('/chapters', chapterRoutes)
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.get('/chap', (req,res) =>{
    res.redirect('/chapters')
})


router.get('/protected', ensureAuthenticated, (req,res) =>{
    res.render('protected');
})

router.get('/', (req, res) => {

    console.log(req.cookies);

    res.render('auth', {user: req.user});
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