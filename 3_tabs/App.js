import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function TelaHome() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Text>Contador: {contador}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setContador(contador + 1)}
      >
        <Text style={styles.buttonText}>Incrementar</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaBusca() {
  const [busca, setBusca] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Busca</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite uma busca"
        value={busca}
        onChangeText={setBusca}
      />
      <Text>Você digitou: {busca}</Text>
    </View>
  );
}

function TelaPerfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#28a745',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="Home"
          component={TelaHome}
          options={{ tabBarLabel: 'Início', tabBarIcon: () => <Text>H</Text> }}
        />
        <Tab.Screen
          name="Busca"
          component={TelaBusca}
          options={{ tabBarLabel: 'Busca', tabBarIcon: () => <Text>B</Text> }}
        />
        <Tab.Screen
          name="Perfil"
          component={TelaPerfil}
          options={{ tabBarLabel: 'Perfil', tabBarIcon: () => <Text>P</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
Resposta do 3.c:
Sim. O contador da Home mantém o valor quando volto para a aba.
O texto digitado na Busca também é mantido.
Cada aba possui seu próprio estado.
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
  },
});
