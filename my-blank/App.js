/* zona 1: Importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React,{useState} from 'react';

const Texto = () => {
  const [contenido, setContenido] = useState ('Hola mundo RNative');
  const actualizarTexto = () => {setContenido('Estado actualizado del Text')};
  return(
    <Text onPress={actualizarTexto}>{contenido} </Text>
  )
  };

  const Boton = ()=>{
    const [contenido, setContenido] = useState ('trabajaaa');
    const actualizarBoton = () => {setContenido('deja de trabajarrr')}
    return (
      <Button title={contenido} onPress={actualizarBoton}>{contenido}</Button>
    )
  }
/* zona 2: main(ejecución) */

export default function App() {
  return (

    <View style={styles.container}>
      
      <Boton></Boton>
      <Texto></Texto>
      <Texto></Texto>
      <Texto></Texto>
      <StatusBar style="auto" />
    </View>
  );
}

/* zona 3: Estética del screen */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
