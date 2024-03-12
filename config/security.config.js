exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }else{
        res.status(403).redirect('/auth/signin/form');
    }
}
// vérif role
exports.ensureAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles.includes('ROLE_ADMIN')) {
        return next();
    }else{
        res.status(403).redirect('/auth/signin/form');
    }
}