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
  
	var options = ({
		origin : 'https://intelligent-astronaut.glitch.me',
		preflightContinue: true,
		optionsSuccessStatus: 200
	})  
	
	// app.route('/*')
	// 	.get( (req, res) => {
	// 		res.sendFile(process.cwd() + '/dist/index.html');
	// 	});
	// app.route('/milo')
	// .get( (req, res) => {
	// console.log(req)
	// res.sendFile(path.join(__dirname, 'api', './public/index.html'))
	// });
  
	app.route( '/login/:user' ) // '/login/:user'
		.get(isLoggedIn, (req, res) => {
      console.log(req.user.twitter)
      //res.redirect('/user/' + req.user.twitter['location']);
			res.sendFile( process.cwd() + '/public/index.js' );
    //res.json({success: req.url, user: req.user.twitter['username']})
		});
		
	app.route( '/user/:location' )	
		.get( handleServer.userLocation );
			
	app.route( '/businesses/:search' )
		.post( cors(options), handleServer.getNightlife );
	
	app.route( '/:id/clicks' )
		.get(  handleServer.getClicks )
		.post( handleServer.addClick );		
		
	app.get( '/auth/twitter', passport.authenticate( 'twitter' ) );

	app.route( '/auth/twitter/callback' )
		.get( cors(options), passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
        (req, res) => {
          let user = req.user.twitter['username'];
       
    	    res.redirect('/login/' + user);
          //res.redirect('/')
		});	
		

};

	// let options = ({
	// 	origin : 'https://glitch-night-owls.glitch.me',
	// 	preflightContinue: true,
	// 	optionsSuccessStatus: 200
	//   })