function verDiasGuardados() {

    const historialDias = JSON.parse(

        localStorage.getItem("historialDias")

    ) || [];

    const anio = document.getElementById(
        "filtroAnio"
    ).value;

    const mes = document.getElementById(
        "filtroMes"
    ).value;

    let diasFiltrados = historialDias;

    if (anio !== "") {

        diasFiltrados = diasFiltrados.filter(

            dia => dia.fecha.split("-")[0] === anio

        );

    }

    if (mes !== "") {

        diasFiltrados = diasFiltrados.filter(

            dia => dia.fecha.split("-")[1] === mes

        );

    }

    const contenedor = document.getElementById(

        "listaDiasCerrados"

    );

    contenedor.innerHTML = "";

    if (diasFiltrados.length === 0) {

        contenedor.innerHTML = `

            <p>No hay días guardados.</p>

        `;

        return;
    }

    diasFiltrados.forEach(dia => {

        contenedor.innerHTML += `

            <div class="dia-cerrado"
                 onclick="abrirDia('${dia.fecha}')">

                <h3>📅 ${dia.fecha}</h3>

                <p>Operaciones: ${dia.operaciones.length}</p>

                <p>Ganancia: S/ ${Number(
                    dia.ganancia || 0
                ).toFixed(2)}</p>

                <p>USDT vendidos:
                    ${Number(
                        dia.vendidos || 0
                    ).toFixed(2)}
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

    selectAnio.addEventListener("change", () => {

        selectMes.innerHTML = `

            <option value="">
                Seleccionar mes
            </option>

        `;

        const meses = [

            ...new Set(

                historialDias

                    .filter(

                        dia =>

                            dia.fecha.split("-")[0] ===

                            selectAnio.value

                    )

                    .map(

                        dia => dia.fecha.split("-")[1]

                    )

            )

        ];

        meses.forEach(mes => {

            selectMes.innerHTML += `

                <option value="${mes}">
                    ${mes}
                </option>

            `;

        });

    });

}

cargarFiltrosHistorial();

verDiasGuardados();
function abrirDia(fecha) {

    const historialDias = JSON.parse(
        localStorage.getItem("historialDias")
    ) || [];

    const dia = historialDias.find(
        item => item.fecha === fecha
    );

    if (!dia) {
        return;
    }

    const contenedor = document.getElementById(
        "contenedorHistorial"
    );

    contenedor.innerHTML = `
        <div class="card">
            <h2>📅 Operaciones del ${fecha}</h2>

            <table class="tabla-historial">

                <thead>

                    <tr>
                        <th>Tipo</th>
                        <th>Cliente</th>
                        <th>Banco</th>
                        <th>USDT</th>
                        <th>Total</th>
                    </tr>

                </thead>

                <tbody>

                    ${dia.operaciones.map(op => `
                        <tr>
                            <td>${op.tipo}</td>
                            <td>${op.cliente}</td>
                            <td>${op.banco}</td>
                            <td>${op.cantidad}</td>
                            <td>S/ ${op.total}</td>
                        </tr>
                    `).join("")}

                </tbody>

            </table>

        </div>
    `;
}