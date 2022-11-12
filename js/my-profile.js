let informacionUsuario = {};

function guardarDatos(){ 
    informacionUsuario.nombre = document.getElementById("nombre").value;
    informacionUsuario.sNombre = document.getElementById("sNombre").value;
    informacionUsuario.apellido = document.getElementById("apellido").value;
    informacionUsuario.sApellido = document.getElementById("sApellido").value;
    informacionUsuario.telefono = document.getElementById("telefono").value;
    informacionUsuario.pais = document.getElementById("pais").value;
    informacionUsuario.departamento = document.getElementById("departamento").value;
    informacionUsuario.Imagen = document.getElementById("imgCargada").src;
    

    
    localStorage.setItem("informacion", JSON.stringify(informacionUsuario));
}

function checkDatos(){
    
    let infoRecibida = JSON.parse(localStorage.getItem("informacion"));

    //En caso de que el objeto no sea nulo se muestra el valor de cada elemento. De lo contrario se coloca una imagen "perfil"

    if(infoRecibida !== null){

        document.getElementById("nombre").value = infoRecibida.nombre;
        document.getElementById("sNombre").value = infoRecibida.sNombre;
        document.getElementById("apellido").value = infoRecibida.apellido;
        document.getElementById("sApellido").value = infoRecibida.sApellido;
        document.getElementById("telefono").value = infoRecibida.telefono;
        document.getElementById("pais").value = infoRecibida.pais;
        document.getElementById("departamento").value = infoRecibida.departamento;
        document.getElementById("imgCargada").src = infoRecibida.Imagen;

    
    }else{
  
        document.getElementById("imgCargada").src = "img/perfil.png";
    
    }

}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
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
            guardarDatos()
            Swal.fire({
                position: 'top-center',
                imageUrl: 'img/perfilsaved.gif',
                title: 'Datos Guardados Exitosamente',
                showConfirmButton: false,
                timer: 2500
              }).then(() => {
                window.location = "my-profile.html"
                })
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

//DOM
document.addEventListener("DOMContentLoaded", ()=> {
    checkDatos();

    //Para mostrar tu email de usuario en el perfil
    let email = sessionStorage.getItem('email');
    document.getElementById('emailPerfil').value = email
    document.getElementById('usuario').innerHTML = email.split('@')[0]

    //Evento change para cargar y mostrar la imagen
    document.getElementById("imgAgregada").addEventListener("change", () => {

    let imagen = document.getElementById("imgCargada");
    let imgAgregada = document.getElementById("imgAgregada").files[0];
    let fileReader = new FileReader();

    if(imgAgregada){
        fileReader.readAsDataURL(imgAgregada);
        //readAsDataURL:Comienza a leer el contenido del archivo especificado de tipo texto o Binario, una vez terminado
        //el result atributo contiene una data:URL que representa los datos del archivo.
        // convierte la imagen a una cadena en base64
    }else{
        imagen.src = "img/perfil.png";
    }

    fileReader.addEventListener("load", () => {
        imagen.src = fileReader.result;
    })
    })
});