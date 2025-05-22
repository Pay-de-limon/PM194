function simularPeticionAPI(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000);
    });
}

async function obtenerDatos(params) {
    try {
        const resultado = await simularPeticionAPI();
        console.log(resultado);
    } catch (error){
        console.error("Error al obtener datos:", error);
    }
}

obtenerDatos();
