function cargarHistorial(lista = null) {

    const operaciones = lista || obtenerOperaciones();

    const tbody = document.querySelector(
        "#tablaHistorial tbody"
    );

    tbody.innerHTML = "";

    let compras = 0;

    let ventas = 0;

    let ganancia = 0;

    operaciones.forEach(op => {

        if (op.tipo === "Compra") {

            compras += op.cantidad;

        }

        if (op.tipo === "Venta") {

            ventas += op.cantidad;

            ganancia += op.ganancia || 0;

        }

        tbody.innerHTML += `

<tr>

    <td>${op.tipo}</td>

    <td>${op.fecha}</td>

    <td>${op.cliente}</td>

    <td>${op.banco}</td>

    <td>${op.cantidad.toFixed(2)}</td>

    <td>S/ ${op.precio.toFixed(4)}</td>

    <td>S/ ${op.total.toFixed(2)}</td>

    <td class="acciones">

        <button
            class="btn-editar"
            onclick="editarDesdeHistorial('${op.id}')"
        >
            ✏️
        </button>

        <button
            class="btn-eliminar"
            onclick="eliminarDesdeHistorial('${op.id}')"
        >
            🗑️
        </button>

    </td>

</tr>
`;

    });

    document.getElementById("resumenCompras").textContent =

        compras.toFixed(2) + " USDT";

    document.getElementById("resumenVentas").textContent =

        ventas.toFixed(2) + " USDT";

    document.getElementById("resumenGanancia").textContent =

        "S/ " + ganancia.toFixed(2);

    document.getElementById("resumenOperaciones").textContent =

        operaciones.length;

}

function filtrarHistorial() {

    const inicio = document.getElementById(
        "fechaInicio"
    ).value;

    const fin = document.getElementById(
        "fechaFin"
    ).value;

    const operaciones = obtenerOperaciones();

    const filtradas = operaciones.filter(op => {

        return op.fecha >= inicio &&
               op.fecha <= fin;

    });

    cargarHistorial(filtradas);

}

function buscarCliente() {

    const texto = document
        .getElementById("buscarCliente")
        .value
        .toLowerCase();

    const operaciones = obtenerOperaciones();

    const filtradas = operaciones.filter(op => {

        return op.cliente
            .toLowerCase()
            .includes(texto);

    });

    cargarHistorial(filtradas);

}

cargarHistorial();
function exportarExcel() {

    const operaciones = obtenerOperaciones();

    const datos = operaciones.map(op => ({

        Tipo: op.tipo,

        Fecha: op.fecha,

        Cliente: op.cliente,

        Banco: op.banco,

        USDT: op.cantidad,

        Precio: op.precio,

        Total: op.total,

        Ganancia: op.ganancia || 0

    }));

    const hoja = XLSX.utils.json_to_sheet(datos);

    const libro = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

        libro,

        hoja,

        "Historial"

    );

    XLSX.writeFile(

        libro,

        "Historial_Jhonder_Capital.xlsx"

    );

}
function eliminarDesdeHistorial(id) {
    function editarDesdeHistorial(id) {

    const operaciones = obtenerOperaciones();

    const operacion = operaciones.find(
        op => op.id === id
    );

    if (!operacion) {

        alert("No se encontró la operación.");

        return;
    }

    localStorage.setItem( 
        "operacionEditar",
        JSON.stringify(operacion)
    );

    if (operacion.tipo === "Compra") {

        window.location.href =
            "../pages/compras.html";

    } else {

        window.location.href =
            "../pages/ventas.html";

    }

}
    function editarDesdeHistorial(id) {

    const operaciones = obtenerOperaciones();

    const operacion = operaciones.find(

        op => op.id === id

    );

    if (!operacion) return;

    localStorage.setItem(

        "operacionEditar",

        JSON.stringify(operacion)

    );

    if (operacion.tipo === "Compra") {

        window.location.href =

            "compras.html";

    }

    if (operacion.tipo === "Venta") {

        window.location.href =

            "ventas.html";

    }

}

    const confirmar = confirm(
        "¿Eliminar esta operación?"
    );

    if (!confirmar) return;

    let operaciones = obtenerOperaciones();

    const operacion = operaciones.find(
        op => op.id === id
    );

    if (!operacion) return;

    if (
        operacion.tipo === "Venta" &&
        operacion.lotesUsados
    ) {

        operacion.lotesUsados.forEach(lote => {

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

    actualizarOperaciones(
        operaciones
    );

    cargarHistorial();

    alert(
        "✅ Operación eliminada correctamente."
    );

}
function editarDesdeHistorial(id) {

    const operaciones = obtenerOperaciones();

    const operacion = operaciones.find(
        op => op.id === id
    );

    if (!operacion) {

        alert("No se encontró la operación");

        return;
    }

    localStorage.setItem(
        "operacionEditar",
        JSON.stringify(operacion)
    );

    if (operacion.tipo === "Compra") {

        window.location.href = "compras.html";

    } else {

        window.location.href = "ventas.html";

    }

}