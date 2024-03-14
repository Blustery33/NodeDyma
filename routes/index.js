const chapterRoutes = require('./chapters');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const multer = require('multer');
const path = require("path");
const upload = multer({ dest: path.join(__dirname, '..', 'upload') });
const util = require('util')


//router.use('/chapters', chapterRoutes)
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.get('/chap', (req,res) =>{
    res.redirect('/chapters')
})


router.get('/protected', ensureAuthenticated, (req,res) =>{
    res.render('protected');
})

router.get('/authenticed', (req, res) => {
    res.render('auth', {user: req.user});
})

router.get('/', (req,res) => {
    res.render('home');
})

router.post('/file', upload.array('avatar', 2), (req,res) => {
    console.log(util.inspect(req.body, { compact: false, depth: 5, breakLength: 80, color: true}))
    console.log(util.inspect(req.files, { compact: false, depth: 5, breakLength: 80, color: true}))
    res.end();
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