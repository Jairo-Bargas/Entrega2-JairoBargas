/* Se simula una base de datos de clientes, que se supone se carga desde antes cuando adquieren la máquina */

const baseDatos = [
    {id: 9999991, nombre: "oscar", apellido: "gimenez", contrasenia: "1111", dueñoDe:"Tractor Serie 5"},
    {id: 9999992, nombre: "pedro", apellido: "pascual", contrasenia: "2222", dueñoDe:"Tractor Serie 8"},
    {id: 9999993, nombre: "florencia", apellido: "rodriguez", contrasenia: "3333", dueñoDe:"Tractor Serie 6"},
    {id: 9999994, nombre: "sebastian", apellido: "alarcon", contrasenia: "4444", dueñoDe:"Tractor Serie 9"},
]

const productos = [
    {serie: 5, nombreProducto: "Tractor Serie 5", unidadesCotizables: 20},
    {serie: 6, nombreProducto: "Tractor Serie 6", unidadesCotizables: 30},
    {serie: 7, nombreProducto: "Tractor Serie 7", unidadesCotizables: 40},
    {serie: 8, nombreProducto: "Tractor Serie 8", unidadesCotizables: 60},
    {serie: 9, nombreProducto: "Tractor Serie 9", unidadesCotizables: 90},
]

function login() {
    alert("Bienvenido al servicio Post Venta de John Deere.")
    let intentosLogin = 0;
    const maximosIntentos = 4;
    let permitirIngreso = false;
    while(intentosLogin < maximosIntentos && !permitirIngreso){
        const usuarioIngresando = document.getElementById("loginForm")


    }
}

const queDatoEs = document.getElementById("loginForm")
console.log(queDatoEs)
/*
        const usuarioIngresando = prompt("Por favor ingrese su usuario (DNI): ")
        const usuarioContraseña = prompt("Por favor ingrese su contraseña: ")

        const quienIngresa = baseDatos.find(cliente => cliente.id === parseInt(usuarioIngresando))
        if(quienIngresa && quienIngresa.contrasenia === usuarioContraseña){
            permitirIngreso = true
            alert(`Hola ${quienIngresa.nombre.toUpperCase()} ${quienIngresa.apellido.toUpperCase()}. Es un gusto poder atenderte.`)
        } else {
            intentosLogin += 1;
            if(intentosLogin < maximosIntentos){
                alert("Los datos ingresados no son correctos, por favor intente nuevamente")
            }
        }
        if(intentosLogin >= maximosIntentos){
            alert("Usted ha exedido el número de intentos, por favor vuelva a intentarlo en cinco minutos")
        }
    }
}
 */