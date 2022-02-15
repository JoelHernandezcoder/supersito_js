/*--->La siguiente url declarada, la utilizaremos más adelante para obtener el valor 
actual del dolar blue (eso si nuestro cliente desea pagar en dólares).<---*/
const urlDolar = "https://api.bluelytics.com.ar/v2/latest"



/*--->A continuacion, declaramos el objeto "carrito" y las variables "precioTotal"(Sumatoria 
de los Precios de los Productos), inicializada en 0. Luego "compraImg"(donde se alojará una 
etiqueta <img> con la imagen del producto seleccionado). Y por ultimo, "compraDes" (donde se 
encuentran los elementos que acompañan a cada producto que seleccionamos).<---*/
var carrito = {
    id: "",
    img: "",
    des: "",
    precio: 0,
    cantidad: 0
};
var precioTotal = 0;
var compraImg;
var compraDes;



/*--->Uno de los propósito en nuestra página es tener una lista organizada de JSONs con 
el nombre de los distintos usuarios ("name"), el precio total de las compras("price"), y 
la forma de pago ("pay") todo en el LocalStorage. Ésto lo veremos más adelante. Por ahora
indicamos que el contador alojado LocalStorage se inicializa en 0 y que todas las variables 
hasta aquí declaradas son variables globales "var".<---*/
class userCompra{
    constructor(name,price,pay){
    this.name = name;
    this.price = price;
    this.pay = pay;
    }
};
var userPrice = "";
var userName;
var userPay;
localStorage.setItem("count",0);



/*--------------------------------------------------------------------------------------*/



/*--->Por medio de un "for" haremos un recorrido por la <div> cuya clase es "producto".
Si en alguno de los elementos de la colección, ocurre el evento "onclick", utilizaremos 
una función anónima que actualizará la "cantidad" de ese elemento en 1.<---*/
for (var i = 0; i < document.getElementsByClassName("producto").length; i++) {
    document.getElementsByClassName("producto")[i].onclick = function() {
        this.dataset.cantidad++; 



        /*--->Luego, una vez actualizada la "cantidad", utilizaremos la función "anadirCarrito".
        Dicha función, remplazará los parámetros del objeto "carrito", por los parametros del 
        elemento <div> con la clase "producto" que clickeamos previamente. Así tendremos nuestro
        "carrito", cargado con los parámetros del producto que seleccionamos.<---*/
        anadirCarrito(this.dataset.idproducto, this.dataset.img, this.dataset.des, this.dataset.precio, this.dataset.cantidad);
        


        /*--->Por último, la variable antes declarada "precioTotal", almacenará el valor del 
        precio del producto seleccionado<---*/
        precioTotal = precioTotal + carrito.precio;
        


        /*--->Si vemos en nuestro "html", casi al final, hay una etiqueta <p> con el id precioTotal.
        Allí se sobrescribirá lo que contenía con el "precioTotal" igual a 0 antes descripto.<---*/
        document.getElementById("precioTotal").innerHTML = "Total: $" + precioTotal;
        
        

        /*--->Ahora bien, si seleccionamos más de una vez al producto (es decir, que su cantidad
            sea mayor que 1) acumularemos innumerables <div>'s, con el mismo producto
            repetido. Para evitar ésto haremos lo siguiente. Pondremos un condicional, si la 
            cantidad es menor o igual que 1, agregaremos un <div> "compra" unico, con contenido 
            de "carrito". Y si es mayor llamaremos a la funcion "agregarElementos" que
            describiremos a continuacion.<---*/
            if (this.dataset.cantidad <= 1) {
                var compra = document.createElement("div");
                compra.setAttribute("id", carrito.id);
                $("#carritoDeCompras").hide().append(compra).slideDown(500);
                agregarElementos(this.dataset.cantidad);

        } else {

            agregarElementos();

        }     
        
    }
}



/*-->La funcion "anadirCarrito" toma los distintos parametros (id,img,des,precio,cantidad) 
que son ingresados y los añade a el objeto "carrito".<--*/
function anadirCarrito(id, img, des, precio, cantidad) {
    carrito.id = id;
    carrito.img = img;
    carrito.des = des;
    carrito.precio = parseInt(precio);
    carrito.cantidad = parseInt(cantidad);
}



/*--->Si la "cantidad" de productos seleccionados es distinto a 1, probablemente
mayor, la siguiente función "agregarElementos" se encarga de remover el primer nodo 
creado. Éste aparece como nodo hijo con index 0. Luego de borrarlo deja al nuevo nodo 
que contiene al objeto "carrito" con la cantidad actualizada. Y así sucesivamente. 
Y por otro lado, si es igual uno, llamaremos a funcion "actualizador".<---*/
function agregarElementos() {
    if (carrito.cantidad != 1) {
        for (i = 0; i < 8; i++) {
            document.getElementById(carrito.id).removeChild(document.getElementById(carrito.id).childNodes[0]);
        }
    }
    actualizador();
}



