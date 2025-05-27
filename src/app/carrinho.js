// carrinho.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Carrinho = () => {
  const [produtos, setProdutos] = useState([
    { id: '1', nome: 'Relógio Clássico', preco: 350.0, quantidade: 1 },
    { id: '2', nome: 'Pulseira de Couro', preco: 80.0, quantidade: 1 },
  ]);
  const [cupom, setCupom] = useState('');

  const alterarQuantidade = (id, delta) => {
    setProdutos((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: Math.max(1, item.quantidade + delta),
            }
          : item
      )
    );
  };

  const removerProduto = (id) => {
    setProdutos((prev) => prev.filter((item) => item.id !== id));
  };

  const aplicarCupom = () => {
    if (cupom.toLowerCase() === 'desconto10') {
      Alert.alert('Cupom aplicado!', 'Você ganhou 10% de desconto.');
    } else {
      Alert.alert('Cupom inválido', 'Verifique o código e tente novamente.');
    }
  };

  const finalizarPedido = () => {
    Alert.alert('Pedido Finalizado', 'Obrigado pela sua compra!');
  };

  const calcularTotal = () => {
    const subtotal = produtos.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    return subtotal.toFixed(2).replace('.', ',');
  };

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
            <Text style={styles.preco}>R$ {(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</Text>
            <View style={styles.qtdContainer}>
              <TouchableOpacity onPress={() => alterarQuantidade(item.id, -1)} style={styles.qtdBtn}>
                <Text style={styles.qtdText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtdNumero}>{item.quantidade}</Text>
              <TouchableOpacity onPress={() => alterarQuantidade(item.id, 1)} style={styles.qtdBtn}>
                <Text style={styles.qtdText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removerProduto(item.id)} style={styles.removerBtn}>
              <Text style={styles.removerText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.cupomContainer}>
        <TextInput
          style={styles.cupomInput}
          placeholder="Digite seu cupom"
          value={cupom}
          onChangeText={setCupom}
        />
        <TouchableOpacity onPress={aplicarCupom} style={styles.cupomBtn}>
          <Text style={styles.cupomBtnText}>Aplicar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalText}>Total: R$ {calcularTotal()}</Text>

      <TouchableOpacity style={styles.finalizarBtn} onPress={finalizarPedido}>
        <Text style={styles.finalizarText}>Finalizar Pedido</Text>
      </TouchableOpacity>

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
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  qtdBtn: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  qtdText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtdNumero: {
    fontSize: 16,
  },
  removerBtn: {
    marginTop: 10,
  },
  removerText: {
    color: '#d00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cupomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 10,
  },
  cupomInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  cupomBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  cupomBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  finalizarBtn: {
    backgroundColor: '#008060',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  finalizarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Carrinho;
