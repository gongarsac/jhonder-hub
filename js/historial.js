function verDiasGuardados() {

    const historialDias = JSON.parse(

        localStorage.getItem("historialDias")

    ) || [];

    const contenedor = document.getElementById(

        "listaDiasCerrados"

    );

    if (!contenedor) {

        return;

    }

    contenedor.innerHTML = "";

    if (historialDias.length === 0) {

        contenedor.innerHTML = `

            <p>No hay días guardados.</p>

        `;

        return;

    }

    historialDias.forEach(dia => {

        contenedor.innerHTML += `

            <div class="dia-cerrado"

                onclick="abrirDia('${dia.fecha}')">

                <h3>📅 ${dia.fecha}</h3>

                <p>

                    Operaciones:

                    ${dia.operaciones.length}

                </p>

                <p>

                    Ganancia:

                    S/ ${Number(dia.ganancia || 0).toFixed(2)}

                </p>

                <p>

                    USDT vendidos:

                    ${Number(dia.vendidos || 0).toFixed(2)}

                </p>

            </div>

        `;

    });

}

    async function cerrarDiaManual() {

    const fecha = document.getElementById(
        "fechaManual"
    ).value;

    if (!fecha) {

        alert(
            "Selecciona una fecha."
        );

        return;
    }

    const operaciones = await obtenerOperacionesSheets();

    const hoy = document.getElementById(
    "fechaManual"
).value;

    const operacionesDia = operaciones.filter(
    op => op.fecha.split("T")[0] === hoy
);
    if (operacionesDia.length === 0) {

        alert(
            "No hay operaciones para esa fecha."
        );

        return;
    }

    console.log(
        "Operaciones encontradas:",
        operacionesDia
    );

    alert(
    `Se encontraron ${operacionesDia.length} operaciones del ${hoy}`
);

}
async function cerrarDia() {



    const todasLasOperaciones =
    await obtenerOperacionesSheets();

    const hoy = document.getElementById(
    "fechaManual"
).value;

const operaciones = todasLasOperaciones.filter(
    op => op.fecha.split("T")[0] === hoy
);

if (operaciones.length === 0) {

    alert(
        "No hay operaciones para esa fecha."
    );

    return;

}

    const historialDias = JSON.parse(

        localStorage.getItem(
            "historialDias"
        )

    ) || [];
  
if (!hoy) {

    alert(
        "Selecciona una fecha."
    );

    return;

}

const yaExiste = historialDias.find(
    dia => dia.fecha === hoy
);

if (yaExiste) {

    const confirmar = confirm(
        "El día ya existe. ¿Quieres reemplazarlo?"
    );

    if (!confirmar) return;

    historialDias.splice(
        historialDias.indexOf(yaExiste),
        1
    );
}

    

    let gananciaDia = 0;

let usdtVendidos = 0;

operaciones.forEach(op => {

    if (op.tipo === "Venta") {

        gananciaDia += Number(

            op.ganancia || 0

        );

        usdtVendidos += Number(

            op.cantidad || 0

        );

    }

});

   historialDias.push({

    fecha: hoy,

    operaciones: [...operaciones],

    ganancia: gananciaDia,

    vendidos: usdtVendidos

});
const comprasDia = operaciones
    .filter(op => op.tipo === "Compra")
    .reduce(
        (total, op) => total + Number(op.cantidad || 0),
        0
    );

const capitalActual = 0;


console.log({

    compras: comprasDia,

    ventas: usdtVendidos,

    ganancia: gananciaDia,

    capital: capitalActual

});

console.log({

    tipo: "Calendario",

    fecha: hoy,

    compras: comprasDia,

    ventas: usdtVendidos,

    ganancia: gananciaDia,

    capital: capitalActual

});

console.log({
    comprasDia,
    usdtVendidos,
    gananciaDia,
    capitalActual
});
await fetch(
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec",
    {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({
            tipo: "Calendario",
            fecha: hoy,
            compras: comprasDia,
            ventas: usdtVendidos,
            ganancia: gananciaDia,
            capital: capitalActual
        })
    }
);



    localStorage.setItem(

        "historialDias",

        JSON.stringify(

            historialDias

        )

    );

    actualizarOperaciones([]);

    cargarHistorial();
    cargarFiltrosHistorial();

    alert(

        "✅ Día cerrado correctamente."

    );

}

