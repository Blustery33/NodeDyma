const router = require('express').Router();
const {sessionNew, sessionCreate, sessionDelete, googleAuth, googleAuthCb} = require('../controllers/auth.controller');


router.get('/signin/form', sessionNew);
router.post('/signin', sessionCreate);
router.get('/signout', sessionDelete);

//google
router.get('/google', googleAuth);
router.get('/google/cb', googleAuthCb)



module.exports = router;