import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { CustomButton } from '../components/CustomButton';
import { Colors } from '../constants/Colors';

const WelcomeScreen = ({navigation} : any) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Bienvenue dans Kalar Fiscal !</Text>
      <Text style={[styles.subtitle, { color: Colors[theme].text }]}>Module d'aide à la déclaration fiscale.</Text>
      <CustomButton
        title="Paramétrer mon profil fiscal"
        onPress={() => navigation.navigate('ProfileSetup')}
        icon={{ uri: 'https://example.com/icon.png' }}  // Mock icône, remplace par local plus tard
      />
      <CustomButton
        title={`Changer de thème (${theme === 'light' ? 'Dark' : 'Light'})`}
        onPress={toggleTheme}
        loading={false}
      />
    </View>
  );
};

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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default WelcomeScreen;