const URL_API = "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec";

function guardarGasto() {

    const concepto = document.getElementById(
        "conceptoGasto"
    ).value;

    const monto = Number(
        document.getElementById(
            "montoGasto"
        ).value
    );

    const observacion = document.getElementById(
        "observacionGasto"
    ).value;

    if (!concepto || monto <= 0) {

        alert(
            "Completa todos los campos"
        );

        return;

    }

    const gasto = {

        tipo: "Gasto",

        fecha: new Date()
            .toLocaleDateString(
                "es-PE"
            ),

        concepto: concepto,

        monto: monto,

        observacion: observacion

    };

    fetch(URL_API, {

        method: "POST",

        mode: "no-cors",

        body: JSON.stringify(gasto)

    });

    let operaciones = JSON.parse(
        localStorage.getItem(
            "operaciones"
        )
    ) || [];

    operaciones.push(gasto);

    localStorage.setItem(
        "operaciones",
        JSON.stringify(
            operaciones
        )
    );

    alert(
        "Gasto guardado correctamente"
    );

    document.getElementById(
        "conceptoGasto"
    ).value = "";

    document.getElementById(
        "montoGasto"
    ).value = "";

    document.getElementById(
        "observacionGasto"
    ).value = "";

}
function cargarGastos() {

    const operaciones = JSON.parse(
        localStorage.getItem("operaciones")
    ) || [];

    const tabla = document.getElementById(
        "tablaGastos"
    );

    tabla.innerHTML = "";

    const gastos = operaciones.filter(
        op => op.tipo === "Gasto"
    );

    gastos.forEach(gasto => {

        tabla.innerHTML += `

            <tr>

                <td>${gasto.fecha}</td>

                <td>${gasto.concepto}</td>

                <td>S/ ${Number(gasto.monto).toFixed(2)}</td>

                <td>${gasto.observacion}</td>

            </tr>

        `;

    });

}

cargarGastos();