const User = require("../database/models/user.model");


exports.createUser = async (body) => {
    try{
        const hashPassword = await User.hashPassword(body.password);
        const user = new User({
            username: body.username,
            local : {
                email : body.email,
                password : hashPassword
            }
        });
        return user.save();
    }catch (e) {
        throw e;
    }

}
exports.findUserByEmail = async (email) => {
    return User.findOne({'local.email': email}).exec()
}
exports.findUserByGoogleId = async (googleId) => {
    return User.findOne({'local.googleId': googleId}).exec()
}