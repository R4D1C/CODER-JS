/*

Uso la fórmula de amortización para el calculo del calculo del pago mensual que es:

M = ( p * r (1 + r)^n ) / ( (1 + r) ^ n - 1 )

donde M es el pago mensual
p es el monto del prestamo
r es la taza de interes mensual
n es el numero total de pagos

*/
// No se si sea incorrecto poner la Ñ, así que por las dudas la cambio por una N

let calculos = parseInt(prompt("Indique cuantos créditos quiere calcular"));

function Calculadora () {
    let monto = parseInt(prompt(`Ingrese el monto del crédito`));
    let interes = parseInt(prompt(`Ingrese el porcentaje de interés`));
    let anos = parseInt(prompt(`Ingrese los años que tomará pagar el crédito`));

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


for (let i = 0; i < calculos; i++) {
    // Llamo a la función y relleno los parámetros
    Calculadora();
}
