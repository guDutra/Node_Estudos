var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '@Gugu2018',
      database: 'apiusers'
  }
  });

module.exports = knex