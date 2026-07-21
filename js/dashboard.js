
async function obtenerCapitalInicial() {

    const respuesta = await fetch(URL_API);

    const datos = await respuesta.json();

    return Number(datos.capitalInicial);

}

async function cargarDashboard() {

    let cache = JSON.parse(
    localStorage.getItem("cacheOperaciones")
);

let operaciones = cache?.operaciones;

if (!operaciones) {

    operaciones = await obtenerOperacionesSheets();

}
console.log(

    "Datos sincronizados desde Sheets"

);

    let capital = 0;
    let ganancia = 0;
    let gastos = 0;

    let capitalInicial = await obtenerCapitalInicial();

    let capitalActual = 0;
    let comprado = 0;
    let vendido = 0;
    let disponible = 0;
    let gananciaTotal = 0;

    operaciones.forEach(op => {

        console.log(op);

        if (op.tipo === "Compra") {

            comprado += Number(op.cantidad);

            console.log(
                op.fecha,
                op.disponible,
                op.precio
            );

            capital +=
                Number(op.disponible || 0) *
                Number(op.precio);

        }

       if (op.tipo === "Venta") {

    vendido += Number(op.cantidad);

    ganancia += Number(op.ganancia || 0);

    gananciaTotal += Number(op.ganancia || 0);

}
        if (op.tipo === "Gasto") {

            gastos += Number(op.monto || 0);

        }

    });

    disponible = comprado - vendido;

    capitalActual = capitalInicial + ganancia - gastos;
    console.log("Capital inicial:", capitalInicial);
console.log("Ganancia:", ganancia);
console.log("Gastos:", gastos);
console.log("Capital actual:", capitalActual);

    document.getElementById("fondosActivos").textContent =
        "S/ " + capital.toFixed(2);

    document.getElementById("capitalActual").textContent =
        "S/ " + capitalActual.toFixed(2);

    document.getElementById("comprado").textContent =
        comprado.toFixed(2) + " USDT";

    document.getElementById("vendido").textContent =
        vendido.toFixed(2) + " USDT";

    document.getElementById("disponible").textContent =
        disponible.toFixed(2) + " USDT";
        
        document.getElementById("usdtInventario").textContent =
    disponible.toFixed(2) + " USDT";

    
const bloques = operaciones.filter(op =>
    op.tipo === "Compra" &&
    Number(op.disponible || 0) > 0
).length;

document.getElementById("bloquesFifo").textContent =
    bloques;
    document.getElementById("gananciaDia").textContent =
    "S/ " + gananciaTotal.toFixed(2);

document.getElementById("operacionesDia").textContent =
    operaciones.filter(
        op =>
            op.tipo === "Compra" ||
            op.tipo === "Venta"
    ).length;
   
}

let capitalActual = 0;
cargarDashboard();
const configuracion = JSON.parse(
    localStorage.getItem(
        "configuracion"
    )
);

if (configuracion) {

    document.getElementById(
        "nombreEmpresa"
    ).textContent = configuracion.empresa;

}
const empresaSidebar = document.getElementById(
    "nombreEmpresaSidebar"
);

if (configuracion && empresaSidebar) {

    empresaSidebar.textContent =
        configuracion.empresa;

}