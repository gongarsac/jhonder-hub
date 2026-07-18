async function cargarAnalytics() {

    const operaciones = await obtenerOperacionesSheets();
 

    let ganancia = 0;
let gastos = 0;
let comprado = 0;
let vendido = 0;
let disponible = 0;
let capitalActual = 0;
    const capitalInicial = Number(
    localStorage.getItem(
        "capitalInicial"
    )
) || 0;

    operaciones.forEach(op => {

    if (op.tipo === "Compra") {

    comprado += Number(op.cantidad);

}

if (op.tipo === "Venta") {

    vendido += Number(op.cantidad);

    ganancia += Number(op.ganancia || 0);

}

if (op.tipo === "Gasto") {

    gastos += Number(op.monto || 0);

}

disponible = comprado - vendido;

    if (op.tipo === "Venta") {

        vendido += Number(op.cantidad);
        ganancia += Number(op.ganancia || 0);

    }

    if (op.tipo === "Gasto") {

        gastos += Number(op.monto || 0);

    }

});

capitalActual = capitalInicial + ganancia - gastos;

    document.getElementById(
    "capitalAnalytics"
).textContent =
    "S/ " + capitalActual.toFixed(2);

    document.getElementById(
        "gananciaAnalytics"
    ).textContent =
        "S/ " + ganancia.toFixed(2);

    document.getElementById(
        "disponibleAnalytics"
    ).textContent =
        disponible.toFixed(2) + " USDT";
        document.getElementById(
    "operacionesAnalytics"
).textContent =
    operaciones.length;

    document.getElementById(
    "gastosAnalytics"
).textContent =
    "S/ " + gastos.toFixed(2);

    
}

cargarAnalytics();

const operaciones = JSON.parse(

    localStorage.getItem(

        "cacheOperaciones"

    )

) || [];
console.log(operaciones);

let totalCompras = 0;
let totalVentas = 0;
let gananciaTotal = 0;

const fechas = [];
const gananciasPorVenta = [];

operaciones.forEach(op => {

    if (op.tipo === "Compra") {

        totalCompras += Number(op.total);

    }

    if (op.tipo === "Venta") {

        totalVentas += Number(op.total);

        gananciaTotal += Number(
            op.ganancia || 0
        );

        fechas.push(op.fecha);

        gananciasPorVenta.push(
            Number(op.ganancia || 0)
        );

    }

});

new Chart(

    document.getElementById(
        "graficoOperaciones"
    ),

    {

        type: "doughnut",

        data: {

            labels: [

                "Compras",

                "Ventas"

            ],

            datasets: [

                {

                    data: [

                        totalCompras,

                        totalVentas

                    ],

                    backgroundColor: [

                        "#2563eb",

                        "#22c55e"

                    ]

                }

            ]

        }

    }

);

new Chart(

    document.getElementById(
        "graficoGanancias"
    ),

    {

        type: "line",

        data: {

            labels: fechas,

            datasets: [

                {

                    label: "Ganancias",

                    data: gananciasPorVenta,

                    borderColor: "#22c55e",

                    backgroundColor:
                        "rgba(34,197,94,0.2)",

                    fill: true,

                    tension: 0.4

                }

            ]

        },

        options: {

            responsive: true

        }

    }

);
const configuracion = JSON.parse(
    localStorage.getItem(
        "configuracion"
    )
);

const nombreEmpresaAnalytics =
    document.getElementById(
        "nombreEmpresaAnalytics"
    );

if (
    configuracion &&
    nombreEmpresaAnalytics
) {

    nombreEmpresaAnalytics.textContent =
        configuracion.empresa;

}