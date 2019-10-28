'use strict'
const express    = require('express'),
      bodyParser = require('body-parser'),
      routes     = require('./app/routes/index.js'),
	    mongoose   = require('mongoose'),
      passport   = require('passport'),
	    session    = require('express-session'),
      cors       = require('cors'),
      proxy      = require('http-proxy-middleware'),
      path       = require('path'),
	    app        = express();
	
const webpackDevServer = require('./node_modules/webpack-dev-server/lib/Server'),
	    webpackConfig = require('./webpack.config'),
      webpack       = require('webpack'),
	    compiler      = webpack(webpackConfig);	

const MongoStore = require('connect-mongo')(session)
     
let options = ({
	origin : 'https://night-owls.glitch.me',
	preflightContinue: true,
  optionsSuccessStatus: 200
});

app.use(cors(options));

require('dotenv').config();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser   : true,
	useFindAndModify  : false,
  useUnifiedTopology: true 
});

mongoose.Promise = global.Promise;


const devServerOptions = Object.assign({}, webpackConfig.devServer, {
	stats: {
		colors: true
	},
});

const wpServer = new webpackDevServer(compiler, devServerOptions),
      client = process.env.PORT,
      server = 3000;
// app.use('/api', proxy({
//     target:'http://localhost:8080',
//     logLevel: 'debug',
//     port: 3000
//   })
// );

app.use('/api' , proxy({
  pathRewrite : {'^api' : ''},
  target: 'localhost',
  port: server,
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let config = {
	secret: 'NightOwlsReact',
	resave: false,
	saveUninitialized: true,
	cookie : {
    secure : true
  }
}

app.set('trust proxy', 1);

console.log(app.get('env'))

// if( app.get('env') === 'production') {
  
//   app.set('trust proxy', 1);
//   config.cookie.secure = true;
//   config.cookie.sameSite = true;
// }

app.use(session({
  secret: 'NightOwlsReact',
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoRemove: 'disabled'
  })
}));


console.log(config)

app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport, cors);

app.listen(client,  function () {
	console.log('Node.js listening on port ' + client + '...');
});

wpServer.listen(server, 'localhost', () => {
	console.log('Webpack Dev Server listening on ' +  server + '...')
});

//'127.0.0.1'