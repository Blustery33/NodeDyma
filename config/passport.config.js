const passport = require('passport');
const { app } = require('../app')
const User = require('../database/models/user.model')
const LocalStrategy = require('passport-local').Strategy;
const { findUserByEmail, findUserByGoogleId } = require('../queries/user.queries')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const util = require('util')

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
   try{
      const user = await User.findById(id).exec()
      done(null, user)
   } catch (e) {
       done(e, null)
   }
})

passport.use('local', new LocalStrategy({ usernameField: 'email' },async (email, password, done) => {
    try{
        const user = await findUserByEmail(email);
        if(user) {
            const match = await user.comparePassword(password)
            if(match) {
                return done(null, user)
            }else{
                return done(null, false, {message: 'Invalid password'})
            }
        }else{
            return done(null, false, {message: 'User not found'})
        }
    }catch (e) {
        done(e)
    }
}));

passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
    //console.log(util.inspect(profile, { compact: true, depth: null, breakLength: 80 }));
    try{
        const user = await findUserByGoogleId(profile.id);
        if(user) {
            done(null,user)
        } else {
            console.log({profile})
            const newUser = new User({
                username: profile.displayName,
                local : {
                    googleId: profile.id,
                    email : profile.emails[0].value,
                }
            })
            const saveUser = await newUser.save();
            done(null, saveUser);
        }
    } catch (e) {
        done(e);
    }
}))

