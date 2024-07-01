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
            monto: 230000,
            interes: 6,
            anos: 4
        },
        {
            nombre: "Martinez Juan",
            monto: 1300000,
            interes: 3,
            anos: 6
        },
        {
            nombre: "Sanchez Carlos",
            monto: 400000,
            interes: 12,
            anos: 2
        },
        {
            nombre: "Perez Gerardo",
            monto: 600000,
            interes: 7,
            anos: 4
        },
        {
            nombre: "Lopez Maria",
            monto: 500000,
            interes: 5,
            anos: 3
        },
        {
            nombre: "Gonzalez Luis",
            monto: 800000,
            interes: 4,
            anos: 5
        },
        {
            nombre: "Diaz Ana",
            monto: 200000,
            interes: 9,
            anos: 1
        },
        {
            nombre: "Fernandez Jorge",
            monto: 900000,
            interes: 6,
            anos: 7
        },
        {
            nombre: "Garcia Lucia",
            monto: 750000,
            interes: 8,
            anos: 6
        },
        {
            nombre: "Ramirez Pedro",
            monto: 1000000,
            interes: 10,
            anos: 4
        }
    ];

    localStorage.setItem('DB', JSON.stringify(DB));

    console.log('Datos guardados en localStorage');
    
    const pagoResultado = document.getElementById('pagoMensual');

    const calculadoraUnica = () => { // Esta funcion usa los datos de los inputs del formulario
        const monto = parseInt(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const anos = parseInt(document.getElementById('anos').value);

        if (monto > 0 && interes > 0 && anos > 0) {
            const intereses = interes / 100 / 12; // Convertir interés anual a interés mensual
            const pagos = anos * 12; // Número total de pagos mensuales
            const x = Math.pow(1 + intereses, pagos);
            const pagoMensual = (monto * x * intereses) / (x - 1); // Fórmula del pago mensual

            pagoResultado.innerText = `El pago mensual es de: ${pagoMensual.toFixed(2)}`;
        } else {
            pagoResultado.innerText = `Por favor ingrese valores válidos`;
        }
    };
/* ----------------------------------------------------DIVIDO AMBAS FUNCIONES---------------------------------------------------------------- */
    
    const dbRecuperada = JSON.parse(localStorage.getItem('DB'));

    if (dbRecuperada) {
        console.log('Datos recuperados de localStorage:', dbRecuperada);
    } else {
        console.log('No se encontraron datos en localStorage');
    };

    const buscarApellido = (nombre) => {
        // Filtrar en la base de datos por el usuario indicado
        const resultado = dbRecuperada.filter(cliente => cliente.nombre.toLowerCase().includes(nombre.toLowerCase()));

        // Mostrar solo el primer cliente encontrado
        if (resultado.length > 0) {
            const cliente = resultado[0];
            Calculadora(cliente);
        } else {
            pagoResultado.innerText = `No se encontró ningún cliente con el apellido ${nombre}`;
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
    
            pagoResultado.innerText = `El cliente que hizo un calculo fue: ${nombre} y el pago mensual fue de: ${pagoMensual.toFixed(2)}`;
        } else {
            pagoResultado.innerText = `Por favor ingrese valores válidos`;
        }
    };


    const mostrarClientes = (arr = dbRecuperada) => {
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
                <td>${interes}</td>
                <td>${anos}</td>
            </tr>
            `
        ).join('')
    };

    document.getElementById('ver-clientes').addEventListener('click', () => mostrarClientes());

    document.getElementById('buscar').addEventListener('click', () => {
        const nombreIngresado = document.getElementById('persona').value;
        buscarApellido(nombreIngresado);
    });

    document.getElementById('ocultar').addEventListener('click', () => 
        document.getElementById('clientes').innerHTML = ``);