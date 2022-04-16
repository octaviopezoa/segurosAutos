// constructores
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// realiza cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {

    /*
    1 = americano por 1.15
    2 = asiatico por 1.05
    3 = europeo por 1.35
    */

    let cantidad;
    const base = 2000;


    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // leemos el año
    const diferencia = new Date().getFullYear() - this.year;

    // cada año que la diferencia es mayorm el costo va a reducirse en un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        si el seguro es basico, se multiplica por un 30% mas
        si el seguro es completo, se multiplica por un 50% mas
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;

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

UI.prototype.mostrarResultado = (total, seguro) => {

    const { marca, year, tipo } = seguro;
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = "Americano";
            break;
        case '2':
            textoMarca = "Asiatico";
            break;
        case '3':
            textoMarca = "Europeo";
            break;

        default:
            break;
    }

    // crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca} </span></p>
        <p class="font-bold">Año: <span class="font-normal">${year} </span></p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize">${tipo} </span></p>
        <p class="font-bold">Total: <span class="font-normal">$ ${total} </span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; //se borra spinner
        resultadoDiv.appendChild(div); //se muestra resultado
    }, 3000);
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

    ui.mostrarMensaje('Cotizando...', 'correcto');

    // ocultar resultados anteriores
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }

    // instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // utilizar el prototype para mostrar resultado en pantalla
    ui.mostrarResultado(total, seguro);

}