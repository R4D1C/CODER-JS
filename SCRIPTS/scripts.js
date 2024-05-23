/*

Uso la fórmula de amortización para el calculo del calculo del pago mensual que es:

M = ( p * r (1 + r)^n ) / ( (1 + r) ^ n - 1 )

donde M es el pago mensual
p es el monto del prestamo
r es la taza de interes mensual
n es el numero total de pagos

*/

class Calculadora {
    constructor(monto,interes,anos) {
        this.monto = monto;
        this.interes = interes / 100 / 12;
        this.anos = anos;
    }

    calcular(){
        let pagos = this.anos * 12;
        let x = Math.pow(1 + this.interes, pagos);
        let pagoMensual = (this.monto * x * this.interes) / (x - 1);

        console.log(`El pago mensual es de: ${pagoMensual.toFixed(2)}`)
    }
}

let cliente1 = new Calculadora(210000, 17, 4);
let cliente2 = new Calculadora(300000, 17, 2);

cliente1.calcular();
cliente2.calcular();