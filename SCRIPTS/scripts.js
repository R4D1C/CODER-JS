/*

Uso la fórmula de amortización para el calculo del calculo del pago mensual que es:

M = ( p * r (1 + r)^n ) / ( (1 + r) ^ n - 1 )

donde M es el pago mensual
p es el monto del prestamo
r es la taza de interes mensual
n es el numero total de pagos

*/
// No se si sea incorrecto poner la Ñ, así que por las dudas la cambio por una N


    class Cliente {
        constructor(nombre, monto, interes, anos) {
            this.nombre = nombre;
            this.monto = monto;
            this.interes = interes;
            this.anos = anos;
        }
    }
    
    const DB = [
        new Cliente("Gutierrez Victor", 230000, 6, 4),
        new Cliente("Martinez Juan", 1300000, 3, 6),
        new Cliente("Sanchez Carlos", 400000, 12, 2),
        new Cliente("Perez Gerardo", 600000, 7, 4)
    ];
    
    function buscarApellido(nombre) {
        // Filtar en la base de datos por el usuario indicado
        let resultado = DB.filter(cliente => cliente.nombre.toLowerCase().includes(nombre.toLowerCase()));
    
        // Función para calcular el pago mensual y mostrarlo
        function Calculadora(cliente) {
            let nombre = cliente.nombre;
            let monto = parseInt(cliente.monto);
            let interes = parseFloat(cliente.interes);
            let anos = parseInt(cliente.anos);
    
            if (monto > 0 && interes > 0 && anos > 0) {
                const intereses = interes / 100 / 12; // Convertir interés anual a interés mensual
                const pagos = anos * 12; // Número total de pagos mensuales
                const x = Math.pow(1 + intereses, pagos);
                const pagoMensual = (monto * x * intereses) / (x - 1); // Fórmula del pago mensual
    
                console.log(`El cliente es ${nombre} y el pago mensual es de: ${pagoMensual.toFixed(2)}`);
            } else {
                console.log(`Por favor ingrese valores válidos`);
            }
        }
    
        // Llamar a Calculadora para cada cliente encontrado
        resultado.forEach(cliente => Calculadora(cliente));
    
        // Devolver el resultado para visualización adicional si se requiere
        return resultado;
    }
    
    // Simular la entrada de usuario para pruebas
    let nombreCli = prompt('Ingrese el nombre del cliente');
    console.log(buscarApellido(nombreCli));