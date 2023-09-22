function toggleSpoiler(spoiler) {
    spoiler.classList.toggle("show");
}

// Obtém o endereço IP do elemento script no cabeçalho
const ip = document.currentScript.getAttribute('data-ip');

// Insere o endereço IP no marcador de espaço reservado
document.getElementById('ip-address-placeholder').innerHTML = ip;
