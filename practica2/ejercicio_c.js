const personas = [
    {nombre: "Ana", edad: 22},
    {nombre: "Luis", edad: 35},
    {nombre: "María", edad: 28}
];


const buscarPersona = personas.find(persona => persona.nombre === "Luis");
console.log(buscarPersona);


personas.forEach(persona => {
    console.log (persona.nombre + " tiene " + persona.edad + " años");

});


const totalEdades = personas.reduce((suma, persona) => suma + persona.edad, 0);
console.log ("La suma total de las edades es: " + totalEdades);