window.addEventListener("DOMContentLoaded", () => {

const formulario = document.getElementById("formCompra");

if (!formulario) {
    return;
}

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const compra = {

        id: generarId("CP"),

        tipo: "Compra",

        fecha: document.getElementById("fechaCompra").value,

        cliente: document.getElementById("cliente").value,

        banco: document.getElementById("banco").value,

        cantidad: Number(document.getElementById("cantidad").value),

        precio: Number(document.getElementById("precio").value),

        total: Number(document.getElementById("total").value),

        disponible: Number(document.getElementById("cantidad").value)

    };
//console.log("DATOS ENVIADOS:", compra);
    // agregarOperacion(compra);
    
fetch(
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec",
    {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(compra)
    }
)
.then(() => {

    console.log("DATOS ENVIADOS:");

    console.log("Compra enviada a Google Sheets");

})
.catch(error => {

    console.error(error);

});

cargarCompras();

alert("✅ Compra guardada correctamente");

this.reset();
const hoy = new Date();

hoy.setMinutes(
    hoy.getMinutes() - hoy.getTimezoneOffset()
);

document.getElementById("fechaCompra").value =
    hoy.toISOString().split("T")[0];

document.getElementById("fechaCompra").value=
    new Date()
        .toISOString()
        .split("T")[0];
});

document
    .getElementById("precio")
    .addEventListener("input", calcularTotal);

document
    .getElementById("cantidad")
    .addEventListener("input", calcularTotal);

function calcularTotal() {

    const cantidad = Number(
        document.getElementById("cantidad").value
    );

    const precio = Number(
        document.getElementById("precio").value
    );

    document.getElementById("total").value =
        (cantidad * precio).toFixed(2);

}

async function cargarCompras() {

    const operaciones = await obtenerOperacionesSheets();

    const tbody = document.querySelector(
        "#tablaCompras tbody"
    );

    tbody.innerHTML = "";

    let totalComprado = 0;

    let capitalInvertido = 0;

    let disponibleTotal = 0;

    operaciones.forEach(compra => {

        if (compra.tipo === "Compra") {

            totalComprado += compra.cantidad;

            capitalInvertido += compra.total;

            disponibleTotal += compra.disponible;

            tbody.innerHTML += `

            <tr>

                <td>${compra.fecha}</td>

                <td>${compra.cliente}</td>

                <td>${compra.banco}</td>

                <td>${compra.cantidad.toFixed(2)}</td>

                <td>S/ ${compra.precio.toFixed(3)}</td>

                <td>S/ ${compra.total.toFixed(2)}</td>

                <td style="color:#22c55e;font-weight:bold;">

                    ${compra.disponible.toFixed(2)}

                </td>

                <td class="acciones">

                   <button
    class="btn-eliminar"
    onclick="eliminarCompra('${compra.id}')"
>
    🗑️
</button>


                </td>

            </tr>

            `;
        }

    });

    document.getElementById("totalComprado").textContent =
        totalComprado.toFixed(2) + " USDT";

    document.getElementById("capitalInvertido").textContent =
        "S/ " + capitalInvertido.toFixed(2);

    document.getElementById("usdtDisponible").textContent =
        disponibleTotal.toFixed(2) + " USDT";

}

async function eliminarCompra(id) {

    const confirmar = confirm(
        "¿Deseas eliminar esta compra?"
    );

    if (!confirmar) return;

    let operaciones = await obtenerOperacionesSheets();

    operaciones = operaciones.filter(
        op => op.id !== id
    );

    await fetch(URL_API, {
    method: "POST",
    body: JSON.stringify({
        tipo: "EliminarCompra",
        id: id
    })
});

actualizarOperaciones(operaciones);

cargarCompras();

    alert(
        "✅ Compra eliminada."
    );

}

const operacionEditar = JSON.parse(
    localStorage.getItem("operacionEditar")
);

if (
    operacionEditar &&
    operacionEditar.tipo === "Compra"
) {

   document.getElementById("fechaCompra").value =
    operacionEditar.fecha;

    document.getElementById("cliente").value =
        operacionEditar.cliente;

    document.getElementById("banco").value =
        operacionEditar.banco;

    document.getElementById("cantidad").value =
        operacionEditar.cantidad;

    document.getElementById("precio").value =
        operacionEditar.precio;

    document.getElementById("total").value =
        operacionEditar.total;

    localStorage.removeItem(
        "operacionEditar"
    );
}
async function editarCompra(id) {

    const operaciones = await obtenerOperacionesSheets();

    const compra = operaciones.find(

        op => op.id === id

    );

    if (!compra) return;

    const nuevasOperaciones = operaciones.filter(

        op => op.id !== id

    );

    actualizarOperaciones(

        nuevasOperaciones

    );

    localStorage.setItem(

        "operacionEditar",

        JSON.stringify(compra)

    );

    window.location.reload();

}
function cargarClientesSelect() {

    const clientes = JSON.parse(
        localStorage.getItem("clientes")
    ) || [];

    const lista = document.getElementById(
        "listaClientes"
    );

    lista.innerHTML = "";

    clientes.forEach(cliente => {

        lista.innerHTML += `

            <option value="${cliente.nombre}"></option>

        `;

    });

}

cargarClientesSelect();
cargarCompras();

window.eliminarCompra = eliminarCompra;

console.log("compras.js cargado correctamente");

});
document.addEventListener(
    "DOMContentLoaded",
    () => {

        const hoy = new Date()

            .toISOString()

            .split("T")[0];

        document.getElementById(
            "fecha"
        ).value = hoy;

    }
);
document.addEventListener(

    "DOMContentLoaded",

    () => {

        const hoy = new Date();

hoy.setMinutes(
    hoy.getMinutes() - hoy.getTimezoneOffset()
);

document.getElementById("fechaCompra").value =
    hoy.toISOString().split("T")[0];

    }

);
const configuracion = JSON.parse(
    localStorage.getItem(
        "configuracion"
    )
);

const nombreEmpresaCompras =
    document.getElementById(
        "nombreEmpresaCompras"
    );

if (
    configuracion &&
    nombreEmpresaCompras
) {

    nombreEmpresaCompras.textContent =
        configuracion.empresa;

}