/*--->Esta funcion agrega al <div> que creamos,(el cual se encuentra dentro del <div> 
"carritoDeCompras") 8 elementos: img, boton de "+" y "-", cantidad, producto, descripcion 
y precio.<---*/
function actualizador() {



    /*--->Agregar imagen a carrito de compras<---*/
    compraImg = document.createElement("img");
    compraImg.setAttribute("src", carrito.img);
    document.getElementById(carrito.id).appendChild(compraImg);
    


    /*--->Agregar Boton "+" a carrito de compras<---*/
    compraDes = document.createElement("button");
    compraDes.setAttribute("class", "mas");
    compraDes.setAttribute("id", "mas" + carrito.id);
    compraDes.setAttribute("onclick", "sumar(this.id)");
    compraDes.innerHTML = "+";
    document.getElementById(carrito.id).appendChild(compraDes);



    /*--->Agregar Cantidad a carrito de compras<---*/
    compraDes = document.createElement("p");
    compraDes.setAttribute("class", "cantidad");
    compraDes.innerHTML = carrito.cantidad;
    document.getElementById(carrito.id).appendChild(compraDes);



    /*--->Agregar Boton "-" a carrito de compras<---*/
    compraDes = document.createElement("button");
    compraDes.setAttribute("class", "menos");
    compraDes.setAttribute("id", "menos" + carrito.id);
    compraDes.setAttribute("onclick", "restar(this.id)");
    compraDes.innerHTML = "-";
    document.getElementById(carrito.id).appendChild(compraDes);



    /*--->Agregar palabra Cantidad a carrito de compras<---*/
    compraDes = document.createElement("p");
    compraDes.setAttribute("class", "cantidad");
    compraDes.innerHTML = "Cantidad: ";
    document.getElementById(carrito.id).appendChild(compraDes);



    /*---->Agregar Producto a carrito de compras<---*/
    compraDes = document.createElement("h2");
    compraDes.innerHTML = "Producto: " + carrito.id;
    document.getElementById(carrito.id).appendChild(compraDes);



    /*--->Agregar Descripción a carrito de compras<---*/
    compraDes = document.createElement("p");
    compraDes.innerHTML = carrito.des;;
    document.getElementById(carrito.id).appendChild(compraDes);



    /*--->Agregar Precio a carrito de compras<---*/
    compraDes = document.createElement("h3");
    compraDes.innerHTML = "Precio: " + carrito.precio;
    document.getElementById(carrito.id).appendChild(compraDes);
}



/*-->La funcion "sumar" se ejecuta por medio del <button> "+" , el cual agregamos 
al <div> del producto por medio de la funcion antes mencionada, "actualizador".
Por medio de un "for" haremos un recorrido por los 16 <div>'s de los productos 
que "Supersito" ofrece. Cuando encuentre la igualdad entre, el "id" del producto 
seleccionado, y el "id" de uno de los productos cargados, creara una variable 
"nuevaData". Esta variable aumentara en 1 la "cantidad" del <div> del producto
y modifica la variable "precioTotal".<---*/
function sumar(idBoton) {
    for (var j = 0; j < document.getElementsByClassName("producto").length; j++) {
        if (document.getElementById(idBoton).parentNode.id == document.getElementsByClassName("producto")[j].dataset.idproducto) {
            break;
        }
    }
    var nuevaData = document.getElementsByClassName("producto")[j].dataset;
    nuevaData.cantidad++;
    anadirCarrito(nuevaData.idproducto, nuevaData.img, nuevaData.des, nuevaData.precio, nuevaData.cantidad);
    agregarElementos(carrito.cantidad);
    precioTotal = precioTotal + carrito.precio;
    
    document.getElementById("precioTotal").innerHTML = "Total: $" + precioTotal;
}



/*--->Esta función es similar en su estructura a sumar, solo que la "cantidad" disminuye en 1
y la variable "preciototal" desciende<---*/
function restar(idBoton) {
    for (var j = 0; j < document.getElementsByClassName("producto").length; j++) {
        if (document.getElementById(idBoton).parentNode.id == document.getElementsByClassName("producto")[j].dataset.idproducto) {
            break;
        }
    }
    var nuevaData = document.getElementsByClassName("producto")[j].dataset;
    nuevaData.cantidad--;
    anadirCarrito(nuevaData.idproducto, nuevaData.img, nuevaData.des, nuevaData.precio, nuevaData.cantidad);
    eliminarElementos(carrito.cantidad);
    precioTotal = precioTotal - carrito.precio;
    
    document.getElementById("precioTotal").innerHTML = "Total: $" + precioTotal;
}



