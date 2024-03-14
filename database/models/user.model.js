const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({
    local : {
        email : { type: String, required : true, unique : true },
        password : { type: String },
        googleId: { type: String}
    },
    username : String,
    avatar : { type: String },
});

// Hash du password
userSchema.statics.hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    } catch (e) {
        throw e
    }
}

// comparaison du password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.local.password);
};




const user = mongoose.model('users', userSchema);


module.exports = user;