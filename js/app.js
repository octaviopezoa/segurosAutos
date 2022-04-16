// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() { }

// llena opcion años
UI.prototype.llenaOpciones = () => {
    const max = new Date().getFullYear(),
        min = max - 20;

    const selectYear = document.querySelector('#year');

    for (let index = max; index > min; index--) {
        let option = document.createElement('option');
        option.value = index;
        option.textContent = index;
        selectYear.appendChild(option);
    }
}


// instancia UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenaOpciones();
})