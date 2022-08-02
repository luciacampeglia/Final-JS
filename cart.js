let cart;

//Local Storage
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
} else{
    localStorage.setItem('cart', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
}

//Sumar cantidad productos + precio
const totalCart = () => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
}

//Tabla carrito compra
const body = document.getElementById('cartMain');
function showCart() {
    if(cart.length == 0){
        const text = `
        <div class='cartContainer'>
            <h1 class='txtCart mt-3 text-center'> El carrito está vacío </h1>
            <a class='btnBack' href='index.html'>
                <button>Volver</button>
            </a>
        </div>
        `;
        body.innerHTML += text;
    } else{
        const titulo = `
            <div class= 'cartContainer'>
                <h1 class='txtCart text-center mt-3'> Carrito de compras </h1>
            </div>`;
        body.innerHTML += titulo;
        const table = `
        <div class= 'tableContainer'>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th class='txtTable'>PRODUCTOS</th>
                        <th class='txtTable'>CANTIDAD</th>
                        <th class='txtTable'>PRECIO</th>
                    </tr>  
                </thead>
                <tbody id="tBody">
                </tbody>
                <tfoot>
                    <tr>
                        <th></th> 
                        <th></th>
                        <th class='txtTotal'>Total:</th> 
                        <td id='total'>$${totalCart().toLocaleString()}</td>
                    </tr>
                </tfoot>
            </table>
            </div>
            <div class='btn-container text-center'>
                <button class='btnCancel'>VACIAR CARRITO</button>
            </div>
            <div class='btn-container text-center'>
                <button class='btnFinish'>TERMINAR COMPRA</button>
            </div>`;
            
            body.innerHTML += table;
    
            const tbody = document.getElementById('tBody')
            for (let i = 0; i < cart.length; i++) {
                const element = cart[i];
                const {id, name, img, price, quantity} = element;
                const cartCards = `
                <tr id=${id}>
                    <th>
                    </th>
                    <th class='tableDetails'><img class='imgProductCart'src=${img} alt='Imagen-producto><spam class='productName' width="70px">${name}</span></th>
                    <th>${quantity}</th>
                    <th>$${(quantity*price).toLocaleString()}</th>
                </tr>
                `
                tbody.innerHTML += cartCards;
                
            }

//Vaciar carrito
const btnCancel = document.getElementsByClassName('btnCancel');
        btnCancel[0].onclick = () =>{
            cart.length = 0;
            const totalPrice = document.getElementById('total');
            totalPrice.innerText = "";
            cartCounter.innerText = (cart.length);
            localStorage.setItem('cart',[]);
            actualizarCarrito();
        }
    } 
}

showCart();

// Actualizar carrito
function actualizarCarrito (){
    const counter = document.getElementById('cartCounter')
    counter.innerHTML = cart.length
}



//Sweet Alert
const finishingPurchase = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su compra ha sido procesada con éxito',
        showConfirmButton: false,
        timer: 1500
    })
}
let btnFinish = document.getElementsByClassName('btnFinish');
btnFinish[0].onclick = finishingPurchase;



totalCart();
