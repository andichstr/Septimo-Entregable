const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto');
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    //Armar objeto producto y emitir mensaje a evento update
    const title = document.getElementById('nombre');
    const price = document.getElementById('precio');
    const thumbnail = document.getElementById('foto');
    const product = {
        'title': title.value,
        'price': price.value,
        'thumbnail': thumbnail.value
    }
    socket.emit('new-product', product);
    document.getElementById('nombre').value = "";
    document.getElementById('precio').value = "";
    document.getElementById('foto').value = "";
})

socket.on('product', products => {
    //generar el html y colocarlo en el tag productos llamando a la funcion makeHtmlTable
    const divProductos = document.getElementById('productos');
    makeHtmlTable(products).then(data => {
        divProductos.innerHTML = data;
    })
});

function makeHtmlTable(products) {
    return fetch('plantillas/tabla-productos.handlebars')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template(products);
            console.log(html);
            return html;
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    //Armar el objeto de mensaje y luego emitir mensaje al evento nuevoMensaje con sockets
    const email = document.getElementById('inputUsername');
    let d = new Date();
    d = new Date(d.getTime());
    let timestamp = (d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+"/"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"/"+d.getFullYear().toString()+" "+(d.getHours().toString()+":"+d.getMinutes().toString()+":"+d.getSeconds().toString());
    const msg = document.getElementById('inputMensaje');
    const message = {
        'email': email.value,
        'timestamp': timestamp,
        'message': msg.value
    };
    socket.emit('new-message', message);
    formPublicarMensaje.reset()
    inputMensaje.focus()
})

socket.on('message', mensajes => {
    const html = makeHtmlList(mensajes);
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    let htmlMsj = "";
    mensajes.forEach(element => {
        htmlMsj += `<div class="divMsg"><strong class="mail">${element.email}</strong>(${element.timestamp}): <em class="msg">${element.message}</em></div>`
    });
    return htmlMsj;
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length;
    const hayTexto = inputMensaje.value.length;
    inputMensaje.disabled = !hayEmail;
    btnEnviar.disabled = !hayEmail || !hayTexto;
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})