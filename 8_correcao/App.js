import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

function TelaA({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela A</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('B')}
      >
        <Text style={styles.buttonText}>Ir</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaB({ route, navigation }) {
  // TelaB pode ser aberta sem params, então usamos ?. e um valor padrão.
  const nome = route.params?.nome || 'Nenhum nome informado';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela B</Text>
      <Text>{nome}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="A">
        <Stack.Screen name="A" component={TelaA} />
        <Stack.Screen name="B" component={TelaB} />
      </Stack.Navigator>
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
