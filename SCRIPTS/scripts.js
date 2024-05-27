/*

Uso la fórmula de amortización para el calculo del calculo del pago mensual que es:

M = ( p * r (1 + r)^n ) / ( (1 + r) ^ n - 1 )

donde M es el pago mensual
p es el monto del prestamo
r es la taza de interes mensual
n es el numero total de pagos

*/
// No se si sea incorrecto poner la Ñ, así que por las dudas la cambio por una N

    const monto1 = parseInt(prompt(`Por favor ingrese el monto del crédito`));
    const interes1 = parseInt(prompt(`Ingrese el índice interés en porcentaje`));
    const anos1 = parseInt(prompt(`Ingrese los años que tomará pagar el crédito`));

function Calculadora (monto, interes, anos) {

    if (monto > 0 && interes > 0 && monto > 0) {
        // Interes pide que se ingrese en porcentajes, Con este calculo lo paso a decimales y lo divido por los meses de un año
        const intereses = interes / 100 / 12;
        const pagos = anos * 12;
        const x = Math.pow(1 + intereses, pagos);
        const pagoMensual = (monto * x * intereses) / (x - 1);

        // Muestro el resultado en consola
        console.log(`El pago mensual es de: ${pagoMensual.toFixed(2)}`);
    } else {
        alert(`Por favor ingrese valores válidos`);
    }
}

// Llamo a la función y relleno los parámetros
Calculadora(monto1, interes1, anos1);