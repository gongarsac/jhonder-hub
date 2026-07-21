async function verDiasGuardados() {
  const respuesta = await fetch(URL_API);

const datos = await respuesta.json();

const historialDias = datos.calendario.map(fila => ({

    fecha: fila[0].split("T")[0],

    comprado: Number(fila[1]),

    vendido: Number(fila[2]),

    ganancia: Number(fila[3]),

    capital: Number(fila[4])

}));

    

    const mes = document.getElementById(
        "filtroMes"
    ).value;

    let diasFiltrados = historialDias;

   
    if (mes !== "") {

        diasFiltrados = diasFiltrados.filter(

            dia => dia.fecha.split("-")[1] === mes

        );

    }

    const contenedor = document.getElementById(

        "listaDiasCerrados"

    );

    contenedor.innerHTML = "";

    if (diasFiltrados.length === 0) {

        contenedor.innerHTML = `

            <p>No hay días guardados.</p>

        `;

        return;
    }

    diasFiltrados.forEach(dia => {

        contenedor.innerHTML += `

            <div class="dia-cerrado"
                 onclick="abrirDia('${dia.fecha}')">

                <h3>📅 ${dia.fecha}</h3>

                <p>Comprados: ${dia.comprado} USDT</p>

<p>Vendidos: ${dia.vendido} USDT</p>

<p>Ganancia: S/ ${dia.ganancia.toFixed(2)}</p>

<p>Capital: S/ ${dia.capital.toFixed(2)}</p>

            </div>

        `;

    });

}
async function cargarFiltrosHistorial() {

    const respuesta = await fetch(URL_API);

    const datos = await respuesta.json();

    const historialDias = datos.calendario.map(fila => ({

       fecha: fila[0].split("T")[0],

        comprado: Number(fila[1]),

        vendido: Number(fila[2]),

        ganancia: Number(fila[3]),

        capital: Number(fila[4])

    }));
    console.log(historialDias);


    const selectMes = document.getElementById("filtroMes");

    const meses = [

    ...new Set(

        historialDias.map(

            dia => dia.fecha.split("-")[1]

        )

    )

];

selectMes.innerHTML = `
    <option value="">Seleccionar mes</option>
`;

meses.forEach(mes => {

    selectMes.innerHTML += `

        <option value="${mes}">
            ${mes}
        </option>

    `;

});

}

window.onload = async function () {

    await cargarFiltrosHistorial();

};
async function abrirDia(fecha) {

    const respuesta = await fetch(URL_API);

    const datos = await respuesta.json();

    const compras = datos.compras.filter(

        compra => compra[1].split("T")[0] === fecha

    );

    const ventas = datos.ventas.filter(

        venta => venta[1].split("T")[0] === fecha

    );

    const contenedor = document.getElementById(
    "detalleDia"
    );

    contenedor.innerHTML = `

        <div class="card">

            <h2>📅 Operaciones del ${fecha}</h2>

            <h3>🟢 Compras</h3>

            <table class="tabla-historial">

                <thead>

                    <tr>

                        <th>Cliente</th>

                        <th>Banco</th>

                        <th>USDT</th>

                        <th>Precio</th>

                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    ${compras.map(compra => `

                        <tr>

                            <td>${compra[2]}</td>

                            <td>${compra[3]}</td>

                            <td>${compra[4]}</td>

                            <td>S/ ${compra[5]}</td>

                            <td>S/ ${compra[6]}</td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

            <br>

            <h3>🔴 Ventas</h3>

            <table class="tabla-historial">

                <thead>

                    <tr>

                        <th>Cliente</th>

                        <th>Banco</th>

                        <th>USDT</th>

                        <th>Precio</th>

                        <th>Total</th>

                        <th>Ganancia</th>

                    </tr>

                </thead>

                <tbody>

                    ${ventas.map(venta => `

                        <tr>

                            <td>${venta[2]}</td>

                            <td>${venta[3]}</td>

                            <td>${venta[4]}</td>

                            <td>S/ ${venta[5]}</td>

                            <td>S/ ${venta[6]}</td>

                            <td class="ganancia-verde">
                               S/ ${Number(venta[7]).toFixed(2)}
                               </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;
}