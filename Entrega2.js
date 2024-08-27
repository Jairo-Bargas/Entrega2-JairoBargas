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

usuarioDentro()
}

/* Se crea la función que determina que tipo de usuario ingresó, es decir, que tipo de máquina posee para saber que precios se le ofrece */
function usuarioDentro(){
    window.addEventListener(`DOMContentLoaded`, ()=>{
        const usuario = JSON.parse(localStorage.getItem(`usuario`));
        if(usuario){
            const bienvenida = document.getElementById("bienvenida")

            bienvenida.textContent = `Bienvenido ${(usuario.nombre).toUpperCase()} ${(usuario.apellido).toUpperCase()}` 
        }
        const maquina = productos.find(maq => maq.nombreProducto === usuario.duenioDe)
        
        const valor1 = document.getElementById(`precio1`)
        const valor2 = document.getElementById("precio2")
        const valor3 = document.getElementById(`precio3`)
        const valor4 = document.getElementById("precio4")
        if(valor1){
            valor1.textContent = `Precio: $${(maquina.unidadesCotizables * 1000)}`
        }
        if(valor2){
            valor2.textContent = `Precio: $${(maquina.unidadesCotizables * 2000)}`
        }
        if(valor3){
            valor3.textContent = `Precio: $${(maquina.unidadesCotizables * 500)}`
        }
        if(valor4){
            valor4.textContent = `Precio: $${(maquina.unidadesCotizables * 4000)}`
        }
    })
}

login()



    


