const router = require('express').Router();
const { uploadFile } = require('../controllers/file.controller');

// upload.single, array, fields
router.post('/file', uploadFile, (req, res) => {
    res.status(200).json({ message: 'Le fichier a été téléchargé avec succès.', file: req.file });
});

module.exports = router;