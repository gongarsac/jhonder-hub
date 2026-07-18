const usuarioActual = JSON.parse(
    localStorage.getItem(
        "usuarioActual"
    )
);

if (!usuarioActual) {

    window.location.href =
        "../pages/login.html";

}

const rol = usuarioActual.rol;

if (

    rol === "Analista financiero" ||

    rol === "Gerente General"

) {

    const configuracion =
        document.querySelector(
            'a[href="configuracion.html"]'
        );

    const gastos =
        document.querySelector(
            'a[href="gastos.html"]'
        );

    if (configuracion) {

        configuracion.style.display =
            "none";

    }

    if (gastos) {

        gastos.style.display =
            "none";

    }

}