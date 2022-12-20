const { options } = require('../options/mariaDB.js');
const knex = require('knex')(options);

function getAll(){
    knex.from('productos').select()
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

function addProducto(msj){
    knex.insert(msj).into('productos')
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

function getProduct(id){
    knex.from('productos').select().where('id', id)
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

function editProduct(id, product){
    knex.from('productos').where('id', id).update(product)
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

function deleteProduct(id){
    knex.from('productos').where('id', id).del()
    .then(() => {
        console.log(`El producto con id: ${id} fue borrado exitosamente`)
    })
    .catch(err => {
        console.log(err);
        throw(err);
    })
    .finally(() => {
        knex.destroy();
    })
}

module.exports = { getAll, addProducto, getProduct, editProduct, deleteProduct };