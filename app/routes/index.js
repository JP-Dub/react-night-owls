'use strict';

const Server = require(process.cwd() + '/app/controllers/server.js'),
      path = require('path'); //process.cwd();

module.exports = (app, passport, cors) => {
	
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next()
		} else {
			res.redirect('/auth/twitter')
		}
	}
	
	let handleServer = new Server();
  
	let options = ({
		origin : 'https://glitch-night-owls.glitch.me',
		preflightContinue: true,
		optionsSuccessStatus: 200
	})  
  
	app.route( '/login/:user' ) 
		.get(isLoggedIn, (req, res) => {
	   console.log(req.user.twitter)
		 //res.sendFile( process.cwd() + './public/index.html' );
	   res.sendFile(path.join(__dirname, 'dist', './public/index.html'))
		});
		
	app.route( '/user/:location' )	
		.get( handleServer.userLocation );
			
	app.route( '/businesses/:search' )
		.post( cors(options), handleServer.getNightlife );
	
	app.route( '/clicks' )
		.get(  handleServer.getClicks )
		.post( handleServer.addClick );		
		
	app.get('/auth/twitter', passport.authenticate( 'twitter' ) );

	app.route('/twitter/callback' )
		.get( passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
        (req, res) => {
        let user = req.user.twitter['username'];
    console.log('post twitter call', user)
    	  res.redirect('/auth/login/' + user);
		});	
		

};

	// let options = ({
	// 	origin : 'https://glitch-night-owls.glitch.me',
	// 	preflightContinue: true,
	// 	optionsSuccessStatus: 200
	//   })