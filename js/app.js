// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() { }

// mostrar alertas de formulario en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === "error") {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10')
    div.textContent = mensaje;

    // insertar el html
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);
}

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

// validar formulario
eventListerners();
function eventListerners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    // leer marca, año y tipo seleccionado
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === "" || year === "" || tipo === "") {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'correcto')
}