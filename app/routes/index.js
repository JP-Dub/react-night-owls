'use strict';

const Server = require(process.cwd() + '/app/controllers/server.js'),
      path   = require('path'); //process.cwd();

module.exports = (app, passport, cors) => {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/');
		}
	}
	
	let handleServer = new Server();
  
  app.get('/demo', (req, res) => {
    res.redirect('/rsvp/demo');
  });
 
	app.route( '/user/:location' )	
		.get( handleServer.userLocation );
			
	app.route( '/businesses/:search' )
		.post( handleServer.getNightlife );
	
	app.route( '/rsvp/clicks' )
		.get(  handleServer.getClicks )
		.post( isLoggedIn, handleServer.addClick );	
  
  app.route('/resetRSVP')
    .put( handleServer.resetRSVP );  
		
	app.get('/auth/twitter', passport.authenticate( 'twitter' ) );

	app.route('/auth/twitter/callback' )
		.get( passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
        (req, res) => {
    	    res.redirect('/login/' + req.user.twitter['username']);
		});	
		

};