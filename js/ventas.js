window.addEventListener("DOMContentLoaded", () => {

document.getElementById("formVenta").addEventListener("submit", function (e) {
    e.preventDefault();

    const cantidadVenta = Number(
        document.getElementById("cantidad").value
    );

    const resultadoFIFO = procesarFIFO(cantidadVenta);

    if (!resultadoFIFO) {
        return;
    }

    const totalVenta = Number(
        document.getElementById("total").value
    );

    const venta = {

        id: generarId("VT"),

        tipo: "Venta",

        fecha: document.getElementById("fecha").value,

        cliente: document.getElementById("cliente").value,

        banco: document.getElementById("banco").value,

        cantidad: cantidadVenta,

        precio: Number(
            document.getElementById("precio").value
        ),

        total: totalVenta,

        costoFIFO: resultadoFIFO.costoTotal,

        ganancia: totalVenta - resultadoFIFO.costoTotal,

lotesUsados: resultadoFIFO.lotesUsados

    };

    agregarOperacion(venta);

    cargarVentas();

    alert(

        "✅ Venta guardada correctamente\n\n" +

        "Costo FIFO: S/ " +

        resultadoFIFO.costoTotal.toFixed(2) +

        "\nGanancia: S/ " +

        venta.ganancia.toFixed(2)

    );

    this.reset();

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

function cargarVentas() {

    const operaciones = obtenerOperaciones();

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

                <td>S/ ${op.precio.toFixed(4)}</td>

                <td>S/ ${op.costoFIFO.toFixed(2)}</td>

                <td style="color:#22c55e;font-weight:bold;">

                    S/ ${op.ganancia.toFixed(2)}

                </td>

                <td>S/ ${op.total.toFixed(2)}</td>

                <td class="acciones">

                    <button
                        class="btn-editar"
                        onclick="editarVenta('${op.id}')"
                    >

                        ✏️

                    </button>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarVenta('${op.id}')"
                    >

                        🗑️

                    </button>

                </td>

            </tr>

            `;
        }

    });

}

function eliminarVenta(id) {

    const confirmar = confirm(

        "¿Deseas eliminar esta venta?"

    );

    if (!confirmar) return;

    let operaciones = obtenerOperaciones();

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

    actualizarOperaciones(operaciones);

    cargarVentas();

    alert(

        "✅ Venta eliminada y USDT recuperados."

    );

}

function editarVenta(id) {

    const operaciones = obtenerOperaciones();

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

    document.getElementById("fecha").value =

        venta.fecha;

    document.getElementById("cliente").value =

        venta.cliente;

    document.getElementById("banco").value =

        venta.banco;

    document.getElementById("cantidad").value =

        venta.cantidad;

    document.getElementById("precio").value =

        venta.precio;

    document.getElementById("total").value =

        venta.total;

    const nuevasOperaciones = operaciones.filter(

        op => op.id !== id

    );

    actualizarOperaciones(

        nuevasOperaciones

    );

    cargarVentas();

    alert(

        "✏️ Venta cargada para editar."

    );

}
const operacionEditar = JSON.parse(
    localStorage.getItem("operacionEditar")
);

if (

    operacionEditar &&
    operacionEditar.tipo === "Venta"

) {

    document.getElementById("fecha").value =

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
});