import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;

  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const toggleMenu = () => {
    const toValue = menuVisible ? Dimensions.get('window').width : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible));
  };

  const handleNavigate = (screen) => {
    toggleMenu();
    router.push(`/${screen}`);
  };

  const menuItems = [
    { id: 1, name: 'Loja', icon: 'cart', screen: 'loja' },
    { id: 2, name: 'Sobre', icon: 'information-circle', screen: 'sobre' },
    { id: 3, name: 'Contato', icon: 'mail', screen: 'contato' },
  ];

  const onlyNumbers = (text) => text.replace(/\D/g, '');

  const formatCPF = (text) => {
    let digits = onlyNumbers(text).slice(0, 11);
    digits = digits.padEnd(11, '');
    let formatted = digits;

    if (digits.length > 3 && digits.length <= 6)
      formatted = digits.slice(0, 3) + '.' + digits.slice(3);
    else if (digits.length > 6 && digits.length <= 9)
      formatted = digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6);
    else if (digits.length > 9)
      formatted =
        digits.slice(0, 3) +
        '.' +
        digits.slice(3, 6) +
        '.' +
        digits.slice(6, 9) +
        '-' +
        digits.slice(9, 11);

    return formatted;
  };

  const formatDate = (text) => {
    let digits = onlyNumbers(text).slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
  };

  const formatTelefone = (text) => {
    let digits = onlyNumbers(text).slice(0, 11);
    if (digits.length <= 2) return '(' + digits;
    if (digits.length <= 7) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
    return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
  };

  const handleForgotPassword = () => {
    setLoginVisible(false);
    Alert.alert(
      'Recuperação de Senha',
      'Enviaremos um link de recuperação para o seu e-mail, se ele estiver cadastrado.',
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.titleWrapper}>
          <Text style={styles.headerTitle}>ARTFY</Text>
        </TouchableOpacity>

        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => setLoginVisible(true)} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={35} color="#232637" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
            <Ionicons name="menu" size={33} color="#232637" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Lateral */}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.slideMenuWrapper}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>MENU</Text>
              <TouchableOpacity onPress={toggleMenu}>
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>

            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleNavigate(item.screen)}
              >
                <Ionicons name={item.icon} size={24} color="black" />
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.menuDivider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('meus-pedidos')}>
              <Ionicons name="document-text" size={24} color="black" />
              <Text style={styles.menuText}>Meus Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate('carrinho')}>
              <Ionicons name="cart" size={24} color="black" />
              <Text style={styles.menuText}>Carrinho</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Modal Login */}
      <Modal visible={loginVisible} animationType="fade" transparent onRequestClose={() => setLoginVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login</Text>

            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Senha"
                secureTextEntry={!showLoginPassword}
              />
              <TouchableOpacity onPress={() => setShowLoginPassword(!showLoginPassword)}>
                <Ionicons
                  name={showLoginPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setLoginVisible(false);
              setRegisterVisible(true);
            }}>
              <Text style={styles.cancelText}>Cadastrar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLoginVisible(false)}>
              <Text style={[styles.cancelText, { marginTop: 5 }]}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Cadastro */}
      <Modal visible={registerVisible} animationType="slide" transparent onRequestClose={() => setRegisterVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Cadastro</Text>

              <TextInput style={styles.input} placeholder="Nome completo" />

              <TextInput
                style={styles.input}
                placeholder="CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={(text) => setCpf(formatCPF(text))}
                maxLength={14}
              />

              <TextInput
                style={styles.input}
                placeholder="Data de nascimento"
                keyboardType="numeric"
                value={dataNascimento}
                onChangeText={(text) => setDataNascimento(formatDate(text))}
                maxLength={10}
              />

              <TextInput
                style={styles.input}
                placeholder="Telefone"
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={(text) => setTelefone(formatTelefone(text))}
                maxLength={15}
              />

              <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Senha"
                  secureTextEntry={!showRegisterPassword}
                />
                <TouchableOpacity onPress={() => setShowRegisterPassword(!showRegisterPassword)}>
                  <Ionicons
                    name={showRegisterPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirmar senha"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Cadastrar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setRegisterVisible(false)}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#232637',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#232637',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 45,
  },
  passwordInput: {
    flex: 1,
  },
  forgotPassword: {
    color: '#0066cc',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#232637',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 10,
  },
  menuContainer: {
    position: 'absolute',
    top: 70,
    right: 0,
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  slideMenuWrapper: {
    flex: 1,
    padding: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 18,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});
