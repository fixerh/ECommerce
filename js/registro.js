function validacion(){
    let contraseña = document.getElementById('password1');
    let reContraseña = document.getElementById('password2');
    let term = document.getElementById('terminos');
    let validity = true;
    let expresionRegular = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i; 
    let correo = document.getElementById('email');
  
    if(expresionRegular.test(correo.value)){
      correo.setCustomValidity('');
    } else {
      correo.setCustomValidity(false)
      validity=false;
    }
  
    if (contraseña.value !== reContraseña.value || !contraseña.checkValidity()) {
      reContraseña.setCustomValidity(false);
      validity = false;
    } else {
      reContraseña.setCustomValidity('');
    }
  
    if (!term.checked) {
      validity = false;
      document.getElementById('btn-terminos').classList.add('invalid-color');
      document.getElementById('term-invalid').style.display = 'inline';
      document.getElementById('btn-terminos').classList.add('text-danger');
    } else {
      document.getElementById('btn-terminos').classList.remove('invalid-color');
      document.getElementById('term-invalid').style.display = 'none';
      document.getElementById('btn-terminos').classList.remove('text-danger');
    }
  
    return validity
  }
  
    //el this es para evitar poner document.getElementById('formulario') 
    document.getElementById('formulario').addEventListener('submit', function(e){
      if(!validacion() || !this.checkValidity()){
        e.preventDefault()
        e.stopPropagation()
      }else {
        e.preventDefault()
        e.stopPropagation()
        Swal.fire({
            title: "Registro Correcto",
            icon: 'success',
            timer: 1500,
            showConfirmButton:false
        }).then(() => {
      window.location = "index.html"
        })
      }
  
      document.body.classList.add('was-validated');
    
      let eventos=['change','input'];
  
      eventos.forEach(evento =>{document.body.addEventListener(evento,validacion)})
    
    })