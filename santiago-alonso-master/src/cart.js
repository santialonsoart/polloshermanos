document.addEventListener('DOMContentLoaded', () => {
// Variables
const dataBase = [
    {
        id: 1,
        name: 'Chicken Burger',
        description: 'We placed 70 years of delicious into this sandwich. Taste our legendary hand-battered chicken.',
        price: 12.10,
        image: '/src/assets/images/gastro/gasto-item-chicken-buger.jpg'
    },
    {
        id: 2,
        name: 'Chicken Wings',
        description: 'Get your fill with the Texas-Sized Meal: 3PC Legs & Thighs, 2 regular sides plus a signature jalapeño pepper.',
        price: 10.89,
        image: '/src/assets/images/gastro/gasto-item-chicken-wings.jpg'
    },
    {
        id: 3,
        name: 'Beer',
        description: 'Just simple and fresh beer.',
        price: 2.66,
        image: '/src/assets/images/gastro/gasto-item-beer.jpg'
    },
    {
        id: 4,
        name: 'French Fries',
        description: 'Our fries are extra-long and center-cut from Grade A potatoes. They are cooked to a golden-brown crisp while remaining slightly soft in the myddle. Every batch is cooked to order in our premyum quality Canola Oil blend, then lightly salted immediately after leaving the fryer, so the taste melts onto each fry.',
        price: 14.52,
        image: '/src/assets/images/gastro/gasto-item-french-fries.jpg'
    },
    {
        id: 5,
        name: 'Milkshake*',
        description: 'Our creamy Milkshakes are hand-spun the old-fashioned way each time and feature delicious. Topped with whipped cream and a cherry (except when served via delivery).',
        subdescription: '*20% discount added only during this month!',
        price: 1.74,
        image: '/src/assets/images/gastro/gasto-item-milkshake.jpg',
    },
    {
        id: 6,
        name: 'Fried Chicken',
        description: 'We use premyum chicken breast tenderloins to make the most tender chicken fingers possible. Our special marinade tenderizes the chicken, locks in moisture and adds flavor.',
        price: 8.00,
        image: '/src/assets/images/gastro/gasto-item-fried-chicken.jpg'
    }

];

let cart = [];
const badge = '€';
const DOMitems = document.querySelector('#items');
const DOMcart = document.querySelector('#cart');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#delete-button');

// Funciones

/**
 * Dibuja todos los Products a partir de la base de datos. No confundir con el cart
 */
function renderProducts() {
    dataBase.forEach((info) => {
        // Estructura
        const myNode = document.createElement('div');
        myNode.classList.add('card');
        // Body
        const myNodeCardBody = document.createElement('div');
        myNodeCardBody.classList.add('card-body');
        // Titulo

        const myNodeTitleSection = document.createElement('div');
        myNodeTitleSection.classList.add('card-title-section');

        const myNodeTitle = document.createElement('h5');
        myNodeTitle.classList.add('card-title');
        myNodeTitle.textContent = info.name;
        // image
        const myNodeimage = document.createElement('img');
        myNodeimage.setAttribute('src', info.image);
        const myNodeSubDescription = document.createElement('p');
        myNodeSubDescription.classList.add('txt-big', 'txt-bold');
        myNodeSubDescription.textContent = info.subdescription;
        //Descripción
        const myNodeDescription = document.createElement('p');
        myNodeDescription.classList.add('card-description');
        myNodeDescription.textContent = info.description;
        // price
        const myNodeprice = document.createElement('p');
        myNodeprice.classList.add('card-price');
        myNodeprice.textContent = `/${info.price}${badge}`;
        // Button 
        const myNodeButton = document.createElement('button');
        myNodeButton.textContent = 'Add to cart +';
        myNodeButton.setAttribute('marker', info.id);
        myNodeButton.addEventListener('click', addItemToCart);
        // Insertamos
        myNodeCardBody.appendChild(myNodeimage);
        myNodeCardBody.appendChild(myNodeTitleSection);
        myNodeTitleSection.appendChild(myNodeTitle);
        myNodeTitleSection.appendChild(myNodeprice);
        myNodeCardBody.appendChild(myNodeSubDescription);
        myNodeCardBody.appendChild(myNodeDescription);
        myNode.appendChild(myNodeCardBody);
        myNode.appendChild(myNodeButton);
        DOMitems.appendChild(myNode);
    });
}

/**
 * Evento para añadir un producto al cart de la compra
 */
function addItemToCart(event) {
    // Anyadimos el Nodo a nuestro cart
    cart.push(event.target.getAttribute('marker'))
    // Actualizamos el cart 
    renderCart();

}

/**
 * Dibuja todos los Products guardados en el cart
 */
function renderCart() {
    // Vaciamos todo el html
    DOMcart.textContent = '';
    // Quitamos los duplicados
    const cartWithoutDuplicates = [...new Set(cart)];
    // Generamos los Nodos a partir de cart
    cartWithoutDuplicates.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const myItem = dataBase.filter((itemDataBase) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemDataBase.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const ItemUnits = cart.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del cart
        const myNode = document.createElement('li');
        myNode.classList.add('list-group-item');
        myNode.textContent = `${ItemUnits} x ${myItem[0].name} - ${myItem[0].price} ${badge}`;
        // Button de delete
        const myButton = document.createElement('button');
        myButton.classList.add('delete-button');
        myButton.textContent = 'X';
        myButton.style.marginLeft = '1rem';
        myButton.dataset.item = item;
        myButton.addEventListener('click', deleteItemCart);

        // Mezclamos nodos
        myNode.appendChild(myButton);
        DOMcart.appendChild(myNode);
    });
    // Renderizamos el price total en el HTML
    DOMtotal.textContent = calculeTotal();
}

/**
 * Evento para delete un elemento del cart
 */
function deleteItemCart(event) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = event.target.dataset.item;
    // Borramos todos los Products
    cart = cart.filter((cartId) => {
        return cartId !== id;
    });
    // volvemos a render
    renderCart();
}

/**
 * Calcula el price total teniendo en cuenta los Products repetidos
 */
function calculeTotal() {
    // Recorremos el array del cart 
    return cart.reduce((total, item) => {
        // De cada elemento obtenemos su price
        const myItem = dataBase.filter((itemDataBase) => {
            return itemDataBase.id === parseInt(item);
        });
        // Los sumamos al total
        return total + myItem[0].price;
    }, 0).toFixed(2);
}

/**
 * Varia el cart y vuelve a dibujarlo
 */
function vaciarCart() {
    // Limpiamos los Products guardados
    cart = [];
    // Renderizamos los cambios
    renderCart();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCart);

// Inicio
renderProducts();
renderCart();


});

