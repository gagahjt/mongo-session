var express = require('express')
  , path = require('path')
 , MongoStore = require('mongo-session')(express);

//--------------------------------------------------------------
var mongodb = require('mongodb')   //you must require  mongodb
  , Db = mongodb.Db
  , Server = mongodb.Server
  , ReplSet = mongodb.ReplSet;
var replSet = ReplSet(
	[
	new Server("1270.0.0.1", 27017, { auto_reconnect: true }),   // Primary
	new Server("1270.0.0.1", 27027, { auto_reconnect: true }),   // Secondary
	new Server("1270.0.0.1", 27037, { auto_reconnect: true })    // Secondary
	],
	{ rs_name: "imchat", read_secondary: true }
	);
var dbs = new Db("imchat", replSet, { native_parser: true, w: 1 });

var storeMongo = new MongoStore({
    dbobj: dbs,  /*Mongo Replica set or Db(object)*/
    //db: settings.db,
    //host: settings.dbhost,
    //port: settings.dbport,
    collection: "s_session",
    native_parser: true

}, function () {
    console.log('connect mongodb success...');
}, null);

//--------------------------------------------------------------

var app = express();
app.configure(function () {
    // all environments
    app.set('port', process.env.PORT || 8000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    //----------------------
    app.use(express.session({
        secret: "imchat_cookie_secret",
        cookie: {
            maxAge: 60000 * 20	//20 minutes
        },
        store: storeMongo
    }));
    //-----------------------
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

//*******************************************************//
//You need to add a requested page into it and test
/*
var routes = require('./routes');
app.get('/test', function (req, res) {
  // session save ..
}
*/

//******************************************************//