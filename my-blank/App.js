// Zona 1: Importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Switch } from 'react-native';
import React, { use, useState } from 'react';


const Interruptor = () => {
  const [isEnabled, setIsEnable] = useState (false);
  const toggleSwitch = () => setIsEnable(previousState => !previousState);
  
  return (
    <View style={styles.container}>
   
      <Text>
        {isEnabled ? 'Activado': 'Desactivado'}
      </Text>
      <Switch 
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value = {isEnabled}
      />
    </View>

  )
}
// Zona 2: Main - Ejecucion
//Siempre debe estar dentro de un view
export default function App() {
  return (
    <View style = {styles.container}>
      <Interruptor />
    </View>
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