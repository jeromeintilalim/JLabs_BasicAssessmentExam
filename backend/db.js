const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.DB_USER || 'lim',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'jlabs_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
});

module.exports = pool;