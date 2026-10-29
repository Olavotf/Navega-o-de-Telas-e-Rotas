import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const filmes = [
  { id: '1', titulo: 'Matrix', ano: 1999 },
  { id: '2', titulo: 'Toy Story', ano: 1995 },
  { id: '3', titulo: 'Shrek', ano: 2001 },
  { id: '4', titulo: 'Avatar', ano: 2009 },
  { id: '5', titulo: 'Homem-Aranha', ano: 2002 },
];

function TelaLista({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filmes</Text>

      <FlatList
        style={styles.list}
        data={filmes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate('Filme', {
                titulo: item.titulo,
                ano: item.ano,
              })
            }
          >
            <Text style={styles.itemTitle}>{item.titulo}</Text>
            <Text>{item.ano}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function TelaFilme({ route, navigation }) {
  const { titulo, ano } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <Text>Ano: {ano}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaHome() {
  return (
    <View style={styles.container}>
      <Text>Escolha um filme na lista.</Text>
    </View>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lista"
        component={TelaLista}
        options={{ title: 'Início' }}
      />
      <Stack.Screen name="Filme" component={TelaFilme} />
    </Stack.Navigator>
  );
}

function PerfilTab({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('HomeTab', {
            screen: 'Filme',
            params: { titulo: 'Matrix', ano: 1999 },
          })
        }
      >
        <Text style={styles.buttonText}>Ver filme favorito</Text>
      </TouchableOpacity>
    </View>
  );
}

function OutraTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outra aba</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{ title: 'Início' }}
        />
        <Tab.Screen name="Perfil" component={PerfilTab} />
        <Tab.Screen name="Outra" component={OutraTab} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/*
5.b:
Antes poderiam aparecer dois headers porque existe um navegador Tab
e, dentro dele, um navegador Stack. O headerShown: false no Tab
esconde o header externo, deixando o header do Stack.

O header do Tab pertence ao navegador de abas.
O header do Stack pertence à pilha de telas e acompanha a navegação
entre Lista e Filme.
*/

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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
});
