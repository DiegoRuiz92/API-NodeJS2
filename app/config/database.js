const knex = require('knex');

module.exports = knex({
    client: 'pg',
    connection: 'postgres://postgres:15915193@localhost:5432/mibanco', //cadena de conexión
    pool: {min: 1, max: 2},
    acquireConnectionTimeout: 5000, 
});

