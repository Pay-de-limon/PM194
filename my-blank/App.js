/* zona 1: Importaciones */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

const Texto=(props)=>{
  const {contenido}=props
  return(
    <Text>{contenido}</Text>
  )


  };
/* zona 2: main(ejecución) */

export default function App() {
  return (

    <View style={styles.container}>
      
      <Button title ="Trabaja!!"></Button>
      <Texto contenido ="hola"></Texto>
      <Texto contenido ="mundo"></Texto>
      <Texto contenido ="React Native"></Texto>
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
