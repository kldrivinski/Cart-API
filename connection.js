// requires the installed pg module
// destructured, only take part of the export from pg called Pool
const { Pool } = require("pg");

try {
    // When not running via Heroku, this will load the .env file.
    require('dotenv').config();
} catch (e) {
    // When running with Heroku, dotenv doesn't need to be available.
}

const connectionString = process.env.DATABASE_URL;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    ssl: !connectionString.includes('localhost')
});

module.exports = pool;