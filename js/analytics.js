function cargarAnalytics() {

    const operaciones = obtenerOperaciones();

    let capital = 0;
    let ganancia = 0;
    let comprado = 0;
    let vendido = 0;
    let disponible = 0;

    operaciones.forEach(op => {

        if (op.tipo === "Compra") {

            capital += Number(op.total);
            comprado += Number(op.cantidad);
            disponible += Number(op.disponible || 0);

        }

        if (op.tipo === "Venta") {

            vendido += Number(op.cantidad);
            ganancia += Number(op.ganancia || 0);

        }

    });

    document.getElementById(
        "capitalAnalytics"
    ).textContent =
        "S/ " + capital.toFixed(2);

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
        "compradoAnalytics"
    ).textContent =
        comprado.toFixed(2) + " USDT";

    document.getElementById(
        "vendidoAnalytics"
    ).textContent =
        vendido.toFixed(2) + " USDT";

    document.getElementById(
        "gananciaTabla"
    ).textContent =
        "S/ " + ganancia.toFixed(2);

}

cargarAnalytics();

const operaciones = obtenerOperaciones();

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