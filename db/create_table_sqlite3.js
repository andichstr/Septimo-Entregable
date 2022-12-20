const { options } = require('../options/sqlite3.js');
const knex = require('knex')(options);

knex.schema.createTable('mensajes', table => {
    table.increments('id')
    table.string('mail')
    table.timestamp('timestamp')
    table.string('mensaje')
})
.then(() => console.log("table created"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy();
});