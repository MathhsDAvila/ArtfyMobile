import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Easing,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LojaScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // --- filtros
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');







  const categories = ['Todos', 'Arte Digital', 'Pinturas', 'Esculturas'];

  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 0.8; // 80% da largura da tela

  // Slide animation: começa fora da tela à direita, no valor menuWidth (largura do menu)
  const slideAnim = useRef(new Animated.Value(menuWidth)).current;

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: menuWidth,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible, menuWidth, slideAnim]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const products = [
    {
      id: 1,
      name: 'Relógio Clássico',
      price: 299.9,
      image: require('../../assets/escultura.jpg'),
      category: 'Pinturas',
    },
    {
      id: 2,
      name: 'Relógio Esportivo',
      price: 399.9,
      image: require('../../assets/escultura.jpg'),
      category: 'Arte Digital',
    },
    {
      id: 3,
      name: 'Relógio Digital',
      price: 199.9,
      image: require('../../assets/escultura.jpg'),
      category: 'Arte Digital',
    },
    {
      id: 4,
      name: 'Relógio Casual',
      price: 249.9,
      image: require('../../assets/escultura.jpg'),
      category: 'Pinturas',
    },
    {
      id: 5,
      name: 'Relógio Luxo',
      price: 599.9,
      image: require('../../assets/escultura.jpg'),
      category: 'Esculturas',
    },
  ];

  const displayedProducts = products.filter(
    (p) => selectedCategory === 'Todos' || p.category === selectedCategory
  );

  const menuItems = [
    { id: 1, name: 'Loja', icon: 'cart', screen: 'loja' },
    { id: 2, name: 'Sobre', icon: 'information-circle', screen: 'sobre' },
    { id: 3, name: 'Contato', icon: 'mail', screen: 'contato' },
  ];

  const handleNavigate = (screen) => {
    toggleMenu();
    router.push(`/${screen}`);
  };

  return (
    <View style={styles.container}>
      <Header onMenuPress={toggleMenu} onLoginPress={() => setLoginVisible(true)} />

      {/* Botão de filtro */}
      <View style={styles.filterBar}>
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilter}>
          <Ionicons name="filter" size={18} color="#fff" />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
        <Text style={styles.selectedCategory}>{selectedCategory}</Text>
      </View>

      {/* Modal de filtros */}
      <FilterModal
        visible={filterVisible}
        categories={categories}
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          setFilterVisible(false);
        }}
        onClose={() => setFilterVisible(false)}
      />

      <LoginModal
        visible={loginVisible}
        onClose={() => setLoginVisible(false)}
        onRegister={() => {
          setLoginVisible(false);
          setShowRegister(true);
        }}
      />

      <RegisterModal visible={showRegister} onClose={() => setShowRegister(false)} />

      {menuVisible && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              width: menuWidth,
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <SlideMenu items={menuItems} onClose={toggleMenu} onItemPress={handleNavigate} />
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={[styles.content, ]}>
        <Text style={styles.title}>Nossa Galeria</Text>
        <Text style={styles.description}>
          Confira nossos melhores produtos e aproveite as ofertas exclusivas para você!
        </Text>

        {/* Lista de produtos */}
        {displayedProducts.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardPrice}>R$ {item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={() => alert(`Comprar: ${item.name}`)}
              >
                <Text style={styles.buyButtonText}>Comprar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cartIconButton}
                onPress={() => alert(`Adicionar ao carrinho: ${item.name}`)}
              >
                <Ionicons name="cart-outline" size={20} color="#0066cc" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Footer />
      </ScrollView>
    </View>
    
  );
}

/* -------------------------------------------------------------------------- */
/*                                MODAIS                                      */
/* -------------------------------------------------------------------------- */

const LoginModal = ({ visible, onClose, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Login</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.cancelText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={[styles.cancelText, { marginTop: 5 }]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const RegisterModal = ({ visible, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const maskCPF = (text) =>
    text
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  const maskPhone = (text) =>
    text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15);

  const maskDate = (text) =>
    text
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .substring(0, 10);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
            <Text style={styles.modalTitle}>Cadastro</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              value={cpf}
              onChangeText={(text) => setCpf(maskCPF(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Data de nascimento"
              value={birthDate}
              onChangeText={(text) => setBirthDate(maskDate(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={phone}
              onChangeText={(text) => setPhone(maskPhone(text))}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.cancelText, { marginTop: 5 }]}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
          <Footer />
        </View>
      </View>
    </Modal>
  );
};

const FilterModal = ({ visible, categories, selected, onSelect, onClose }) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={styles.modalOverlay}>
      <View style={[styles.modalContainer, { paddingBottom: 10 }]}>
        <Text style={styles.modalTitle}>Escolha uma categoria</Text>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryOption, selected === cat && styles.categoryOptionActive]}
            onPress={() => onSelect(cat)}
          >
            <Text style={styles.categoryOptionText}>{cat}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
          <Text style={styles.cancelText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const SlideMenu = ({ items, onClose, onItemPress }) => {
  return (
    <View style={styles.menuContent}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={30} color="#333" />
      </TouchableOpacity>

      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => onItemPress(item.screen)}
        >
          <Ionicons name={item.icon} size={24} color="#333" />
          <Text style={styles.menuItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  STYLES                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#232637',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  filterButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  selectedCategory: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    
      paddingTop: 40, // espaço para o header fixo
      paddingBottom: 0,
      backgroundColor: 'white',
    },
    
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#232637',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#232637',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {
    marginLeft: 10,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  cardPrice: {
    fontSize: 16,
    color: '#232637',
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: '#232637',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartIconButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuContent: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    textAlign: 'center',
    color: '#0066cc',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  categoryOption: {
    borderWidth: 1,
    borderColor: '#232637',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  categoryOptionActive: {
    backgroundColor: '#232637',
  },
  categoryOptionText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#232637',
  },
  
});
