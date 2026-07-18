const URL_API =
    "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec";

async function iniciarSesion() {

    const correo = document
        .getElementById("correo")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const respuesta = await fetch(URL_API);

    const datos = await respuesta.json();

    const usuario = datos.usuarios.find(

        u =>

            u.correo === correo &&
            u.password === password

    );

    if (!usuario) {

        alert(

            "Correo o contraseña incorrectos"

        );

        return;

    }

    localStorage.setItem(

        "usuarioActual",

        JSON.stringify(usuario)

    );

    window.location.href =
        "../pages/dashboard.html";

}