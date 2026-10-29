import React, { useState } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

const Stack = createNativeStackNavigator();

const produtos = [
  { id: '1', nome: 'Teclado', preco: 120, descricao: 'Teclado USB para computador.' },
  { id: '2', nome: 'Mouse', preco: 75.5, descricao: 'Mouse óptico com conexão USB.' },
  { id: '3', nome: 'Headset', preco: 180, descricao: 'Headset para jogos e chamadas.' },
  { id: '4', nome: 'Monitor', preco: 899.9, descricao: 'Monitor Full HD de 24 polegadas.' },
];

function TelaInicial({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercício 2</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detalhes', { nome, email, idade })}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Lista')}
      >
        <Text style={styles.buttonText}>Ver produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Notificacoes')}
      >
        <Text style={styles.secondaryText}>Notificações</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaDetalhes({ route, navigation }) {
  const { nome = '', email = '', idade = '' } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes</Text>
      <Text>Nome: {nome}</Text>
      <Text>E-mail: {email}</Text>
      <Text>Idade: {idade}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaLista({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>

      <FlatList
        style={styles.list}
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.product}
            onPress={() =>
              navigation.navigate('Produto', {
                nome: item.nome,
                preco: item.preco,
                descricao: item.descricao,
              })
            }
          >
            <Text style={styles.productName}>{item.nome}</Text>
            <Text>R$ {item.preco.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Notificacoes')}
      >
        <Text style={styles.secondaryText}>Ir para Notificações</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaProduto({ route, navigation }) {
  const { nome, preco, descricao } = route.params || {};
  const pedidoId = route.params?.pedidoId || 'N/A';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nome}</Text>
      <Text>Preço: R$ {Number(preco).toFixed(2)}</Text>
      <Text>Descrição: {descricao}</Text>
      <Text>Pedido #{pedidoId}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar à lista</Text>
      </TouchableOpacity>
    </View>
  );
}

function TelaNotificacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text>Você não possui novas notificações.</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={TelaInicial} options={{ title: 'Home' }} />
        <Stack.Screen name="Detalhes" component={TelaDetalhes} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Lista" component={TelaLista} options={{ title: 'Lista de Produtos' }} />
        <Stack.Screen name="Produto" component={TelaProduto} options={{ title: 'Produto' }} />
        <Stack.Screen name="Notificacoes" component={TelaNotificacoes} options={{ title: 'Notificações' }} />
      </Stack.Navigator>
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
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryText: {
    color: '#007AFF',
    fontSize: 16,
  },
  list: {
    marginBottom: 10,
  },
  product: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
