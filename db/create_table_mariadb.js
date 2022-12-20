const { options } = require('../options/mariaDB.js');
const knex = require('knex')(options);

knex.schema.createTable('productos', table => {
    table.increments('id')
    table.string('nombre')
    table.integer('precio')
    table.string('url')
})
.then(() => console.log("table created"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
    knex.destroy();
});