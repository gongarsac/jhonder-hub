function obtenerLotesDisponibles() {

    const operaciones = obtenerOperaciones();

    return operaciones.filter(op =>
        op.tipo === "Compra" &&
        Number(op.disponible) > 0
    );

}

function consumirFIFO(cantidadVenta) {

    let lotes = obtenerLotesDisponibles();

    let restante = cantidadVenta;

    let usados = [];

    for (let lote of lotes) {

        if (restante <= 0) break;

        let disponible = Number(lote.disponible);

        let usar = Math.min(disponible, restante);

        usados.push({
            id: lote.id,
            cantidad: usar,
            precio: lote.precio
        });

        lote.disponible = disponible - usar;

        restante -= usar;

    }

    let operaciones = obtenerOperaciones();

    lotes.forEach(lote => {

        let indice = operaciones.findIndex(op => op.id === lote.id);

        if (indice !== -1) {
            operaciones[indice] = lote;
        }

    });

    actualizarOperaciones(operaciones);

    return usados;

}