const persona = {
    nombre: "Perla Moreno",
    edad: 21,
    direccion: {
        ciudad: "QRO",
        pais: "MX"
    }
}

const {nombre, edad, direccion: { ciudad, pais}} = persona;

console.log("Hola soy, " + nombre + ", tengo " + edad + " años" + " y vivo en " + ciudad );


