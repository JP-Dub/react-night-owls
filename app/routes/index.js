'use strict';

const Server = require(process.cwd() + '/app/controllers/server.js'),
      path = require('path'); //process.cwd();

module.exports = (app, passport, cors) => {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/api/auth/twitter')
		}
	}
	
	let handleServer = new Server();
 
  
	// app.route( '/login/:user' ) 
	// 	.get(isLoggedIn, (req, res) => {
	//    console.log(req.user.twitter)
	// 	 res.sendFile( process.cwd() + './public/index.html' );
	//    //res.sendFile(path.join(__dirname, 'dist', './public/index.html'))
	// 	});
		
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