const logger = require('./logger').create('auth');
const passport = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const configAuth = {
    'googleAuth' : {
        'clientID'      : '448342340754-aaqcl0pl6q7jkrri67k0k81utik6m9jn.apps.googleusercontent.com',
        'clientSecret'  : '0AjmL9sZmTfcoz8Y16iMRItc',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }
};

passport.use(new GoogleStrategy({
      clientID        : configAuth.googleAuth.clientID,
      clientSecret    : configAuth.googleAuth.clientSecret,
      callbackURL     : configAuth.googleAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, cb) {
  	logger.info(accessToken + " " + refreshToken + " " + profile);
      return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	app.get('/auth/google',
	  passport.authenticate('google', { scope: ['profile'] }));

	app.get('/auth/google/callback', 
	  passport.authenticate('google', { failureRedirect: '/login.html' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    res.redirect('/');
	    logger.info('User = ' + JSON.stringify(req.user));
	});

	app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
	});

}