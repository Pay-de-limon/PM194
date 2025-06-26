import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ImageBackground,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [tyc, setTyc] = useState(false);

  const registro = () => {
    if (!name.trim() || !mail.trim()) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    if (!tyc) {
      Alert.alert('Error', 'Debes aceptar los términos y condiciones.');
      return;
    }
    Alert.alert('Registro exitoso', `Name: ${name}\nMail: ${mail}`);
  };

  return (
    <ImageBackground
      source={require('./assets/nubes.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      
      
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Registro de Usuario</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#ccc"
              onChangeText={setName}
              value={name}
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#ccc"
              keyboardType="email"
              onChangeText={setMail}
              value={mail}
            />

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Aceptar términos y condiciones</Text>
              <Switch value={tyc} onValueChange={setTyc} />
            </View>

            <TouchableOpacity onPress={registro} style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchText: {
    color: 'white',
    fontSize: 14,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#0af',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
