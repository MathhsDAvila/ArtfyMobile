// carrinho.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header'; // ajuste o caminho conforme sua estrutura
import Footer from '../components/Footer'; // idem

const Carrinho = () => {
  // Exemplo estático para visualizar layout
  const produtos = [
    { id: '1', nome: 'Relógio Clássico', preco: 'R$ 350,00' },
    { id: '2', nome: 'Pulseira de Couro', preco: 'R$ 80,00' },
  ];

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.title}>🛒 Seu Carrinho</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
          </View>
        )}
      />

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#fafafa',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: '500',
  },
  preco: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
});

export default Carrinho;
