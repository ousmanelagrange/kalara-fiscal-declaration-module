import React, { use } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';  // Basique, on customisera
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;  // Simule md: pour grille

const ProfileCompletion = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();


  return (
    <LinearGradient
      colors={['#FFFFFF', '#F8FAFC']}  // Gradient subtle (adapte pour dark)
      style={styles.gradient}
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Progress Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>Profil de l'entreprise</Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Complétez les informations de votre entreprise</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.progressText, { color: Colors[theme].text + '80' }]}>Progression</Text>
            <Text style={[styles.progressValue, { color: Colors[theme].semantic.primaryBlue }]}>35%</Text>
          </View>
        </View>
            <Progress.Bar 
            progress={0.35} 
            width={screenWidth - 48} 
            color={Colors[theme].semantic.primaryBlue}  // Ajoute couleur thémée
            unfilledColor={Colors[theme].text + '20'}   // Fond gris clair
            borderWidth={0}
            height={8}
            style={styles.progress}
            />
        {/* Main Form Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="business-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Informations légales</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Renseignez les données officielles de votre entreprise</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.grid}>
              {/* Raison sociale */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>
                  <Ionicons name="business-outline" size={16} color={Colors[theme].semantic.primaryBlue} /> Raison sociale *
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Ex: SARL Kalar Technologies"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* NIU */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>
                  <Ionicons name="briefcase-outline" size={16} color={Colors[theme].semantic.primaryBlue} /> Numéro NIU *
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="M051234567890A"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
                <Text style={[styles.helperText, { color: Colors[theme].text + '60' }]}>Numéro d'Identification Unique DGI</Text>
              </View>

              {/* RCCM */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Numéro RCCM</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="RC/DLA/2024/B/1234"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* Forme juridique */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>Forme juridique *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue="auto"
                    style={styles.picker}
                    onValueChange={(itemValue) => console.log(itemValue)}
                    dropdownIconColor={Colors[theme].text + '60'}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Auto-entrepreneur" value="auto" />
                    <Picker.Item label="Entreprise Individuelle" value="ei" />
                    <Picker.Item label="SARL" value="sarl" />
                    <Picker.Item label="SA" value="sa" />
                    <Picker.Item label="SAS" value="sas" />
                    <Picker.Item label="SUARL" value="suarl" />
                  </Picker>
                </View>
              </View>

              {/* Secteur d'activité */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>Secteur d'activité *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue="commerce"
                    style={styles.picker}
                    onValueChange={(itemValue) => console.log(itemValue)}
                    dropdownIconColor={Colors[theme].text + '60'}
                  >
                    <Picker.Item label="Choisissez" value="" />
                    <Picker.Item label="Commerce général" value="commerce" />
                    <Picker.Item label="Prestations de services" value="services" />
                    <Picker.Item label="Production/Fabrication" value="production" />
                    <Picker.Item label="Import/Export" value="import" />
                    <Picker.Item label="BTP" value="btp" />
                    <Picker.Item label="Transport" value="transport" />
                    <Picker.Item label="Technologies" value="tech" />
                    <Picker.Item label="Agroalimentaire" value="agro" />
                  </Picker>
                </View>
              </View>

              {/* Description activité */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Description de l'activité</Text>
                <TextInput
                  style={[styles.textarea, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Décrivez brièvement votre activité principale..."
                  placeholderTextColor={Colors[theme].text + '60'}
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Coordonnées Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
              <Ionicons name="location-outline" size={24} color={Colors[theme].semantic.primaryBlue + '80'} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Coordonnées</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Adresse et contacts de l'entreprise</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.grid}>
              {/* Adresse */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>
                  <Ionicons name="location-outline" size={16} color={Colors[theme].semantic.primaryBlue + '80'} /> Adresse complète *
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Ex: Avenue Kennedy, Immeuble Central"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* Ville */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>Ville *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue="douala"
                    style={styles.picker}
                    onValueChange={(itemValue) => console.log(itemValue)}
                    dropdownIconColor={Colors[theme].text + '60'}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Douala" value="douala" />
                    <Picker.Item label="Yaoundé" value="yaounde" />
                    <Picker.Item label="Bafoussam" value="bafoussam" />
                    <Picker.Item label="Garoua" value="garoua" />
                    <Picker.Item label="Bamenda" value="bamenda" />
                    <Picker.Item label="Maroua" value="maroua" />
                    <Picker.Item label="Ngaoundéré" value="ngaoundere" />
                  </Picker>
                </View>
              </View>

              {/* Code postal */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Code postal</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Ex: BP 1234"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* Téléphone */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>
                  <Ionicons name="call-outline" size={16} color={Colors[theme].semantic.primaryBlue + '80'} /> Téléphone *
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="+237 6XX XX XX XX"
                  placeholderTextColor={Colors[theme].text + '60'}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>
                  <Ionicons name="mail-outline" size={16} color={Colors[theme].semantic.primaryBlue + '80'} /> Email professionnel *
                </Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="contact@entreprise.cm"
                  placeholderTextColor={Colors[theme].text + '60'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Représentant Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
              <Ionicons name="person-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Représentant légal</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Informations du gérant ou dirigeant</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.grid}>
              {/* Nom */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>Nom *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Nom du représentant"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* Prénom */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }, styles.required]}>Prénom(s) *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="Prénom(s)"
                  placeholderTextColor={Colors[theme].text + '60'}
                />
              </View>

              {/* Fonction */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Fonction</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue="gerant"
                    style={styles.picker}
                    onValueChange={(itemValue) => console.log(itemValue)}
                    dropdownIconColor={Colors[theme].text + '60'}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Gérant" value="gerant" />
                    <Picker.Item label="Directeur Général" value="dg" />
                    <Picker.Item label="Président" value="president" />
                    <Picker.Item label="Administrateur" value="admin" />
                  </Picker>
                </View>
              </View>

              {/* Téléphone rep */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Téléphone</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="+237 6XX XX XX XX"
                  placeholderTextColor={Colors[theme].text + '60'}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Email rep */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Email</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="representant@entreprise.cm"
                  placeholderTextColor={Colors[theme].text + '60'}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Enregistrer le brouillon"
            onPress={() => console.log('Brouillon sauvé')}
            // Variant outline : On customisera CustomButton pour ça plus tard
        />
          <CustomButton
            title="Suivant : Configuration fiscale"
            onPress={() => navigation.navigate('CompanySetup')}  // Mise à jour            
            icon="arrow-forward"  
          />
          
        </View>

        <Text style={[styles.footer, { color: Colors[theme].text + '60' }]}>
          * Champs obligatoires • Vos données sont sécurisées et conformes aux normes DGI
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  progress: {
    height: 8,
    marginBottom: 32,
    borderRadius: 4,  // Coins arrondis pour look moderne
    },
  gradient: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  progressText: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,  // Android
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#EFF6FF',  // Adapts via theme
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  cardContent: {
    padding: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  inputGroup: {
    width: '48%',
    marginBottom: 20,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',  // Rouge pour * (override theme si besoin)
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textarea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 80,
    textAlignVertical: 'top',
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  picker: {
    height: 44,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProfileCompletion;

function useNavigation(): any {
    throw new Error('Function not implemented.');
}
