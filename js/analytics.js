async function cargarAnalytics() {

   let cache = JSON.parse(
    localStorage.getItem("cacheOperaciones")
);

let operaciones = cache?.operaciones;

    if (!operaciones) {
        operaciones = await obtenerOperacionesSheets();
    }

    let ganancia = 0;
    let invertido = 0;

    const clientes = new Set();

    operaciones.forEach(op => {

        if (op.tipo === "Compra") {

            invertido += Number(op.total || 0);

        }

        if (op.tipo === "Venta") {

            ganancia += Number(op.ganancia || 0);

        }

        if (op.cliente) {

            clientes.add(op.cliente);

        }

    });

    document.getElementById("gananciaTotal").textContent =
        "S/ " + ganancia.toFixed(2);

    document.getElementById("capitalInvertido").textContent =
        "S/ " + invertido.toFixed(2);

    document.getElementById("totalOperaciones").textContent =
        operaciones.length;

    document.getElementById("clientesUnicos").textContent =
        clientes.size;

}

cargarAnalytics();
    async function crearGraficoComprasVentas() {

        let cache = JSON.parse(
    localStorage.getItem("cacheOperaciones")
);

let operaciones = cache?.operaciones || [];

if (operaciones.length === 0) {
    operaciones = await obtenerOperacionesSheets();
}

        if (!operaciones) {

            operaciones = await obtenerOperacionesSheets();

        }

        let compras = 0;
    let ventas = 0;
    let ganancia = 0;
    let invertido = 0;
    let disponible = 0;

        operaciones.forEach(op => {

            if (op.tipo === "Compra") {

                compras += Number(op.total || 0);
                invertido += Number(op.total || 0);
                disponible += Number(op.disponible || 0);

            }

            if (op.tipo === "Venta") {

        ventas += Number(op.total || 0);

        ganancia += Number(op.ganancia || 0);

    }

        });
        

        const ctx = document.getElementById(
            "graficoOperaciones"
        );

        new Chart(ctx, {

            type: "bar",

            data: {

                labels: [

        "Capital invertido",
        "Ganancia",

    ],

                datasets: [{

                    label: "Monto (S/)",

                data: [

        invertido,
        ganancia,
        

    ],

                    borderWidth: 1

                }]

            },

            options: {
    responsive: true,
    maintainAspectRatio: false,

                plugins: {

                    legend: {

                        labels: {

                            color: "white"

                        }

                    }

                },

                scales: {

                    y: {

                        ticks: {

                            color: "white"

                        }

                    },

                    x: {

                        ticks: {

                            color: "white"

                        }

                    }

                }

            }

        });

    }

crearGraficoComprasVentas();

async function crearGraficoGanancias() {

    let cache = JSON.parse(
    localStorage.getItem("cacheOperaciones")
);

let operaciones = cache?.operaciones || [];

if (operaciones.length === 0) {
    operaciones = await obtenerOperacionesSheets();
}

    if (!operaciones) {

        operaciones = await obtenerOperacionesSheets();

    }

    let capitalInicial = 100000;

    let capitalActual = capitalInicial;

    let fechas = [];

    let capitales = [];

    operaciones.sort((a, b) => {

        return new Date(a.fecha) - new Date(b.fecha);

    });

    operaciones.forEach(op => {

        if (op.tipo === "Venta") {

            capitalActual += Number(op.ganancia || 0);

        }

        if (op.tipo === "Gasto") {

            capitalActual -= Number(op.monto || 0);

        }

        fechas.push(op.fecha);

        capitales.push(capitalActual);

    });

    const ctx = document.getElementById(
        "graficoGanancias"
    );

    new Chart(ctx, {

        type: "line",

        data: {

            labels: fechas,

            datasets: [{

                label: "Capital total",

                data: capitales,

                tension: 0.3,

                borderWidth: 3

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            },

            scales: {

                y: {

                    ticks: {

                        color: "white"

                    }

                },

                x: {

                    ticks: {

                        color: "white"

                    }

                }

            }

        }

    });

}
crearGraficoGanancias();