# mongo-session

  MongoDB session store for Connect  (can use replica set with mongo)


## Installation

mongo-session supports only connect `>= 1.0.3`.

via npm:

    $ npm install mongo-session

## Options
    dbobj: null,    /*Mongo Replica set or Db(object)(if ==null please set (host/port)config)*/
    host: '127.0.0.1',
    port: 27017,
    stringify: true,
    collection: 's_sessions',
    auto_reconnect: false,
    native_parser: false,
    w: 1




## Example

With express:

####ReplSet

var mongodb = require('mongodb')
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
var dbs = new Db("imchatdb", replSet, { native_parser: true, w: 1 });

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


With connect:

    var connect = require('connect');
    var MongoStore = require('mongo-session')(connect);

## Removing expired sessions

  mongo-session uses MongoDB's TTL collection feature (2.2+) to
  have mongod automatically remove expired sessions. (mongod runs this
  check every minute.)

  **Note:** By connect/express's default, session cookies are set to 
  expire when the user closes their browser (maxAge: null). In accordance
  with standard industry practices, mongo-session will set these sessions
  to expire two weeks from their last 'set'. You can override this 
  behavior by manually setting the maxAge for your cookies -- just keep in
  mind that any value less than 60 seconds is pointless, as mongod will
  only delete expired documents in a TTL collection every minute.



## Tests

   see the test.js(You need to add a requested page into it and test)

## License 



Copyright (c) 2011 gagahjt
