const env         	= process.env.NODE_ENV || 'production',//change to "production"
	config 			= require("./../config.json"),
	express 		= require('express'),
	parser 			= require('body-parser'),
	swig    		= require('swig'),
	mongoose 		= require('mongoose'),
	path 			= require('path'),
	fs 				= require('fs'),
	multer 			= require('multer'),
	middlewares 	= require('./middlewares/admin');


// //connecting to mongodb. databases name: userSignIn
// mongoose.connect((process.env.NODE_ENV == 'production')?config.mongodb.remoteUrl:config.mongodb.localUrl, function(err){
// 	if(err){
// 		console.log('error al conectar a la base de datos ' + err);
// 	}else {
// 		console.log('conectado a la base de datos');
// 		console.log('entorno: ', process.env.NODE_ENV)
// 	}
// });

// mongoose.Promise = global.Promise;



// ==============================================================

const ExpressServer = function(){

	this.server = express();
	this.server.use(parser.json()); //!!important
	this.server.use(parser.urlencoded({extended: true}));
	this.server.use(multer({dest:'./uploads/'}).single('avatar'));

	


// middlewares
    for (let middleware in middlewares){
        this.server.use(middlewares[middleware]);
   	}

// load all controller inside controller folder
	let normalizedPath = require("path").join(__dirname, "controller");

	let controller = fs.readdirSync(__dirname + '/controller')

	controller.forEach(file => {
		let fileName = /.+(?=\.\w?)/.exec(file)[0];

		let controller = {}

		controller[fileName] = require(__dirname + '/controller/' + fileName)

		let route = '/' + fileName.toLowerCase()

		this.server.use(route, controller[fileName])

	});



//engine
	this.server.engine('html', swig.renderFile);
    this.server.set('view engine', 'html');
    this.server.set('views', __dirname + './../public');
    swig.setDefaults({varControls:['[[',']]']});
//=====================================================

//limpiar cache del navegador
  	this.server.set('view cache', false);
	swig.setDefaults({cache: false, varControls:['[[',']]']});
//=========================================================
	
//socket function
	this.socket = (io) => {

		io.on('connection', (socket)	=> {
			//add here all your socket sender and reciver


		})
	};

//all the wiew without socket.io
	this.server.get('/', (req, res) => {
		res.render('index');
	})

	


};
//==========================================================

module.exports = ExpressServer;
