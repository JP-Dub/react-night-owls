'use strict'
const compression = require('compression'),
      express     = require('express'),
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
//proxy       = require('http-proxy-middleware'),
console.log(process.env)
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
  
app.use(cors({
	origin: 'https://night-owls.glitch.me',
	preflightContinue: true,
  optionsSuccessStatus: 200
}));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser   : true,
	useFindAndModify  : false,
  useUnifiedTopology: true 
});

const devServerOptions = Object.assign({}, webpackConfig.devServer);

const wpServer = new webpackDevServer(compiler, devServerOptions);

app.use(compression());
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

// redacted
//mongoose.Promise = global.Promise;

// require('dotenv').config();
// require('./app/config/passport')(passport);

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

/*
let options = ({
	origin: 'https://night-owls.glitch.me',
	preflightContinue: true,
  optionsSuccessStatus: 200
});
*/

// store.on('error', error => {
//   console.log(error);
// })