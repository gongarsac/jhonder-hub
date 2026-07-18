// =========================================
// JHONDER CAPITAL S.A.C. - STORAGE
// =========================================

const URL_API =
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec";


// =========================================
// OBTENER OPERACIONES DESDE GOOGLE SHEETS
// =========================================

async function obtenerOperacionesSheets() {

    const respuesta = await fetch(URL_API);

    const datos = await respuesta.json();

    const compras = datos.compras.map(fila => ({

        id: fila[0],
        tipo: "Compra",
        fecha: fila[1],
        cliente: fila[2],
        banco: fila[3],
        cantidad: Number(fila[4]),
        precio: Number(fila[5]),
        total: Number(fila[6]),
        disponible: Number(fila[7])

    }));

    const ventas = datos.ventas.map(fila => ({

        id: fila[0],
        tipo: "Venta",
        fecha: fila[1],
        cliente: fila[2],
        banco: fila[3],
        cantidad: Number(fila[4]),
        precio: Number(fila[5]),
        total: Number(fila[6]),
        ganancia: Number(fila[7])

    }));

    const gastos = datos.gastos.map(fila => ({

        tipo: "Gasto",
        fecha: fila[0],
        concepto: fila[1],
        monto: Number(fila[2]),
        observacion: fila[3]

    }));

   const operaciones = [

    ...compras,
    ...ventas,
    ...gastos

];

localStorage.setItem(

    "cacheOperaciones",

    JSON.stringify(operaciones)

);

return operaciones;

}


// =========================================
// LOCAL STORAGE
// =========================================

function obtenerOperaciones() {

    const datos = localStorage.getItem("operaciones");

    if (datos) {

        return JSON.parse(datos);

    }

    return [];

}


function guardarOperaciones(operaciones) {

    localStorage.setItem(

        "operaciones",
        JSON.stringify(operaciones)

    );

}


function agregarOperacion(operacion) {

    const operaciones = obtenerOperaciones();

    operaciones.push(operacion);

    guardarOperaciones(operaciones);

}


function actualizarOperaciones(operaciones) {

    guardarOperaciones(operaciones);

}


// =========================================
// IDS
// =========================================

function generarId(prefijo) {

    let contador = localStorage.getItem(prefijo);

    if (!contador) {

        contador = 1;

    } else {

        contador = Number(contador) + 1;

    }

    localStorage.setItem(prefijo, contador);

    return (

        prefijo +
        "-" +
        String(contador).padStart(6, "0")

    );

}


// =========================================
// ELIMINAR COMPRA
// =========================================

function eliminarCompra(id) {

    const confirmar = confirm(

        "¿Deseas eliminar esta compra?"

    );

    if (!confirmar) return;

    let operaciones = obtenerOperaciones();

    operaciones = operaciones.filter(

        operacion => operacion.id !== id

    );

    actualizarOperaciones(operaciones);

    cargarCompras();

}


// =========================================
// FIFO
// =========================================

function procesarFIFO(cantidadVenta) {

    const operaciones = obtenerOperaciones();

    let restante = cantidadVenta;

    let costoTotal = 0;

    const lotesUsados = [];

    for (let operacion of operaciones) {

        if (

            operacion.tipo === "Compra" &&
            operacion.disponible > 0

        ) {

            const usar = Math.min(

                restante,
                operacion.disponible

            );

            costoTotal += usar * operacion.precio;

            lotesUsados.push({

                idCompra: operacion.id,

                cantidad: usar

            });

            operacion.disponible -= usar;

            restante -= usar;

            if (restante <= 0) {

                break;

            }

        }

    }

    if (restante > 0) {

        alert(

            "No tienes suficientes USDT disponibles."

        );

        return null;

    }

    actualizarOperaciones(operaciones);

    return {

        costoTotal,

        costoUnitario:

            costoTotal / cantidadVenta,

        lotesUsados

    };

}