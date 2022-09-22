function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const contraseña1 = document.getElementById("password1");
const contraseña2 = document.getElementById("password2");
const terminos = document.getElementById("terminos");
const boton = document.getElementById("regBtn");

const inputs = [nombre, apellido, email, contraseña1, contraseña2,];

boton.addEventListener("click", () => {
    inputs.forEach((input) => {
        if(input.value === "") {
            return showAlertError();
        }
        if(contraseña1.value.length < 6 || contraseña2.value.length < 6) {
            return showAlertError();
        }
        if(!(contraseña1.value === contraseña2.value)) {
            return showAlertError();
        }
        if(!terminos.checked) {
            return showAlertError();
        } else {
            return showAlertSuccess();
        }

    })
})

inputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        if(input.value === "") {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(!(input.value === "")) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        if(input.value.length < 6 && input === contraseña1) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(input.value.length < 6 && input === contraseña2) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(input.value.length >= 6 && input === contraseña1) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        if(input.value.length >= 6 && input === contraseña2) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    })
    input.addEventListener("blur", () => {
        if(input.value === "") {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(!(input.value === "")) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        if(input.value.length < 6 && input === contraseña1) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(input.value.length < 6 && input === contraseña2) {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
        if(input.value.length >= 6 && input === contraseña1) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        if(input.value.length >= 6 && input === contraseña2) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    })
})

