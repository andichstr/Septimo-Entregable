const knex = require('knex');
const config = require('../src/config.js');

//------------------------------------------
// productos en MariaDb

try {
    const mariaDbClient = knex(config.mariaDB)

    mariaDbClient.schema.createTable('productos', table => {
        table.increments('id')
        table.string('nombre')
        table.integer('precio')
        table.string('url')
    })
    .then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        mariaDbClient.destroy();
    });

    console.log('tabla productos en mariaDb creada con éxito')
} catch (error) {
    console.log('error al crear tabla productos en mariaDb')
    console.log(error)
}

//------------------------------------------
// mensajes en SQLite3
try {
    const sqliteClient = knex(config.sqlite3)

    sqliteClient.schema.createTable('mensajes', table => {
        table.increments('id')
        table.string('mail')
        table.timestamp('timestamp')
        table.string('mensaje')
    })
    .then(() => console.log("table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        sqliteClient.destroy();
    });

    console.log('tabla mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log('error al crear tabla mensajes en sqlite3')
}