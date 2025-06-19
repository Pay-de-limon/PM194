// Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,ScrollView } from 'react-native';
import React, { useState } from 'react';

const Texto = ({style}) => {
  const [ contenido, setContenido] = useState('Hola Mundo RNative');
  const actualizarTexto = () => {setContenido('Hola mundo como estas?')};
  return (
    <view style={{margin: 10}}>
    <Text style={[styles.text, style]}>{contenido}</Text>
    <Button title ='actualizartexto' on onPress={actualizarTexto} color = "orange"/>
    </view>
  )
};



// Zona 2: Main - Ejecucion
//Siempre debe estar dentro de un view
export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Texto style={styles.red}></Texto>
      <Texto style={styles.blue}></Texto>
      <Texto style={styles.green}></Texto>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

// Zona 3
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexDirection: 'row'
    
  },
  text:{
    color: 'white',
    fontSize: 27,
    
  },
  red: {backgroundColor: 'red'},
  green: {backgroundColor: 'green'},
  blue: {backgroundColor: 'blue'},
});