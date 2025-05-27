import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobreNosScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header
        style={styles.headerWrapper}
        onMenuPress={() => router.push('/menu')}
        onLoginPress={() => router.push('/login')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Seção de introdução */}
        <View style={styles.introSection}>
          <Text style={styles.headline}>SOBRE NÓS</Text>
          <Text style={styles.subheadline}>
            Durante anos, temos sido referência em qualidade e inovação. 
            Nossos produtos são criados para superar expectativas e entregar valor real.
          </Text>
        </View>

        {/* Imagem 1 */}
        <Image
          source={{ uri: 'https://f.i.uol.com.br/fotografia/2021/08/31/1630380104612da048a9fb7_1630380104_3x2_md.jpg' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Missão */}
        <View style={styles.introSection}>
          <Text style={styles.headline}>Nossa Missão</Text>
          <Text style={styles.subheadline}>
            Oferecer experiências marcantes através de produtos confiáveis e um atendimento incomparável.
          </Text>
        </View>

        {/* Imagem 2 */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4O-YN1hOZuvgUWaIiCTZsR3l6dFWeKEmwxMEAi3OvE5L84RMbN73bBq-vvdX_Zwn72e0&usqp=CAU' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Valores */}
        <View style={styles.introSection}>
          <Text style={styles.headline}>Nossos Valores</Text>
          <Text style={styles.subheadline}>• Qualidade em cada detalhe.</Text>
          <Text style={styles.subheadline}>• Transparência com clientes e parceiros.</Text>
          <Text style={styles.subheadline}>• Inovação como essência do nosso trabalho.</Text>
        </View>

        {/* Imagem 3 */}
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKwi4StZpe2UDIsVFSYjsmkbMQlhmsDLy4Pw&s' }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Carrossel de Cards */}
        <View style={styles.cardsSection}>
          <Text style={styles.headline}>Conheça mais da nossa loja</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
            <TouchableOpacity style={styles.card} onPress={() => router.push('/loja')}>
              <Image
                source={{ uri: 'https://tantize.com.br/wp-content/uploads/2024/07/Obras-de-Arte-Johannes-Vermeer-Meisje-met-de-parel-_-Mauritshuis.jpg' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Arte Digital</Text>
              <Text style={styles.cardText}>
                Cores vibrantes e pincéis profissionais para sua criatividade florescer.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/loja')}>
              <Image
                source={{ uri: 'https://arteref.com/wp-content/uploads/2019/04/mona-lisa-leonardo-da-vinci.jpg' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Pintura</Text>
              <Text style={styles.cardText}>
                Ideal para artistas exigentes. Pigmentação intensa e acabamento duradouro.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/loja')}>
              <Image
                source={{ uri: 'https://arteref.com/wp-content/uploads/2019/04/mona-lisa-leonardo-da-vinci.jpg' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Escultura</Text>
              <Text style={styles.cardText}>
                Ideal para artistas exigentes. Pigmentação intensa e acabamento duradouro.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/loja')}>
              <Image
                source={{ uri: 'https://tantize.com.br/wp-content/uploads/2024/07/Obras-de-Arte-Johannes-Vermeer-Meisje-met-de-parel-_-Mauritshuis.jpg' }}
                style={styles.cardImage}
              />
              <Text style={styles.cardTitle}>Fotografia</Text>
              <Text style={styles.cardText}>
                Decore com peças únicas feitas por artistas independentes.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        {/* Footer fora do ScrollView */}
      <Footer />
      </ScrollView>

      
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#fff',
    zIndex: 1000,
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  scrollContent: {
    paddingTop: 60, // espaço para o header fixo
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  introSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headline: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#232637',
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: 1,
  },
  subheadline: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  bannerImage: {
    width: screenWidth,
    height: 200,
  },
  cardsSection: {
    paddingVertical: 30,
  },
  carousel: {
    paddingLeft: 20,
  },
  card: {
    width: screenWidth * 0.6,
    marginRight: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232637',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  cardText: {
    fontSize: 13,
    color: '#555',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
});
