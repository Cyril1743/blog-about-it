const localStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport, getUserByEmail, getUserById) {
    const authUser = async (username, password, done) => {
        const user = getUserByEmail(username)
        if (user == undefined) {
            return done(null, false, { message: 'No user with that username' })
        }
        try{
           if(await bcrypt.compare(password, user.password)){
            return done(null, user)
           } else {
            return done(null, false, { message: 'Password incorrect'})
           }
        } catch {
            done(e)
        }
    }
    passport.use(new localStrat({}, authUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}
module.exports = init