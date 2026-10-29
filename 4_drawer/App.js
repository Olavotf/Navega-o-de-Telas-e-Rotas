import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

function TelaHome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Início</Text>
      <Text>Deslize da esquerda para abrir o menu</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Config', { tema: 'escuro' })}
      >
        <Text style={styles.buttonText}>Ir para Config com tema</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaConfiguracoes({ route }) {
  const tema = route.params?.tema || 'claro';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <Text>Tema atual: {tema}</Text>
    </View>
  );
}

function TelaSobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text>Aplicativo de exemplo de navegação.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={TelaHome}
          options={{ title: 'Início' }}
        />
        <Drawer.Screen
          name="Config"
          component={TelaConfiguracoes}
          options={{ title: 'Configurações' }}
        />
        <Drawer.Screen name="Sobre" component={TelaSobre} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
