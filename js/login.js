//Funcion para logearse y para que ande la validacion
function login () {
    let email = document.getElementById('email').value;
    let forms = document.querySelectorAll('.needs-validation') // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
      
    // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
          .forEach(function (form) {
            form.addEventListener('submit', function (event) {
              if (!expEmail() || !form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
              } else {
                event.preventDefault()
                event.stopPropagation()
                sessionStorage.setItem('email', email);
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

//Funcion para las expresiones del email en las validaciones
function expEmail(){
  let validity = true;
  let expresionRegular = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; 
  let correo = document.getElementById('email');

  if(expresionRegular.test(correo.value)){
    correo.setCustomValidity('')
  } else {
    correo.setCustomValidity(false)
    validity=false;
  }
  return validity

}

//Dom con eventos input y click para el metodo logear y las expresiones de email.
document.addEventListener('DOMContentLoaded', ()=>{
  
    document.getElementById('email').addEventListener('input',()=>{
    expEmail();
    })
    document.getElementById('inicio').addEventListener('click',()=>{
      login();
    })
    
})
