const PROD_ID= localStorage.getItem('prodID'); //Constante que obtiene informacion del local
let items = PRODUCT_INFO_URL + PROD_ID + EXT_TYPE; //Variable que trae informacion del JSON para mostrar los productos
let comentarios = PRODUCT_INFO_COMMENTS_URL + PROD_ID + EXT_TYPE; //Variable que trae informacion del JSON para mostrar los comentarios
let infoProductos = []; //Variable que crea un array para la informacion de los productos
let infoComentarios =[]; //Variable que crea un array para la informacion de los comentarios
let arrayDelCarrito = []; //Variable que crea un array para enviar al carrito
let carritoId = localStorage.getItem('carrito') //Variable que obtiene informacion del carrito carrito

//Funcion para mostrar las imagenes de los productos con un carrusel
//Sin for ya que son siempre la misma cantidad de imagenes
function mostrarImagenes(infoProductos) {
        let htmlContentToAppend = `
            <div class="carousel-item active">
            <img src="${infoProductos.images[0]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[1]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[2]}" class="d-block w-40">
            </div>
            <div class="carousel-item">
            <img src="${infoProductos.images[3]}" class="d-block w-40">
            </div>` 
        document.getElementById('mostrar').innerHTML = htmlContentToAppend;
        
}

//Funcion de puntaje para mostrar estrellas en los comentarios
function puntaje(array){
        let puntos = "";
    
        for(let i=1; i <= 5; i++){
            if(i <= array){
                puntos += `<i class="fas fa-star" id= 'estrellas'></i>`;
            }
            else{
                puntos +=`<i class="far fa-star"></i>`;
            }
        }
        return puntos;
}

//Funcion para mostrar la informacion de los productos
function infoDelProducto(infoProductos){
        let pNombreHTML = document.getElementById('nombre'); 
        pNombreHTML.innerHTML = infoProductos.name;
        let pDescripcionHTML = document.getElementById('descripcion'); 
        pDescripcionHTML.innerHTML = infoProductos.description;
        let soldCountHTML = document.getElementById('vendidos'); 
        soldCountHTML.innerHTML = infoProductos.soldCount;
        let precioMonedaHTML = document.getElementById('precio'); 
        precioMonedaHTML.innerHTML = infoProductos.currency + ' ' + infoProductos.cost;
        let categoryHTML = document.getElementById('categoria'); 
        categoryHTML.innerHTML = infoProductos.category;
        
    
}

//Funcion para mostrar los comentarios de los productos
//Tiene for ya que cada producto tiene diferente cantidad de comentarios
function mostrarComentarios(infoComentarios){
        let comento = "";

    for (let i = 0; i < infoComentarios.length; i++){
        let comentan = infoComentarios[i];
        
        comento += `<div class= "card p-3 bg-white col-md-4 w-auto h-auto">
        <div class="d-flex flex-start align-items-center">
            <div class="user d-flex flex-row align-items-center">
                <span><medium class="font-weight-bold text-primary">${comentan.user}</medium><br> 
                <p class="font-weight-bold">${comentan.description}</p></span>
            </div>
        </div>
        <div class="action d-flex justify-content-between mt-2 align-items-center">
            ${comentan.dateTime}
        </div>
        <div class="icons position-absolute bottom-0 end-0">
                ${puntaje(comentan.score)}
                </div>
            </div>`

        document.getElementById('comentarios').innerHTML = comento;
    }
}

//Funcion para agregar un nuevo comentario
function nuevoComentario() {

    let comentarioNuevo = document.getElementById("comentario").value;
    let estrellasNuevas = document.getElementById('puntajeComentario').value;
    let hoy = new Date ();
    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    if(dia<10){
        dia= "0"+dia;
    }
    if(mes<10){
        mes= "0"+mes;
    }
    if(hora<10){
        hora= "0"+hora;
    }
    
    fecha = hoy.getFullYear() + "-" + mes + "-" + dia + " " + hora;
    
    
    let nuevoComment = {}
    
    nuevoComment.user = sessionStorage.getItem('email').split('@')[0];
    nuevoComment.description = document.getElementById('comentario').value;
    nuevoComment.dateTime = fecha;
    nuevoComment.score = document.getElementById('puntajeComentario').value;

    infoComentarios.push(nuevoComment)
    mostrarComentarios(infoComentarios)

    nuevoComment.description = document.getElementById('comentario').value = ''
    nuevoComment.score = document.getElementById('puntajeComentario').value = ''
};

//Funcion para mostrar los productos relacionados
function relatedProducts(){
    let info = infoProductos.relatedProducts;

    for(let i = 0; i < info.length; i++){

        let htmlContent = '';

        htmlContent += `
        <div class="col-12 col-lg-6 ">
                <div class="card border border-1 my-2 bg-light" onclick="setProductRelID(${infoProductos.relatedProducts[i].id})">
                    <img src="${info[i].image}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${info[i].name}</h5>
                    </div>
                </div>
        </div>`
        
    document.getElementById("ContenedorProductosRel").innerHTML += htmlContent;
    }
} 

//Funcion para recibir la informacion del local y redireccionar
function setProductRelID(id) {
    localStorage.setItem("prodID", id);
    location.href = "product-info.html";
}

//Funcion para agregar el producto al carro
function AgregarAlCarrito(array) {

    

    let infoToCart = {};
    infoToCart.name = array.name;
    infoToCart.unitCost = array.cost;
    infoToCart.image = array.images[0];
    infoToCart.currency = array.currency;

    

    arrayDelCarrito.push(infoToCart);
    localStorage.setItem('carrito', JSON.stringify(arrayDelCarrito))

    Swal.fire({
        title: "Agregado al carrito con exito",
        icon: 'success',
        cancelButtonText:'Continuar comprando',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Ir al carro'
    }).then((result) => {
        if (result.isConfirmed) {
          window.location = "cart.html"
        }
    })
    

}

//DOM
document.addEventListener('DOMContentLoaded',()=>{
    getJSONData(items).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoProductos = resultObj.data;
            mostrarImagenes(infoProductos);
            infoDelProducto(infoProductos);
            relatedProducts(infoProductos)
        }   
    })
    getJSONData(comentarios).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            infoComentarios = resultObj.data; 
            mostrarComentarios(infoComentarios)  
        } 
    })
    document.getElementById("comentar").addEventListener("click", () => {
        nuevoComentario()  
    });
    if (carritoId != null) {
        arrayDelCarrito = JSON.parse(localStorage.getItem('carrito'))
    } 
})