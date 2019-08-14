'use strict';

const Server = require(process.cwd() + '/app/controllers/server.js'),
      path = require('path'); //process.cwd();

module.exports = (app, passport, cors) => {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
      console.log('is auth')
			return next()
		} else {
      console.log('is going home')
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
		
	app.get('/auth/twitter', passport.authenticate( 'twitter' ) );

	app.route('/auth/twitter/callback' )
		.get( passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
        (req, res) => {
    	    res.redirect('/login/' + req.user.twitter['username']);
		});	
		

};

	// let options = ({
	// 	origin : 'https://glitch-night-owls.glitch.me',
	// 	preflightContinue: true,
	// 	optionsSuccessStatus: 200
	//   })