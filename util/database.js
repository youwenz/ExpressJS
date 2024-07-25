// const { Pool } = require('pg');

// //set up a connect to run queries and tear it down afterwards, inefficient
// //create a connection pool

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'nodeJS',
//     password: 'kyw16313'
// });

// // Handling errors from the pool
// pool.on('error', (err, client) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
//   });

// module.exports = pool;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb', 'postgres', 'kyw16313', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
});

module.exports = sequelize;