function verDiasGuardados() {

    const historialDias = JSON.parse(

        localStorage.getItem("historialDias")

    ) || [];

    const contenedor = document.getElementById(

        "listaDiasCerrados"

    );

    contenedor.innerHTML = "";

    if (historialDias.length === 0) {

        contenedor.innerHTML = `

            <p>No hay días cerrados.</p>

        `;

        return;

    }

    historialDias.forEach(dia => {

    contenedor.innerHTML += `

        <div
    class="dia-cerrado"
    onclick="abrirDia('${dia.fecha}')"
>

            <h3>📅 ${dia.fecha}</h3>

            <p>

                Operaciones:

                ${dia.operaciones.length}

            </p>

            <p>

                Ganancia:

                S/ ${dia.ganancia.toFixed(2)}

            </p>
            <p>

    USDT vendidos:

    ${Number(dia.vendidos || 0).toFixed(2)}

</p>

        </div>

    `;

});

}
function cargarFiltrosHistorial() {

    const historialDias = JSON.parse(
        localStorage.getItem("historialDias")
    ) || [];

    const selectAnio = document.getElementById(
        "filtroAnio"
    );

    const selectMes = document.getElementById(
        "filtroMes"
    );

    if (!selectAnio || !selectMes) {

    return;

}

    selectAnio.innerHTML = `
        <option value="">
            Seleccionar año
        </option>
    `;

    selectMes.innerHTML = `
        <option value="">
            Seleccionar mes
        </option>
    `;

    const anios = [

        ...new Set(

            historialDias.map(
                dia => dia.fecha.split("-")[0]
            )

        )

    ];

    anios.forEach(anio => {

        selectAnio.innerHTML += `

            <option value="${anio}">

                ${anio}

            </option>

        `;

    });

    

}

function abrirDia(fecha) {

    const historialDias = JSON.parse(

        localStorage.getItem("historialDias")

    ) || [];

    const dia = historialDias.find(

        item => item.fecha === fecha

    );

    if (!dia) {

        alert(fecha);

        return;

    }

    cargarHistorial(

        dia.operaciones

    );

}
async function cargarHistorial(operaciones = null) {
    console.log("ENTRÉ A cargarHistorial");

    let listaOperaciones = operaciones || await obtenerOperacionesSheets();
    console.log(listaOperaciones);
    const compras = listaOperaciones.filter(

    op => op.tipo === "Compra"

);

const ventas = listaOperaciones.filter(

    op => op.tipo === "Venta"

);

const totalCompras = compras.reduce(

    (total, op) => total + Number(op.cantidad || 0),

    0

);

const totalVentas = ventas.reduce(

    (total, op) => total + Number(op.cantidad || 0),

    0

);

const ganancia = ventas.reduce(

    (total, op) => total + Number(op.ganancia || 0),

    0

);

document.getElementById(

    "resumenCompras"

).textContent = totalCompras.toFixed(2) + " USDT";

document.getElementById(

    "resumenVentas"

).textContent = totalVentas.toFixed(2) + " USDT";

document.getElementById(

    "resumenGanancia"

).textContent = "S/ " + ganancia.toFixed(2);

document.getElementById(

    "resumenOperaciones"

).textContent = listaOperaciones.length;

    listaOperaciones = listaOperaciones.filter(

        op => op.tipo !== "Gasto"

    );

    const contenedor = document.getElementById(

        "contenedorHistorial"

    );
    console.log("Contenedor:", contenedor);
console.log("Operaciones:", listaOperaciones);

    if (!contenedor) {

        return;

    }

    if (listaOperaciones.length === 0) {

        contenedor.innerHTML = `

            <p>No hay operaciones.</p>

        `;

        return;

    }

    contenedor.innerHTML = `

        <div class="card historial-card">

            <h2>📅 Operaciones</h2>

            <table class="tabla-historial">

                <thead>

                    <tr>

                        <th>Tipo</th>
                           <th>Cliente</th>
                           <th>Banco</th>
                           <th>Precio</th>
                           <th>USDT</th>
                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    ${listaOperaciones.map(op => `

                        <tr>

                            <td>${op.tipo}</td>
                              <td>${op.cliente}</td>
                              <td>${op.banco}</td>
                              <td>S/ ${op.precio}</td>
                              <td>${op.cantidad}</td>
                             <td class="${
                                op.tipo === "Venta"
                                ? "ganancia-verde"
                                : ""
                                }">
                                ${
                                op.tipo === "Venta"
                                ? "S/ " + (op.ganancia || 0).toFixed(2)
                                : "S/ " + op.total
                                }
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>

        </div>

    `;
}
function mostrarTodo() {

    cargarHistorial();

}

function mostrarCompras() {

    const operaciones = obtenerOperaciones().filter(

        op => op.tipo === "Compra"

    );

    cargarHistorial(operaciones);

}

function mostrarVentas() {

    const operaciones = obtenerOperaciones().filter(

        op => op.tipo === "Venta"

    );

    cargarHistorial(operaciones);

}

function reabrirDia() {

    const historialDias = JSON.parse(

        localStorage.getItem("historialDias")

    ) || [];

    if (historialDias.length === 0) {

        alert(

            "No hay días cerrados."

        );

        return;

    }

    const ultimoDia = historialDias[

        historialDias.length - 1

    ];

    actualizarOperaciones(

        ultimoDia.operaciones

    );
    historialDias.pop();

localStorage.setItem(

    "historialDias",

    JSON.stringify(

        historialDias

    )

);

    alert(

        "✅ Día reabierto correctamente."

    );

    location.reload();

}
cargarHistorial();