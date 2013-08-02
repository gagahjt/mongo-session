
module.exports = process.env.CONNECT_MONGO_COV
  ? require('./lib-cov/mongo-session')
  : require('./lib/mongo-session');