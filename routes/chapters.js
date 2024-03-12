const router = require('express').Router();
const {chapterList, chapterDetails, chapterDelete, chapterCreate, addChapter, searchChapters} = require("../controllers/chapter.controller");


router.get('/', chapterList)

router.get('/add', addChapter)

router.post('/', chapterCreate)

router.get('/search', searchChapters)

router.get('/:chapterId', chapterDetails)

router.delete('/delete/:chapterId', chapterDelete)

module.exports = router;