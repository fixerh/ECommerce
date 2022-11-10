let productos = []; //Variable que crea una array
let enlace = PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE; //Variable que trae el JSON del lugar indicado
const oAscendentePrecio = "0-9"; //Constante para ordenar Ascendentemente los precios
const oDescendentePrecio = "9-0"; //Constante para ordenar Descendentemente los precios
const oVendidos = "Ventas"; //Constante para ordenar las ventas
let criterioDeOrdenar = undefined; //Variable que le asigna el valor undefined 
let minCost = undefined; //Variable que le asigna el valor undefined 
let maxCost = undefined; //Variable que le asigna el valor undefined 

//Funcion creada para ordenar los precios y las ventas
function ordenar(criteria, array){
    let result = [];
    if (criteria === oAscendentePrecio)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === oDescendentePrecio){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === oVendidos){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

//Funcion mostrar todos los productos en forma de lista
function mostrarLista(array){
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let products = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){
        htmlContentToAppend += `
        <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src=" ${products.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${products.name} - ${products.currency} ${products.cost}</h4> 
                        <p> ${products.description} </p> 
                        </div>
                        <small class="text-muted"> ${products.soldCount} ventas</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

//Funcion para recibir la informacion del local y redireccionar
function setProductID(id) {
    localStorage.setItem("prodID", id);
    location.href = "product-info.html";
}

//Funcion para buscar productos
function busca(productos) {
    let busqueda = document.getElementById('buscador').value;
    

    let product = productos.filter(producto => {
        return (producto.name.toLowerCase().indexOf(busqueda.toLowerCase()) >-1) || (producto.description.toLowerCase().indexOf(busqueda.toLowerCase()) >-1); 
    })
    

    mostrarLista(product);

    
}

//Funcion para ordenar y mostrar los productos
function ordenoYMuestro(sortCriteria){
    
    criterioDeOrdenar = sortCriteria;
    
    productos = ordenar(criterioDeOrdenar, productos);
    
    mostrarLista(productos);
}

//DOM
document.addEventListener("DOMContentLoaded", ()=> {
    getJSONData(enlace).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data.products;
            mostrarLista(productos)
        }
        document.getElementById('tittle').innerHTML = `Veras aqui todos los productos de la categoria ` + resultObj.data.catName
    });
   
    document.getElementById("clasificacionAs").addEventListener("click", ()=> {
        ordenoYMuestro(oAscendentePrecio);
        console.log(productos);
    });

    document.getElementById("clasificacionDs").addEventListener("click", ()=> {
        ordenoYMuestro(oDescendentePrecio);
    });

    document.getElementById("clasificacionVen").addEventListener("click", ()=> {
        ordenoYMuestro(oVendidos);
    });

    //Evento click para limpiar los filtros
    document.getElementById("limpiarFiltro").addEventListener("click", ()=> {
        document.getElementById("rPrecioMin").value = "";
        document.getElementById("rPrecioMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        mostrarLista(productos);
    });

    //Evento click para filtrar por precio
    document.getElementById("filtro").addEventListener("click", ()=> {
        minCost = document.getElementById("rPrecioMin").value;
        maxCost = document.getElementById("rPrecioMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        mostrarLista(productos);
    });

    //Evento key up para buscar los productos cada tecla que escribis
    document.getElementById('buscador').addEventListener('keyup', ()=> {
        busca(productos);
    })
})
