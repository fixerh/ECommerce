let peugeot= 'https://japceibal.github.io/emercado-api/user_cart/25801.json'; //JSON del elemento principal
let porcentaje = document.getElementsByName('tipoDeEnvio'); // Variable para llamar los input por el name
let borrar = document.getElementsByClassName('borrar'); // Variable utilizada para borrar
let carritoId= localStorage.getItem('carrito') //Variable que obtiene informacion desde la ID carrito
let tarjeta = document.getElementById('tarjetaCredito');// Variable que obtiene informacion desde la ID tarjetaCredito
let transferencia = document.getElementById('transferenciaBancaria'); //Variable que obtiene informacion desde la ID transferenciaBancaria
let sweet = document.getElementById('formDeModal') //Variable que obtiene informacion desde la ID formDeModal
let boton = document.getElementById('sweetAlert') //Variable que obtiene informacion desde la ID sweetAlert
let carritoOriginal = []; //Donde se guarda la variable del JSON
let addCart = []; //Variable donde se muetra lo que esta en el carrito local 


//Funcion para mostrar todo en el carrito 
function mostrarCarrito(array){
    let htmlContentToAppend ="";

    //For para ir mostrando producto por producto
    for (let i = 0; i < array.length; i++){
        let MuestroProductos = array[i];
        
        //Cambia todas las monedas en pesos y la pasa a dolares
        if(MuestroProductos.currency === "UYU") {
            MuestroProductos.unitCost = Math.round(MuestroProductos.unitCost / 40)
            MuestroProductos.currency = "USD";
        }
        
        
        htmlContentToAppend += `
        
        
            <div class="card mb-3">
            
            <div class="row g-0 ">
           
                <div class="col-md-2">
                     <img src="${MuestroProductos.image}" class="img-fluid rounded-start" alt="..."">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <p class="position-absolute end-0 p-1 bg-dark border text-white">Cantidad <input id="cantidad${i}" type="number" min ="1" value="1" onchange='subtotal(addCart[${i}],${i}),totalDeCompra()' style ="max-width: 50px"></p>
                        <h5 class="card-title"><b>${MuestroProductos.name}</b></h5>   
                    </div>
                </div>
            </div>
            
            <div  class="card-footer text-muted d-flex bg-dark" style="height: 40px;" >
            <p class="me-auto text-white" >Precio: ${MuestroProductos.currency} <span>${MuestroProductos.unitCost}</p>
            <p class="col-5 borrar" style ="max-width: 310px"><i id='basura' class="fas fa-trash-alt cursor-active"></i></p>
            <p class="text-white">Subtotal U$S <span class="precios" id='subtotal${i}'>${MuestroProductos.unitCost}</p>
            </div>
            </div>
        `
        
    }
    
    document.getElementById('mostrar').innerHTML = htmlContentToAppend;

    //For para todas borrar los items
    for(let i=0;i < borrar.length;i++){
        borrar[i].addEventListener('click',()=>{
            eliminar(i)
        })
    }
    
    
}

// Subtotal de cada producto
function subtotal(array,i) {
    let cantidad = document.getElementById('cantidad' + i).value;
    let costo = array.unitCost

    resultado = cantidad * costo;
    
    document.getElementById('subtotal' + i).innerHTML = resultado;
}

// Total de toda la compra
function totalDeCompra() {
    let dato = document.getElementsByClassName('precios');
    let SumatoriaSubtotales = 0; // Variable para el for de la sumatoria de los subtotales
    let envio = 0;// Variable para el for de la comision por envio
    
    
    // Calculo de la sumatoria de subtotales
    for(let i = 0; i < dato.length; i++){ 
        SumatoriaSubtotales+= parseFloat(dato[i].innerHTML);
    }
    document.getElementById('costo').innerHTML = SumatoriaSubtotales;

    // Calculo del porcentaje del envio
    for(let x = 0; x< porcentaje.length; x++) {
        if (porcentaje[x].checked) {
            envio= parseFloat(porcentaje[x].value) * SumatoriaSubtotales
        }
    }
    document.getElementById('porcentajeEnvio').innerHTML = Math.round(envio);

    // Calculo del total
    let total = parseFloat(document.getElementById('costo').innerHTML); // Variables que llaman los resultados de los for de arriba
    let pEnvios = parseFloat(document.getElementById('porcentajeEnvio').innerHTML); // Variables que llaman los resultados de los for de arriba

    // Calculo total
    totalFinal = total + pEnvios;
    
    document.getElementById('total').innerHTML=totalFinal;

}

// Eliminar productos del carrito
function eliminar(i) {
    addCart.splice(i,1)
    localStorage.setItem('carrito',JSON.stringify(addCart));
    mostrarCarrito(JSON.parse(localStorage.getItem('carrito')))
    totalDeCompra()

}

//Funcion para utilizar las validaciones 
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
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: '!Has comprado con exito!',
                showConfirmButton: false,
                timer: 3000
              })
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

//Funcion para desabilitar la opcion no checkeada
function disabled(){
    if (tarjeta.checked === true){
        document.getElementById('numeroDeCuenta').disabled =true;
        document.getElementById('numeroDeTarjeta').disabled=false;
        document.getElementById('cvv').disabled=false;
        document.getElementById('vencimiento').disabled=false;
        document.getElementById('exampleModalLabel').innerHTML = tarjeta.value
    } else if (transferencia.checked === true){
        document.getElementById('numeroDeCuenta').disabled =false;
        document.getElementById('numeroDeTarjeta').disabled=true;
        document.getElementById('cvv').disabled=true;
        document.getElementById('vencimiento').disabled=true;
        document.getElementById('exampleModalLabel').innerHTML = transferencia.value
    }
}

//DOM
document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(peugeot).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritoOriginal = resultObj.data.articles[0];
        };

        if (carritoId !=null) {
            addCart = JSON.parse(localStorage.getItem('carrito'));
            mostrarCarrito(addCart)
            totalDeCompra()     
        } else {
            addCart.push(carritoOriginal)
            localStorage.setItem('carrito',JSON.stringify(addCart))
            mostrarCarrito(addCart)
            totalDeCompra()   
        }
    })

    for (let i=0; i< porcentaje.length; i++){
        porcentaje[i].addEventListener('click',()=> {
            totalDeCompra()
        })
    }

    tarjeta.addEventListener('click', ()=>{
        disabled();
    })

    transferencia.addEventListener('click', ()=>{
        disabled();
    })
    
    boton.addEventListener('click',(e)=>{
        if (sweet.checkValidity()){
            e.preventDefault();
            e.stopPropagation();
            document.getElementById('seleccion').value = document.getElementById('exampleModalLabel').innerHTML;
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Forma de pago aprobada', 
                text: 'Tocar cerrar para continuar',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })  
})