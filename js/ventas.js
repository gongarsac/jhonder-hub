window.addEventListener("DOMContentLoaded", () => {

    

    const fechaInput = document.getElementById("fechaVenta");

    if (fechaInput) {

        const hoy = new Date();

        const fechaLocal = hoy.getFullYear() + "-" +
            String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
            String(hoy.getDate()).padStart(2, "0");

        fechaInput.value = fechaLocal;
    }

});
document.getElementById("formVenta").addEventListener("submit", async function (e) {
    e.preventDefault();

    const cantidadVenta = Number(
        document.getElementById("cantidad").value
    );

    let resultadoFIFO;

if (editandoId) {

    resultadoFIFO = {
        costoTotal: operacionEditar.costoFIFO,
        lotesUsados: operacionEditar.lotesUsados || []
    };

} else {

    resultadoFIFO = await procesarFIFO(cantidadVenta);

    if (!resultadoFIFO) {
        return;
    }

}
    console.log("Editando:", editandoId);
console.log("Cantidad:", cantidadVenta);
console.log("Resultado FIFO:", resultadoFIFO);

    if (!resultadoFIFO) {
        return;
    }

    const totalVenta = Number(
        document.getElementById("total").value
    );

    const venta = {

    id: editandoId || generarId("VT"),

    tipo: editandoId ? "EditarVenta" : "Venta",

    fecha: document.getElementById("fechaVenta").value,

    cliente: document.getElementById("cliente").value,

    banco: document.getElementById("banco").value,

    cantidad: cantidadVenta,

    precio: Number(
        document.getElementById("precio").value
    ),

    costoFIFO: resultadoFIFO.costoTotal,

    total: totalVenta,

    ganancia: totalVenta - resultadoFIFO.costoTotal,

    lotesUsados: resultadoFIFO.lotesUsados

};

    //agregarOperacion(venta);
    fetch(
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec",
    {
        method: "POST",
        headers: {
    "Content-Type": "text/plain;charset=utf-8"
},
        body: JSON.stringify(venta)
    }
)
.then(() => {

    console.log("VENTA ENVIADA:");
console.log(JSON.stringify(venta));

cargarVentas();

})
.catch(error => {

    console.error(error);

});

    cargarVentas();

    alert(

        "✅ Venta guardada correctamente\n\n" +

        "Costo FIFO: S/ " +

        resultadoFIFO.costoTotal.toFixed(2) +

        "\nGanancia: S/ " +

        venta.ganancia.toFixed(2)

    );
    localStorage.removeItem("operacionEditar");

editandoId = null;

    this.reset();
    const hoy = new Date();

hoy.setMinutes(
    hoy.getMinutes() - hoy.getTimezoneOffset()
);

document.getElementById("fechaVenta").value =
    hoy.toISOString().split("T")[0];

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

async function cargarVentas() {

    const operaciones = await obtenerOperacionesSheets();

    const tbody = document.querySelector(
        "#tablaVentas tbody"
    );

    tbody.innerHTML = "";

    operaciones.forEach(op => {

        if (op.tipo === "Venta") {

            tbody.innerHTML += `

            <tr>

                <td>${op.fecha}</td>

                <td>${op.cliente}</td>

                <td>${op.banco}</td>

                <td>${op.cantidad.toFixed(2)}</td>

                <td>S/ ${op.precio.toFixed(3)}</td>

                <td>S/ ${op.costoFIFO.toFixed(2)}</td>

                <td style="color:#22c55e;font-weight:bold;">

                    S/ ${op.ganancia.toFixed(2)}

                </td>

                <td>S/ ${op.total.toFixed(2)}</td>

                <td class="acciones">

    <button
        class="btn-eliminar"
        onclick="eliminarVenta('${op.id}')"
    >
        🗑️
    </button>

</td>

                 </td>

            </tr>

            `;
        }

    });

}

async function eliminarVenta(id) {

    console.log("ELIMINANDO:", id);

    const confirmar = confirm(
        "¿Deseas eliminar esta venta?"
    );

    if (!confirmar) return;

    let operaciones = await obtenerOperacionesSheets();

    const venta = operaciones.find(
        op => op.id === id
    );

    if (!venta) return;

    if (venta.lotesUsados) {

        venta.lotesUsados.forEach(lote => {

            const compra = operaciones.find(
                op => op.id === lote.idCompra
            );

            if (compra) {

                compra.disponible += lote.cantidad;

            }

        });

    }

    operaciones = operaciones.filter(
        op => op.id !== id
    );

fetch(
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec",
    {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({

            tipo: "EliminarVenta",

            id: venta.id,

            fecha: venta.fecha,

            cliente: venta.cliente

        })
    }
);

    actualizarOperaciones(operaciones);

    cargarVentas();

    alert(
        "✅ Venta eliminada y USDT recuperados."
    );

}


async function editarVenta(id) {

    const operaciones = await obtenerOperacionesSheets();

    const venta = operaciones.find(
        op => op.id === id
    );
    console.log("Venta encontrada:", venta);
console.log("Lotes usados:", venta?.lotesUsados);

    if (!venta) return;

    const nuevasOperaciones = operaciones.filter(
        op => op.id !== id
    );

    actualizarOperaciones(nuevasOperaciones);

    localStorage.setItem(
        "operacionEditar",
        JSON.stringify(venta)
    );

    window.location.reload();
}
const operacionEditar = JSON.parse(
    localStorage.getItem("operacionEditar")
);
let editandoId = null;

if (

    operacionEditar &&
    operacionEditar.tipo === "Venta"

) {

    editandoId = operacionEditar.id;

}
if (

    operacionEditar &&
    operacionEditar.tipo === "Venta"

) {

    document.getElementById("fechaVenta").value

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
cargarVentas();

window.editarVenta = editarVenta;
window.eliminarVenta = eliminarVenta;



const configuracion = JSON.parse(
    localStorage.getItem(
        "configuracion"
    )
);

const nombreEmpresaVentas =
    document.getElementById(
        "nombreEmpresaVentas"
    );

if (
    configuracion &&
    nombreEmpresaVentas
) {

    nombreEmpresaVentas.textContent =
        configuracion.empresa;

}