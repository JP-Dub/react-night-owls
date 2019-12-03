'use strict'
const express     = require('express'),
      bodyParser  = require('body-parser'),
      routes      = require('./app/routes/index.js'),
	    mongoose    = require('mongoose'),
      passport    = require('passport'),      
	    session     = require('express-session'),  
      cors        = require('cors'),     
      path        = require('path'),
      helmet      = require('helmet'),
      MongoDBStore= require('connect-mongodb-session')(session);      
	    
const app = express();

require('dotenv').config();
require('./app/config/passport')(passport);

//compression = require('compression'),
//app.use(compression());
//proxy       = require('http-proxy-middleware'),

const webpackDevServer = require('./node_modules/webpack-dev-server/lib/Server'),
	    webpackConfig = require('./webpack.config'),
      webpack       = require('webpack'),
	    compiler      = webpack(webpackConfig),
      client        = process.env.PORT,
      server        = 3000;

const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  databaseName: 'mlab',
  collection  : 'NightOwl'
}, error => {
  if(error) console.log('error', error);
});
  
let options = ({
	origin: 'https://night-owls.glitch.me',
	preflightContinue: true,
  optionsSuccessStatus: 200
});


app.use(cors(options));

// require('dotenv').config();
// require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser   : true,
	useFindAndModify  : false,
  useUnifiedTopology: true 
});

// redacted
//mongoose.Promise = global.Promise;

const devServerOptions = Object.assign({}, webpackConfig.devServer);

const wpServer = new webpackDevServer(compiler, devServerOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.set('trust proxy', 1);
app.use(session({
	secret: 'NightOwlsReact',
  cookie: {
    secure  : true,
    sameSite: 'none'
  },
  store : store,
	resave: false,
	saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.listen(client, () => {
	console.log('Node.js listening on port ' + client + '...');
});

wpServer.listen(server, 'localhost', () => {
	console.log('Webpack Dev Server listening on ' +  server + '...')
});

//'127.0.0.1'

/*
app.use('/api', proxy({
  target:'localhost',
  pathRewrite : {'^api' : ''},
  logLevel: 'debug',
  port: server
}));
*/

/*
 let db = mongoose.connection;
 db.on('connected', () => { console.log('Mongoose default connection done') });
 db.on('error', (err) => { console.log('Mongoose default connection error: ' + err) });
*/

// store.on('error', error => {
//   console.log(error);
// })