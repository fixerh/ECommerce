document.addEventListener('DOMContentLoaded', ()=>{
    let usuario = sessionStorage.getItem('usuario');
    if(usuario == null){
        alert('No iniciaste sesion, porfavor iniciar sesion para continuar navegando')
        location.href='login.html';
    }
    else {
        document.getElementById('cerrar').style.display = 'block';
        document.getElementById('usuario').innerHTML = usuario;
    }

    document.getElementById("cerrar").addEventListener("click", () => {
        alert('Sesion Cerrada');
        sessionStorage.clear();
        location.href = 'login.html';
    });
});