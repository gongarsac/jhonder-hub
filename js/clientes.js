const URL_API = "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec";

document.getElementById("formCliente").addEventListener("submit", async function (e) {

    e.preventDefault();

    const cliente = {

        tipo: "Cliente",

        id: generarId("CL"),

        nombre: document.getElementById("nombre").value,

        dni: document.getElementById("dni").value,

        telefono: document.getElementById("telefono").value,

        banco: document.getElementById("banco").value

    };

    // Guardar localmente

    const clientes = obtenerClientes();

    clientes.push(cliente);

    guardarClientes(clientes);

    // Guardar en Google Sheets

    fetch(URL_API, {

        method: "POST",

        mode: "no-cors",

        body: JSON.stringify(cliente)

    });

    cargarClientes();

    alert("✅ Cliente guardado correctamente");

    this.reset();

});

function obtenerClientes() {

    const datos = localStorage.getItem("clientes");

    if (datos) {

        return JSON.parse(datos);

    }

    return [];

}

function guardarClientes(clientes) {

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );

}

function cargarClientes() {

    const clientes = obtenerClientes();

    const tbody = document.querySelector(

        "#tablaClientes tbody"

    );

    tbody.innerHTML = "";

    clientes.forEach(cliente => {

        tbody.innerHTML += `

        <tr>

            <td>${cliente.nombre}</td>

            <td>${cliente.dni}</td>

            <td>${cliente.telefono}</td>

            <td>${cliente.banco}</td>

            <td class="acciones">

                <button
                    class="btn-eliminar"
                    onclick="eliminarCliente('${cliente.id}')"
                >

                    🗑️

                </button>

            </td>

        </tr>

        `;

    });

}

function eliminarCliente(id) {

    const confirmar = confirm(

        "¿Eliminar cliente?"

    );

    if (!confirmar) return;

    let clientes = obtenerClientes();

    clientes = clientes.filter(

        cliente => cliente.id !== id

    );

    guardarClientes(clientes);

    cargarClientes();

}

cargarClientes();