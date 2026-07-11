// =========================================
// JHONDER CAPITAL S.A.C. - STORAGE
// =========================================

// Obtener todas las operaciones
function obtenerOperaciones() {

    const datos = localStorage.getItem("operaciones");

    if (datos) {

        return JSON.parse(datos);

    }

    return [];
}

// Guardar operaciones
function guardarOperaciones(operaciones) {

    localStorage.setItem(
        "operaciones",
        JSON.stringify(operaciones)
    );

}

// Agregar operación
function agregarOperacion(operacion) {

    const operaciones = obtenerOperaciones();

    operaciones.push(operacion);

    guardarOperaciones(operaciones);

}

// Actualizar operaciones
function actualizarOperaciones(operaciones) {

    guardarOperaciones(operaciones);

}

// Generar ID
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

// Eliminar operación
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

// FIFO
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