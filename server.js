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
     
//app.options('/api', cors());  
app.use(cors());

require('dotenv').config();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser : true,
	useFindAndModify: false
});

mongoose.Promise = global.Promise;

const devServerOptions = Object.assign({}, webpackConfig.devServer, {
	stats: {
		colors: true
	},
});

const server = new webpackDevServer(compiler, devServerOptions);

app.use('/api', proxy({
  target : 'localhost',
  port: 3000
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('trust proxy', 1);
app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true,
	cookie : {
	    secure: true
		}
}));

app.use(express.static(path.join(__dirname, 'login')))

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport, cors);


const port       = process.env.PORT,
      serverPort = 3000;

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});



server.listen(serverPort, '127.0.0.1', () => {
	console.log('Webpack Dev Server listening on ' +  serverPort + '...')
});

// app.use(
// 	require("webpack-dev-middleware")(
//     compiler, {
//       noInfo    : true,
//       publicPath: webpackConfig.output.publicPath	
//     }
// 	)
// );

//app.use(require("webpack-hot-middleware")(compiler));

//app.use('/', express.static(process.cwd() + '/app/dist'));
//app.use(express.static(path.join(__dirname, 'api') ));