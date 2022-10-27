document.addEventListener('DOMContentLoaded', ()=>{
    let usuario = sessionStorage.getItem('usuario');
    if(usuario == null){
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
        document.getElementById('usuario').innerHTML = usuario;
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
        
    });
});