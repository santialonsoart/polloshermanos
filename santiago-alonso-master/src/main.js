import './main.scss';
import menu from './menu.json';
import './assets/fonts/Marcheile-Bold-Condensed.woff';
import './assets/fonts/Marcheile-Bold-Condensed.woff2';
import { info } from 'sass';
/* DO NOT EDIT ABOVE THIS LINE. You can start editing here. */

//Carrito de la compra

fetch("./menu.json").then(response => {
    return response.json();
}).then(jsondata => console.log(jsondata));