const db_config = require('./db_config')

const Promise = require('bluebird');
const initOptions = {
  promiseLib: Promise,
  capSQL: true
};
const pgp = require('pg-promise')(initOptions);
const db = pgp(db_config.DB_CONNECTION);

module.exports = { db, pgp }