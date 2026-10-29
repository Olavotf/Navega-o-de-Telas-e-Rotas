import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const contatos = [
  { id: '1', nome: 'Ana', telefone: '(21) 99999-1111', email: 'ana@email.com', favorito: true },
  { id: '2', nome: 'Bruno', telefone: '(21) 99999-2222', email: 'bruno@email.com', favorito: false },
  { id: '3', nome: 'Carlos', telefone: '(21) 99999-3333', email: 'carlos@email.com', favorito: true },
  { id: '4', nome: 'Daniela', telefone: '(21) 99999-4444', email: 'daniela@email.com', favorito: false },
];

function TelaListaContatos({ navigation, favoritos = false }) {
  const lista = favoritos
    ? contatos.filter((item) => item.favorito)
    : contatos;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {favoritos ? 'Favoritos' : 'Todos os contatos'}
      </Text>

      <FlatList
        style={styles.list}
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ContatoDetalhe', item)}
          >
            <Text style={styles.itemTitle}>{item.nome}</Text>
            <Text>{item.telefone}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function TelaTodos({ navigation }) {
  return <TelaListaContatos navigation={navigation} favoritos={false} />;
}

function TelaFavoritos({ navigation }) {
  return <TelaListaContatos navigation={navigation} favoritos={true} />;
}

function ContatosDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Todos" component={TelaTodos} />
      <Drawer.Screen name="Favoritos" component={TelaFavoritos} />
    </Drawer.Navigator>
  );
}

function TelaContatoDetalhe({ route, navigation }) {
  const { nome, telefone, email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text>Telefone: {telefone}</Text>
      <Text>E-mail: {email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function ContatosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContatosDrawer"
        component={ContatosDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContatoDetalhe"
        component={TelaContatoDetalhe}
        options={{ title: 'Detalhes do contato' }}
      />
    </Stack.Navigator>
  );
}

function TelaSobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text>Aplicativo de contatos.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Contatos"
          component={ContatosStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Sobre" component={TelaSobre} />
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
