function simularPeticionAPI(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos(params) {
    //usa await para esperar la promesa de simularPeticion
    //imprime el resultado
}

//usa la funcion async