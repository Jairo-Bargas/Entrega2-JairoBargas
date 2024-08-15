const infoUsuario = {
    usuario: "jairo",
    contrasenia: "0000",
    ingreso: false,
};

const postVentas = {
    servicios: [
        {
            frase: "¿Qué servicio requiere?",
            opciones: [
                "A - Consulta online.",
                "B - Servicio de mantenimiento.",
                "C - Servicio por falla.",
                "D - Reparación integral.",
                "E - Capacitación",
                "F - Garantía",
            ],
            respuesta: {
                usuario: "",
                estado: "NO RESPONDIO",
            },
        },
        {
            frase: "¿Seleccione su máquina?",
            opciones: [
                "A - Tractor de jardín",
                "B - Tractores serie 5/6.",
                "C - Tractores serie 7/8/9.",
                "D - Cosechadora.",
                "E - Pulverizadora",
                "F - Sembradora",
            ],
            respuesta: {
                usuario: "",
                estado: "NO RESPONDIO",
            },
        },
        {
            frase: "¿Cuántas horas tiene su máquina?",
            opciones: [],
            respuesta: {
                usuario: "",
                estado: "NO RESPONDIO",
            },
        },
        {
            frase: "Agregue información que considere necesaria",
            opciones: [],
            respuesta: {
                usuario: "",
                estado: "NO RESPONDIO",
            },
        },
    ],
};

const recuperarEstadoUsuario = () => {
    const estado = localStorage.getItem('usuarioIngresado');
    if (estado === 'true') {
        infoUsuario.ingreso = true;
    }
};

const mostrarLogin = () => {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('post-venta-section').classList.add('hidden');
};

const mostrarPostVenta = () => {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('post-venta-section').classList.remove('hidden');
    cargarPreguntas();
};

const login = (username, password) => {
    if (infoUsuario.usuario === username && infoUsuario.contrasenia === password) {
        infoUsuario.ingreso = true;
        localStorage.setItem('usuarioIngresado', 'true');
        return true;
    } else {
        return false;
    }
};

const cargarPreguntas = () => {
    const form = document.getElementById('post-venta-form');
    form.innerHTML = ''; // Limpiar preguntas existentes

    postVentas.servicios.forEach((servicio, index) => {
        const div = document.createElement('div');
        div.classList.add('form-section');
        div.innerHTML = `
            <label>${servicio.frase}</label><br>
            ${servicio.opciones.map((opcion, i) => 
                `<input type="${servicio.opciones.length > 0 ? 'radio' : 'text'}" name="question${index}" value="${opcion[0]}" id="q${index}o${i}">
                 <label for="q${index}o${i}">${opcion}</label><br>`
            ).join('')}
            ${servicio.opciones.length === 0 ? `<input type="text" name="question${index}" id="q${index}" placeholder="Escriba su respuesta"><br>` : ''}
        `;
        form.appendChild(div);
    });
};

const validarRespuestas = () => {
    postVentas.servicios.forEach((servicio, index) => {
        const answerElement = document.querySelector(`input[name="question${index}"]:checked`) || document.querySelector(`input[name="question${index}"]`);
        const respuesta = answerElement ? answerElement.value.toUpperCase() : '';
        servicio.respuesta.usuario = respuesta;
        servicio.respuesta.estado = respuesta ? "RESPONDIDO" : "NO RESPONDIO";
        sessionStorage.setItem(`respuesta-${servicio.frase}`, respuesta);
    });
};

const iniciarPostVenta = () => {
    recuperarRespuestas();

    if (infoUsuario.ingreso) {
        mostrarPostVenta();
    } else {
        mostrarLogin();
    }
};

const app = () => {
    recuperarEstadoUsuario();
    if (infoUsuario.ingreso) {
        iniciarPostVenta();
    } else {
        mostrarLogin();
    }

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;
        if (login(username, password)) {
            mostrarPostVenta();
        } else {
            document.getElementById('login-error').classList.remove('hidden');
        }
    });

    document.getElementById('submit-responses').addEventListener('click', () => {
        validarRespuestas();
        document.getElementById('thank-you-message').classList.remove('hidden');
        sessionStorage.clear();
    });
};

app();