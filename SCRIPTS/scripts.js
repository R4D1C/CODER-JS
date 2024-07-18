/*

Uso la fórmula de amortización para el calculo del calculo del pago mensual que es:

M = ( p * r (1 + r)^n ) / ( (1 + r) ^ n - 1 )

donde M es el pago mensual
p es el monto del prestamo
r es la taza de interes mensual
n es el numero total de pagos

*/
// No se si sea incorrecto poner la Ñ, así que por las dudas la cambio por una N

    // Defino "clientes" pre-hechos
    const DB = [
        {
            nombre: "Gutierrez Victor",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Martinez Juan",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Sanchez Carlos",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Perez Gerardo",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Lopez Maria",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Gonzalez Luis",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Diaz Ana",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Fernandez Jorge",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Garcia Lucia",
            monto: 0,
            interes: 0,
            anos: 0
        },
        {
            nombre: "Ramirez Pedro",
            monto: 0,
            interes: 0,
            anos: 0
        }
    ];

    const historial = document.getElementById('historialResultados');

    // Defino funcion para generar valores aleatorios de los clientes
    const aleatorizarValores = () => {
        DB.forEach(cliente => {
            cliente.monto = Math.floor((Math.random() * 900000) + 40000);
            cliente.interes = Math.floor((Math.random() * 12) + 1);
            cliente.anos = Math.floor((Math.random() * 5) + 1);
        })
    };
    aleatorizarValores();
    
    const pagoResultado = document.getElementById('pagoMensual');

    const calculadoraUnica = () => { // Esta funcion usa los datos de los inputs del formulario
        const montoBasico = document.getElementById('monto').value;
        const monto = parseInt(montoBasico);
        const interesBasico = document.getElementById('interes').value;
        const interes = parseFloat(interesBasico);
        const anosBasico = document.getElementById('anos').value;
        const anos = parseInt(anosBasico);

        if (monto >= 40000 && interes > 0 && anos > 0) {
            const intereses = interes / 100 / 12; // Convertir interés anual a interés mensual
            const pagos = anos * 12; // Número total de pagos mensuales
            const x = Math.pow(1 + intereses, pagos);
            const pagoMensual = (monto * x * intereses) / (x - 1); // Fórmula del pago mensual

            historial.innerHTML = `
            <div class="entradaHistorial">
                <div class="divisor"></div>
                <p>Tu pago mensual es de: $<span class="resultado">${pagoMensual.toFixed(2)}</span></p>
                <div class="divisor"></div>
            </div>
            `;
        } else if (monto < 40000) {
            Swal.fire({
                title: 'Hubo un error',
                text: 'El monto no puede ser menor a $40000',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            montoBasico = "";
            interesBasico = "";
            anosBasico = "";
        } else if (anos < 1) {
            Swal.fire({
                title: 'Hubo un error',
                text: 'Al menos debes tener un plazo de 1 año',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            montoBasico = "";
            interesBasico = "";
            anosBasico = "";
        };
    };
    
/* ----------------------------------------------------DIVIDO AMBAS FUNCIONES---------------------------------------------------------------- */

    const historialArray = [];

    const buscarApellido = (nombre) => {
        const inputApellido = document.getElementById('persona');
        // Filtrar en la base de datos por el usuario indicado
        const resultado = DB.filter(cliente => cliente.nombre.toLowerCase().includes(nombre.toLowerCase()));
        console.log(resultado)
        // Mostrar solo el primer cliente encontrado
        if (resultado.length > 0) {
            const cliente = resultado[0];
            historialArray.unshift(cliente);
            const clientesObjetos = historialArray.map(cliente => cliente);
            localStorage.setItem('historial', JSON.stringify(clientesObjetos));
            const historialJSON = localStorage.getItem('historial');
            const historialLocal = JSON.parse(historialJSON);
            const historialLocalCorregido = historialLocal.reverse();
            historial.innerHTML = '';
            historialLocalCorregido.forEach((persona) => {
                historial.insertAdjacentHTML('afterbegin', `
                <div class="entradaHistorial">
                    <div class="divisor"></div>
                    <p>El cliente <span>${persona.nombre}</span></p>
                    <p>Calculó un monto de: <span>${persona.monto}</span></p>
                    <p>Con un interés del: <span>${persona.interes}</span>%</p>
                    <p>En un plazo de: <span>${persona.anos}</span> años</p>
                    <p>Paga: <span class="resultado">${Calculadora(cliente)}</span> Mensualmente</p>
                </div>
                `);
            });
            Swal.fire({
                title: 'Éxito',
                text: 'Tu consulta se ha añadido al historial',
                icon: 'success',
                confirmButtonText: 'Realizar otra consulta'
            });
            inputApellido.value = '';
        } else if (resultado.length <= 0) {
            Swal.fire({
                title: 'Hubo un error',
                text: 'No se encontró ningún cliente con ese apellido',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            inputApellido.value = '';
        }
    };

    // Función para calcular el pago mensual y mostrarlo
    const Calculadora = (cliente) => {
        let nombre = cliente.nombre;
        let monto = parseInt(cliente.monto);
        let interes = parseFloat(cliente.interes);
        let anos = parseInt(cliente.anos);
    
        if (monto > 0 && interes > 0 && anos > 0) {
            const intereses = interes / 100 / 12; // Convertir interés anual a interés mensual
            const pagos = anos * 12; // Número total de pagos mensuales
            const x = Math.pow(1 + intereses, pagos);
            const pagoMensual = (monto * x * intereses) / (x - 1); // Fórmula del pago mensual

            return pagoMensual.toFixed(2)
        } else {
            pagoResultado.innerText = `Por favor ingrese valores válidos`;
        }
    };

    let intervaloa;
    let intervalob;

    const mostrarClientes = (arr = DB) => {
        const clientesContenedor = document.getElementById('clientes');
        clientesContenedor.innerHTML = 
        `
        <tr>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Interes</th>
            <th>Años</th>
        </tr>
        `;

        clientesContenedor.innerHTML += arr.map(({nombre, monto, interes, anos}) => 
            `
            <tr>
                <td>${nombre}</td>
                <td>${monto}</td>
                <td>${interes}%</td>
                <td>${anos}</td>
            </tr>
            `
        ).join('');

        if (intervaloa) clearInterval(intervaloa);
        if (intervalob) clearInterval(intervalob);

        intervaloa = setInterval(aleatorizarValores, 5000);
        intervalob = setInterval(() => mostrarClientes(DB), 5000);
    };

    document.getElementById('ver-clientes').addEventListener('click', () => mostrarClientes());

    document.getElementById('buscar').addEventListener('click', () => {
        const nombreIngresado = document.getElementById('persona').value;
        buscarApellido(nombreIngresado);
    });

    document.getElementById('ocultar').addEventListener('click', () => {
        document.getElementById('clientes').innerHTML = ``;
        clearInterval(intervaloa);
        clearInterval(intervalob);
    });

/* ----------------------------------------------------INICIA EL LLAMADO A LA API---------------------------------------------------------------- */

let arrayUsuarios = [];

const fetchPromises = [
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            nombre: 'Perez Gerardo',
            mensaje: 'Una aplicación simple y sin vueltas.',
            userId: 2,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json()).then((json) => arrayUsuarios.unshift(json)),

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            nombre: 'Garcia Lucia',
            mensaje: 'Me encanta la funcionalidad sencilla y simple.',
            userId: 3,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json()).then((json) => arrayUsuarios.unshift(json)),

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            nombre: 'Ramirez Pedro',
            mensaje: 'No tiene un diseño muy visual pero funciona.',
            userId: 4,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json()).then((json) => arrayUsuarios.unshift(json))
];

Promise.all(fetchPromises).then(() => {
    console.log(arrayUsuarios);

    const comentariosContenedor = document.getElementById('comentarios');
    
    arrayUsuarios.forEach((item) => {
        const { nombre, mensaje } = item;
        comentariosContenedor.innerHTML += `
            <div class="comentario">
                <p><span>${nombre}</span> dijo:</p>
                <p>${mensaje}</p>
            </div>
        `;
    });
});