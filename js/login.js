function login () {
    let usuario = document.getElementById('usuario').value;
    let forms = document.querySelectorAll('.needs-validation') // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
      
    // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              } else {
                event.preventDefault()
                event.stopPropagation()
                sessionStorage.setItem('usuario', usuario);
                Swal.fire({
                    title: "Inicio de sesion correcto",
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton:false
                }).then(() => {
              window.location = "index.html"
                })
              }
      
              form.classList.add('was-validated')
            }, false)
          })
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })
})
