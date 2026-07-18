const usuarioActual = JSON.parse(
    localStorage.getItem(
        "usuarioActual"
    )
);

if (!usuarioActual) {

    window.location.href =
        "../pages/login.html";

}