const util = require('util')
const User = require('../database/models/user.model')
const multer = require('multer');
const path = require("path");
const upload = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        },
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', 'upload'))
        }
    }),
    limits: {
        fileSize: 150896100,
    },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

// Définir la fonction middleware pour télécharger un seul fichier
exports.uploadFile = async (req, res, next) => {
    try {
        // Envelopper la fonction de téléchargement de fichier dans une promesse
        const uploadSingle = util.promisify(upload.single('avatar'));
        await uploadSingle(req, res);

        // Afficher les informations sur le fichier téléchargé
        console.log(util.inspect(req.body, {compact: false, depth: 5, breakLength: 80, color: true}));
        console.log(util.inspect(req.file, {compact: false, depth: 5, breakLength: 80, color: true}));
        const userId = req.user._id; // Supposons que vous stockiez l'ID de l'utilisateur dans req.user._id après l'authentification
        await User.findByIdAndUpdate(userId, { avatar: req.file.filename });
        // Envoyer une réponse
        res.redirect('/')
    } catch (err) {
        // Gérer les erreurs de téléchargement de fichier
        next(err);
    }
};
