import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from '../components/CustomButton';

const DashboardScreen = ({ navigation }: any) => {  // Typage basique, on améliorera
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Tableau de bord Fiscal</Text>
      <Text style={[styles.subtitle, { color: Colors[theme].text }]}>Vos déclarations en un clic.</Text>
      <CustomButton
        title="Générer une déclaration"
        onPress={() => console.log('Déclaration lancée !')}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Retour</Text>
      </TouchableOpacity>
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
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backText: {
    fontSize: 16,
    color: '#007AFF',  // Primary blue
  },
});

export default DashboardScreen;