const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: IO } = require('socket.io');

const ContenedorSQL = require('../contenedores/contenedorSQL');
const config = require('./config');

const { engine } = require("express-handlebars");

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new IO(httpServer);

app.engine('handlebars', engine());
app.set('views', '../public/plantillas');
app.set('view engine', 'handlebars');

const productosApi = new ContenedorSQL(config.mariaDB, 'productos');
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes');

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    //productos
    socket.emit('product', productosApi.getAll());

    socket.on('new-product', data => {
        products.addProducto(data);
        io.sockets.emit('product', productosApi.getAll());
    })

    //mensajes
    const msg = mensajesApi.getAll();
    socket.emit('message', msg);
    

    socket.on('new-message', data => {
        messages.addMessage(data);
        io.sockets.emit('message', mensajesApi.getAll())
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

//--------------------------------------------
// inicio el servidor

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));