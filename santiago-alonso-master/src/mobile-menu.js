window.onscroll = function() {scrollSticky()};

var header = document.querySelector('nav');
var sticky = header.offsetTop;

function scrollSticky() {
    if (window.pageYOffset > sticky) {
        header.classList.add("nav-scroll");
    } else {
        header.classList.remove("nav-scroll");
    }
}