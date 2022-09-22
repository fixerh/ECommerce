function login () {
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;

    if (usuario ==="" || contraseña ==="") {
        document.getElementById('usuario').classList.add('incompleto');
        document.getElementById('contraseña').classList.add('incompleto');
        alert ("debe ingresar Usuario y Contraseña ");
        
    }
    else {
        sessionStorage.setItem('usuario', usuario);
        location.href='index.html';
    }

}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })
})
