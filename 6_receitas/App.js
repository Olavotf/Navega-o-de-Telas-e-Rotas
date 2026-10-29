import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const receitas = [
  {
    id: '1',
    nome: 'Macarrão',
    tempo: '20 minutos',
    ingredientes: 'Macarrão, molho de tomate, sal e queijo.',
  },
  {
    id: '2',
    nome: 'Omelete',
    tempo: '10 minutos',
    ingredientes: 'Ovos, sal, queijo e tomate.',
  },
  {
    id: '3',
    nome: 'Panqueca',
    tempo: '25 minutos',
    ingredientes: 'Farinha, leite, ovos e açúcar.',
  },
  {
    id: '4',
    nome: 'Arroz com frango',
    tempo: '40 minutos',
    ingredientes: 'Arroz, frango, alho, cebola e sal.',
  },
];

function TelaReceitas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas</Text>

      <FlatList
        style={styles.list}
        data={receitas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('DetalheReceita', item)}
          >
            <Text style={styles.itemTitle}>{item.nome}</Text>
            <Text>Tempo: {item.tempo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function TelaDetalheReceita({ route, navigation }) {
  const { nome, tempo, ingredientes } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text>Tempo de preparo: {tempo}</Text>
      <Text style={styles.subtitle}>Ingredientes</Text>
      <Text>{ingredientes}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function ReceitasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaReceitas"
        component={TelaReceitas}
        options={{ title: 'Receitas' }}
      />
      <Stack.Screen
        name="DetalheReceita"
        component={TelaDetalheReceita}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}

function TelaFavoritos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text>Receita favorita: Omelete</Text>
      <Text>Tempo: 10 minutos</Text>
      <Text>Ovos, sal, queijo e tomate.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Receitas"
          component={ReceitasStack}
          options={{ title: 'Receitas' }}
        />
        <Tab.Screen
          name="Favoritos"
          component={TelaFavoritos}
          options={{ title: 'Favoritos' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  list: {
    width: '100%',
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
