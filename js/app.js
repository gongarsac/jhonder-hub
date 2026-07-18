const URL_API = "https://script.google.com/macros/s/AKfycbzcHOHVuDROdxvb6KuuTTeCxarXRv6CaNu0p-JU2oByjiu_3ZYJJhDyKl-tLUmvoyUXTw/exec";

async function login() {

    const correo = document.getElementById("correo").value;

    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch(URL_API);

        const datos = await respuesta.json();

        const usuario = datos.usuarios.find(

            u =>
                u.correo === correo &&
                u.password === password

        );

        if (usuario) {

            localStorage.setItem(
                "usuarioActual",
                JSON.stringify(usuario)
            );

            window.location.href =
                "pages/dashboard.html";

        } else {

            alert(
                "Correo o contraseña incorrectos"
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "Error al conectar con la base de datos"
        );

    }

}