const { Pool } = require('pg');
const PG_URI =
  'postgres://firdltge:JRwH4uYBufJZ5r1JaVGladVp8Mio1uyP@jelani.db.elephantsql.com/firdltge';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
