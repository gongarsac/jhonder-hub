function login() {

    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;

    if (correo === "gonzajhonder@gmail.com" && password === "Jhonder7599") {

      window.location.href = "pages/dashboard.html";

    } else {

        alert("Correo o contraseña incorrectos");

    }

}