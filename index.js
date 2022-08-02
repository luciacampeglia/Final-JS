let products = [
    {
        "id":"001",
        "name": "Cárdigan Merlín (Gris)",
        "color": "Gris",
        "price": 6200,
        "img": "Imágenes/Hombre/cardigan-merlin-1.jpg",
    },
    {
        "id":"002",
        "name": "Cárdigan Merlín (Azúl)",
        "color": "Azúl",
        "price": 6200,
        "img": "Imágenes/Hombre/cardigan-merlin-2.jpg",
    },
    {
        "id":"003",
        "name": "Cárdigan Merlín (Bordó)",
        "color": "Bordó",
        "price": 6200,
        "img": "Imágenes/Hombre/cardigan-merlin-3.jpg",
    },
    {
        "id":"004",
        "name": "Remera Lucas (Gris)",
        "color": "Gris",
        "price": 3900,
        "img": "Imágenes/Hombre/remera-lucas-1.jpg",
    },
    {
        "id":"005",
        "name": "Remera Lucas (Verde)",
        "color": "Verde",
        "price": 3900,
        "img": "Imágenes/Hombre/remera-lucas-2.jpg",
    },
    {
        "id":"006",
        "name": "Remera Lucas (Azúl)",
        "color": "Azúl",
        "price": 3900,
        "img": "Imágenes/Hombre/remera-lucas-3.jpg",
    },
    {
        "id":"007",
        "name": "Sweater Mercurio (Celeste)",
        "color": "Celeste",
        "price": 5800,
        "img": "Imágenes/Hombre/sweater-mercurio-1.jpg",
    },
    {
        "id":"008",
        "name": "Sweater Mercurio (Azúl)",
        "color": "Azúl",
        "price": 5800,
        "img": "Imágenes/Hombre/sweater-mercurio-2.jpg",
    },
    {
        "id":"009",
        "name": "Sweater Mercurio (Bordó)",
        "color": "Bordó",
        "price": 5800,
        "img": "Imágenes/Hombre/sweater-mercurio-3.jpg",
    },
    {
        "id":"010",
        "name": "Sweater Pedro (Gris claro)",
        "color": "Gris claro",
        "price": 5700,
        "img": "Imágenes/Hombre/sweater-pedro-1.jpg",
    },
    {
        "id":"011",
        "name": "Sweater Pedro (Celeste)",
        "color": "Celeste",
        "price": 5700,
        "img": "Imágenes/Hombre/sweater-pedro-2.jpg",
    },
    {
        "id":"012",
        "name": "Sweater Pedro (Gris oscuro)",
        "color": "Gris oscuro",
        "price": 5700,
        "img": "Imágenes/Hombre/sweater-pedro-3.jpg",
    },
    
]

let cart;

//Local Storage
if(JSON.parse(localStorage.getItem('cart'))){
    cart = JSON.parse(localStorage.getItem('cart'))
} else{
    localStorage.setItem('cart', JSON.stringify([]))
    cart = JSON.parse(localStorage.getItem('cart'))
}

// DOM - Catálogo productos
function setProducts(){
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        const {id, name, color, price, img } = element
        const card = `
 
        <div id='gridContainer' class='products m-3'>
                <p class="text-center my-1">${name}</p>
            <div class="text-center mt-2">
                <img class= "imgProduct" src= ${img} alt= "Imagen-producto" width="380px"/>
            </div>
            <div>
                <p class="text-center mt-2">$${price.toLocaleString()}</p>
            </div>
            <div class="btn-container btn-add text-center my-2">
                <button id=${id} class="btnAdd">Agregar a carrito</button>
            </div>
        </div>  
          
        `
        const container = document.getElementById('container')
        container.innerHTML += card
    }
}

setProducts();

//Agregar producto al carrito
const btnAdd = document.getElementsByClassName('btnAdd')

for (let i = 0; i < btnAdd.length; i++) {
    const element = btnAdd[i];
    element.addEventListener('click', addToCart)
}

//Sweet Alert
const addingProduct = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1500
    })
}

let btnAdding = document.getElementsByClassName('btnAdd');
btnAdding.onclick = addingProduct



//Traer data del producto 
function addToCart(e){2
    const btn = e.target;
    const idBtn = btn.getAttribute ('id')
    const findedProduct = products.find(product => product.id == idBtn)
    const inCart = cart.find(product => product.id == findedProduct.id)
    console.log (inCart)
    
    if(!inCart){
        cart.push({...findedProduct, quantity: 1})
    }else{
        let cartFilter = cart.filter(product => product.id != inCart.id)
        cart = [...cartFilter, {...inCart, quantity: inCart.quantity + 1}]
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    addingProduct();
    actualizarCarrito();
}

function actualizarCarrito (){
    const counter = document.getElementById('cartCounter')
    counter.innerHTML = cart.length
}

actualizarCarrito();

    