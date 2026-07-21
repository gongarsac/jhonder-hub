async function cargarFIFO() {

    let cache = JSON.parse(
    localStorage.getItem("cacheOperaciones")
);

let operaciones = cache?.operaciones;

    if (!operaciones) {

        operaciones = await obtenerOperacionesSheets();

    }

    const tbody = document.querySelector(
        "#tablaFifo tbody"
    );

    tbody.innerHTML = "";

    const comprasActivas = operaciones.filter(op =>

        op.tipo === "Compra" &&
        Number(op.disponible || 0) > 0

    );

    comprasActivas.forEach(compra => {

        tbody.innerHTML += `

            <tr>

                <td>${compra.id}</td>
                <td>${compra.fecha}</td>
                <td>${compra.banco}</td>
                <td>S/ ${Number(compra.precio).toFixed(2)}</td>
                <td>${Number(compra.cantidad).toFixed(2)} USDT</td>
                <td>${Number(compra.disponible).toFixed(2)} USDT</td>

            </tr>

        `;

    });

}

cargarFIFO();