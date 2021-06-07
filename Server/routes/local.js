var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const router = require('./api');
const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user);
   });

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy({passReqToCallback: true}, async function(req, username, password, done) {
    let user  = await User.createRecrod({ 
        name: username, 
        id: (+new Date()), 
        provider: 'local',
        token: password,
        designation: req.body.designation
    })
    return done(null, user);
  }
));

router.post('/auth/clogin', function(req, res, next){
    passport.authenticate('local', function (err, user, info) {
        req.login(user, function(){});
    res.send(user);
    })(req, res, next)
});

module.exports = router;
