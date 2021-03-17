// lib/passport.js
const passport = require('passport')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../db/models')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // bearer token
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'), // header
  secretOrKey: 'strong-secret'
}

/* Authentication Function */
const authentication = async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id);
    return done(null, user)
  } catch (err) {
    return done(null, false, {message: err.message})
  }
}

passport.use(new JwtStrategy(options, authentication));

module.exports = passport;
