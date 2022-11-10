//Script para iniciar sesion desde cualquier lugar
//DOM
document.addEventListener('DOMContentLoaded', ()=>{
    let email = sessionStorage.getItem('email');
    if(email == null){
        Swal.fire({
            title: "Usted no ha iniciado sesion",
            icon: 'warning',
            confirmButtonText: 'Iniciar Sesion'
        }).then((result) => {
            if (result.isConfirmed) {
              window.location = "login.html"
            }
        })
    }
    else {
        document.getElementById('cerrar').style.display = 'block';
        document.getElementById('email').innerHTML = email.split('@')[0];
    }

    document.getElementById("cerrar").addEventListener("click", () => {
        Swal.fire({
            title: "Usted ha cerrado sesion",
            icon: 'warning',
            confirmButtonText: 'Volver a iniciar'
        }).then((result) => {
            if (result.isConfirmed) {
              window.location = "login.html"
            }
        })
        sessionStorage.clear();
        localStorage.clear()
        
    });
});