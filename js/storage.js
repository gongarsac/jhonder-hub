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

    console.log(datos);

    const compras = datos.compras.map(fila => ({

        id: fila[0],
        tipo: "Compra",
        fecha: fila[1].split("T")[0],
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
    fecha: fila[1].split("T")[0],
    cliente: fila[2],
    banco: fila[3],
    cantidad: Number(fila[4]),
    precio: Number(fila[5]),
    costoFIFO: Number(fila[6]),
    total: Number(fila[7]),
    ganancia: Number(fila[8])

}));

    const gastos = datos.gastos
    ? datos.gastos.map(fila => ({
        tipo: "Gasto",
        fecha: fila[0],
        concepto: fila[1],
        monto: Number(fila[2]),
        observacion: fila[3]
    }))
    : [];

   const operaciones = [

    ...compras,
    ...ventas,
    ...gastos

];

const cache = {

    operaciones,
    actualizado: Date.now()

};
localStorage.setItem(

    "cacheOperaciones",

    JSON.stringify(cache)
);


return operaciones;

}


// =========================================
// LOCAL STORAGE
// =========================================

function obtenerOperaciones() {

    const cache = JSON.parse(

        localStorage.getItem("cacheOperaciones")

    );

    return cache?.operaciones || [];

}

function guardarOperaciones(operaciones) {

    const cache = {

        operaciones,
        actualizado: Date.now()

    };

    localStorage.setItem(

        "cacheOperaciones",

        JSON.stringify(cache)

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

 async function procesarFIFO(cantidadVenta) {

    const operaciones = await obtenerOperacionesSheets();

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

    cantidad: usar,

    nuevoDisponible: operacion.disponible - usar

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