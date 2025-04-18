function toggleMenu() {
    const nav = document.querySelector('.main .nav');
    nav.classList.toggle('show'); 
}

function closePopup(id) {
    document.getElementById(id).classList.remove('show');
}

function openPopup(id) {
    document.getElementById(id).classList.add('show');
}

