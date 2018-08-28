const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'locale',
  port: 5432,
});

client.connect();

module.exports = client;
