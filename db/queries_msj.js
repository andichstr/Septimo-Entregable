const { options } = require('../options/sqlite3.js');
const knex = require('knex')(options);

function getAll(){
    knex.from('mensajes').select()
    .then((rows) => {
        return rows;
    })
    .catch(err => {
        console.log(err);
        throw(err);
    })
    .finally(() => {
        knex.destroy();
    })
}

function addMessage(msj){
    knex.insert(msj).into('mensajes')
    .then((rows) => {
        return rows;
    })
    .catch(err => {
        console.log(err);
        throw(err);
    })
    .finally(() => {
        knex.destroy();
    })
}

module.exports = { getAll, addMessage };