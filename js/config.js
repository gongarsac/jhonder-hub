function exportarDatos() {

    const datos = localStorage.getItem("operaciones");

    const blob = new Blob(

        [datos],

        {

            type: "application/json"

        }

    );

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);

    enlace.download = "respaldo-jhonder-capital.json";

    enlace.click();

}

function importarDatos() {

    const archivo = document.getElementById(
        "archivoBackup"
    ).files[0];

    if (!archivo) {

        alert("Selecciona un archivo.");

        return;

    }

    const lector = new FileReader();

    lector.onload = function (e) {

        localStorage.setItem(

            "operaciones",

            e.target.result

        );

        alert("✅ Respaldo restaurado.");

        location.reload();

    };

    lector.readAsText(archivo);

}

function borrarTodo() {

    const confirmar = confirm(

        "¿Seguro que quieres borrar todo?"

    );

    if (!confirmar) return;

    localStorage.clear();

    alert("Datos eliminados.");

    location.reload();

}
function guardarConfiguracion() {

    const configuracion = {

        empresa: document.getElementById("empresa").value,

        moneda: document.getElementById("moneda").value,

        capitalInicial: Number(
            document.getElementById(
                "capitalInicial"
            ).value
        )
        

    };
    

    localStorage.setItem(

        "configuracion",

        JSON.stringify(configuracion)

    );

    localStorage.setItem(

        "capitalInicial",

        configuracion.capitalInicial

    );

    alert("✅ Configuración guardada");

}


function cargarConfiguracion() {

    const datos = JSON.parse(

        localStorage.getItem(
            "configuracion"
        )

    );

    if (!datos) return;

    document.getElementById(
        "empresa"
    ).value = datos.empresa || "";

    document.getElementById(
        "moneda"
    ).value = datos.moneda || "S/";

    document.getElementById(
        "capitalInicial"
    ).value = datos.capitalInicial || 0;

}
function reiniciarSistema() {

    const confirmar = confirm(

        "⚠️ Se eliminarán todas las operaciones."

    );

    if (!confirmar) return;

    localStorage.clear();

    alert("✅ Sistema reiniciado");

    location.reload();

}

cargarConfiguracion();
function exportarDatos() {

    const datos = localStorage.getItem(
        "operaciones"
    );

    const archivo = new Blob(

        [datos],

        {

            type: "application/json"

        }

    );

    const enlace = document.createElement(
        "a"
    );

    enlace.href = URL.createObjectURL(
        archivo
    );

    enlace.download =

        "respaldo-jhonder-capital.json";

    enlace.click();

}

function importarDatos() {

    const archivo = document.getElementById(
        "archivoBackup"
    ).files[0];

    if (!archivo) {

        alert(
            "Selecciona un archivo."
        );

        return;
    }

    const lector = new FileReader();

    lector.onload = function (e) {

        localStorage.setItem(

            "operaciones",

            e.target.result

        );

        alert(
            "✅ Respaldo restaurado."
        );

        location.reload();

    };

    lector.readAsText(archivo);

}
function cerrarSesion() {

    localStorage.removeItem("usuarioActivo");

    window.location.href = "../pages/login.html";

}