/* Se simula una base de datos de clientes, que se supone se carga desde antes cuando adquieren la máquina */
class ClientesNuevos{
    constructor(id, nombre, apellido, contrasenia, duenioDe){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasenia = contrasenia;
        this.duenioDe = duenioDe;
    }
}

const baseDatos = [
    {id: "9999991", nombre: "oscar", apellido: "gimenez", contrasenia: "1111", duenioDe:"Tractor Serie 5"},
    {id: "9999992", nombre: "pedro", apellido: "pascual", contrasenia: "2222", duenioDe:"Tractor Serie 8"},
    {id: "9999993", nombre: "florencia", apellido: "rodriguez", contrasenia: "3333", duenioDe:"Tractor Serie 6"},
    {id: "9999994", nombre: "sebastian", apellido: "alarcon", contrasenia: "4444", duenioDe:"Tractor Serie 9"},
]
/* Se simula una base de datos de los productos que tiene el concesionario, esto se supone varía muy poco porque no se están lanzando nuevos productos constantemente */
class ProductosNuevos{
    constructor(serie, nombreProducto, unidadesCotizables){
        this.serie = serie;
        this.nombreProducto = nombreProducto;
        this.unidadesCotizables = unidadesCotizables;
    }
}


const productos = [
    {serie: 5, nombreProducto: "Tractor Serie 5", unidadesCotizables: 20},
    {serie: 6, nombreProducto: "Tractor Serie 6", unidadesCotizables: 30},
    {serie: 7, nombreProducto: "Tractor Serie 7", unidadesCotizables: 40},
    {serie: 8, nombreProducto: "Tractor Serie 8", unidadesCotizables: 60},
    {serie: 9, nombreProducto: "Tractor Serie 9", unidadesCotizables: 90},
]

const serviciosOfrecidos = [
    {id: 1, servicio: "Lavado de maquinaria", price: 1000},
    {id: 2, servicio: "Servicio de mantenimiento", price: 2000},
    {id: 3, servicio: "Visita a campo", price: 500},
    {id: 4, servicio: "Paquetes de monitoreo", price: 4000}
]

let carrito = JSON.parse(localStorage.getItem("carrito")) || []
const seriesOfrecidas = JSON.parse(localStorage.getItem("seriesOfrecidas")) || []


const nuevoProducto = ({serie, nombreProducto, unidadesCotizables})=>{
    const productoAgregado = new ProductosNuevos(serie, nombreProducto, unidadesCotizables)
    seriesOfrecidas.push(productoAgregado)
    localStorage.setItem(`seriesOfrecidas`, JSON.stringify(seriesOfrecidas))
}
/* FUNCIÓN PARA CREAR PRODUCTOS */ 
function renderizarProductos() {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ''; 
    const usuario = JSON.parse(localStorage.getItem(`usuario`));
    if (!usuario) return;
    const maquina = productos.find(maq => maq.nombreProducto === usuario.duenioDe)

    serviciosOfrecidos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <span>${producto.servicio} - $${producto.price * maquina.unidadesCotizables}</span>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

/* FUNCIÓN PARA AGREGAR AL CARRITO LOS SERVICIOS */

function agregarAlCarrito(id){
    const encontrarProducto = serviciosOfrecidos.find(p => p.id === id)
    if(encontrarProducto){
        const servicioEnCarrito = carrito.find(p=>p.id === id);
        if(servicioEnCarrito){
            servicioEnCarrito.quantity += 1;
        } else {
            carrito.push({...encontrarProducto, quantity: 1});
        }
        localStorage.setItem(`carrito`, JSON.stringify(carrito));
        renderizarCarrito()
    }
}

/* FUNCIÓN PARA CALCULAR EL TOTAL DEL CARRITO */
function calcularTotalCarrito() {
    const usuario = JSON.parse(localStorage.getItem(`usuario`));
    const maquina2 = productos.find(maq => maq.nombreProducto === usuario.duenioDe)
    return carrito.reduce((total, item) => {
        return total + ((item.price * maquina2.unidadesCotizables)*item.quantity);
    }, 0);
}

/* FUNCIÓN PARA RENDERIZAR EL CARRITO */

const renderizarCarrito = ()=> {
    const itemscarrito = document.getElementById('itemscarrito');
    itemscarrito.innerHTML = '';

    carrito.forEach(({servicio, id}) => {
        let itemUl = document.createElement('li');
        itemUl.innerHTML = `Servicio: ${servicio} \n <button onclick="eliminarCarrito(${id})">Borrar elección</button>`;
        itemscarrito.appendChild(itemUl);
    })          

    const total = calcularTotalCarrito();
    const totalDiv = document.getElementById('totalCarrito');
    totalDiv.innerHTML = `Total: $${total}`;
} 

function eliminarCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}


/* Función de ingreso que ejecuta las demás funciones */
function login(){
    document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (event) => {
       
        event.preventDefault();
    
     
        const userIDIngresando = document.getElementById('username').value;
        const passwordIngresando = document.getElementById('password').value;
        
   
        const usuarioEncontrado = baseDatos.find(usuario => 
            usuario.id === userIDIngresando && usuario.contrasenia === passwordIngresando
        );
      
        if (usuarioEncontrado) {
            localStorage.setItem(`usuario`, JSON.stringify(usuarioEncontrado))
            window.location.href = `pages/servicios.html`;
            
        } else {
            formulario = document.getElementById("loginForm")
            let notificacion = document.createElement(`p`)
            notificacion.textContent = `Los datos ingresados son incorrectos`
            formulario.appendChild(notificacion)
        }
    });

});

}

/* Se crea la función que determina que usuario ingresó */
function usuarioDentro(){
    window.addEventListener(`DOMContentLoaded`, ()=>{
        const usuario = JSON.parse(localStorage.getItem(`usuario`));
        if(usuario){
            const bienvenida = document.getElementById("bienvenida")

            bienvenida.textContent = `Bienvenido ${(usuario.nombre).toUpperCase()} ${(usuario.apellido).toUpperCase()}` 
        }
    })
}

const run=()=>{
    login()
    usuarioDentro()
    renderizarCarrito()
    renderizarProductos()
}


run()