/*--->La siguiente funcion "eliminarElementos" se encarga de borrar los elementos que 
no deseamos comprar del <div> "carritoDeCompras". Si la "cantidad", luego de borrar es 
igual a cero borrará todo el <div> donde se encontraba el producto. Pero, si la cantidad 
es mayor a cero, eliminara el primer nodo del <div> del producto y dejará solo el último
actualizado<---*/
function eliminarElementos() {
    if (carrito.cantidad == 0) {
        document.getElementById("carritoDeCompras").removeChild(document.getElementById(carrito.id));
    } else {
        for (i = 0; i < 8; i++) {
            document.getElementById(carrito.id).removeChild(document.getElementById(carrito.id).childNodes[0]);
        }
        actualizador();
    }
}



/*--------------------------------------------------------------------------------------*/



/*--->Luego de que ya se haya seleccionado los distintos productos y se haya calculado el
"precioTotal" de la compra, se cargarán los datos de "Nombre y Apellido"(input) y "Forma 
de Pago"(select). Posteriormente el usuario hará click en el botón Comprar y allí se llevará 
a cabo una función, que desencadenará las siguientes operaciones.<---*/


let btnCompra = document.getElementById("btnCompra");
btnCompra.addEventListener("click",getData);


function getData(){

    if (localStorage.length > 1 ){
        localStorage.setItem("count", localStorage.length-1)
    }

    userName = document.querySelector("#name").value;
    if(userName == ""){
        alert("Ingrese su Nombre y Apellido por favor");    
        }else if($("#pay").val() == ""){
            alert("Seleccione una Forma de Pago por favor")
            }else if(precioTotal == 0){
                alert("Ingrese los Productos que desea comprar");
            }
    else{
        userPrice = document.querySelector("#precioTotal").textContent;
        userPay = $("#pay").select().val();

        let usuario = new userCompra(userName,userPrice,userPay);
        let userJson = JSON.stringify(usuario); 

        localStorage.setItem(localStorage.getItem("count"),userJson);
        let i = parseInt(localStorage.getItem("count"));
        i++;
        localStorage.setItem("count",i)

        let saludoUser = document.getElementById("saludo");
        saludoUser.innerHTML = `"Gracias por su compra ${userName}</br>En breve estaremos enviando su producto"`
        $("#saludo").show().append(`</br><img id="imgEnv" src="imagenes/enviogratis.png"></br><button onclick="location.reload()">Nueva Compra</button>`)
        $("#name").val("");
        $("#pay").val("");
        $("#imgPay").empty();
        $("#btnCompra").hide();
        $("#dolarCont").empty()
    }
}

$("#saludo").hide();

/*--->Además, la Forma de Pago del usuario se seleccionará por un "select", y al realizarse 
éste evento (de cambio de opción), ejecutaremos la siguiente función anónima.<---*/
$("#pay").on("change", function(e){
   
    if(precioTotal != 0){
        
        if(e.target.value == ""){
            $("#imgPay").empty()
            $("#dolarCont").empty()}
            else if(e.target.value == "rapiPago"){
                $("#imgPay").empty()
                $("#dolarCont").empty()
                    $("#imgPay").hide().append(`<img src="imagenes/rapipago.png" class="imgP">`).fadeIn(2000);}
                    else if(e.target.value == "pagoFacil"){
                        $("#imgPay").empty()
                        $("#dolarCont").empty()
                            $("#imgPay").hide().append(`<img src="imagenes/pagofacil.png" class="imgP">`).fadeIn(2000);}
                            else if(e.target.value == "debitCard"){
                                $("#imgPay").empty()
                                $("#dolarCont").empty()
                                    $("#imgPay").hide().append(`<img src="imagenes/debitcard.png" class="imgP">`).fadeIn(2000);}
                                else if(e.target.value == "creditCard"){
                                    $("#imgPay").empty()
                                    $("#dolarCont").empty()
                                        $("#imgPay").hide().append(`<img src="imagenes/creditcard.png" class="imgP">`).fadeIn(2000);}    

/*--->Para pedir informacion a la url que previamente declaramos, haremos uso del GET.
Así obtendremos información del url que afortunadamente se encuentra escrita en JSON.
Traeremos el valor actual del dolar blue. Y más tarde podremos calcular la conversión
de la compra del Usuario.<---*/            

                                    else if(e.target.value == "dolarPay"){
                                        
                                        $.get( urlDolar , function( conversion ){
                                            let dolarBlue = conversion.blue.value_sell;
                                                let compraDolar = `<div id="dolar">
                                                                    <h3>A Pagar en $USD: ${(precioTotal/dolarBlue).toFixed(2)}</h3>
                                                                    <img id="dolarImg" src="imagenes/dolar.png">
                                                                    <h6>Valor del Dolar Blue en Pesos Argentinos: $${dolarBlue}</h6>
                                                                    </div>`
                                                                    $("#imgPay").empty();
                                                                    $("#dolarCont").empty();
                                                                    $("#dolarCont").hide().append(compraDolar).fadeIn(2000);                   
                                        })                              
                                    }
    }else{
        alert("Ingrese los Productos que desea comprar");
        $("#pay").val("");
    }
                                                
})