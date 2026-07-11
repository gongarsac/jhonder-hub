function cargarDashboard() {

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

    document.getElementById("capital").textContent =
        "S/ " + capital.toFixed(2);

    document.getElementById("ganancia").textContent =
        "S/ " + ganancia.toFixed(2);

    document.getElementById("comprado").textContent =
        comprado.toFixed(2) + " USDT";

    document.getElementById("vendido").textContent =
        vendido.toFixed(2) + " USDT";

    document.getElementById("disponible").textContent =
        disponible.toFixed(2) + " USDT";
}

cargarDashboard();