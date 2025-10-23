import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const steps = [
  { id: 1, name: "Informations", completed: true },
  { id: 2, name: "Régime fiscal", completed: false },
  { id: 3, name: "TVA", completed: false },
  { id: 4, name: "Confirmation", completed: false },
];

const CompanySetup = ({navigation}: any) => {
  const { theme } = useTheme();
  //const navigation = useNavigation();  // Hook pour nav
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    status: '',
    regime: '',
    niu: '',
    period: '',
    activity: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };



  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const renderStep = (step: typeof steps[0], index: number) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={[
        styles.stepCircle,
        step.completed ? { backgroundColor: '#10B981' } : step.id === currentStep ? { backgroundColor: Colors[theme].semantic.primaryBlue } : { backgroundColor: Colors[theme].text + '20' }
      ]}>
        {step.completed ? (
          <Ionicons name="checkmark" size={20} color="#FFFFFF" />
        ) : (
          <Text style={styles.stepNum}>{step.id}</Text>
        )}
      </View>
      <Text style={[styles.stepName, { color: Colors[theme].text + '80' }]}>{step.name}</Text>
      {index < steps.length - 1 && (
        <View style={[
          styles.stepLine,
          step.completed ? { backgroundColor: '#10B981' } : { backgroundColor: Colors[theme].text + '20' }
        ]} />
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
            <Ionicons name="document-outline" size={32} color={Colors[theme].semantic.primaryBlue} />
          </View>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Configuration de votre entreprise</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Paramétrez votre profil fiscal en quelques étapes</Text>
        </View>

        {/* Progress Steps */}
        <View style={styles.stepper}>
          {steps.map(renderStep)}
        </View>

        {/* Form Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Régime fiscal</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Sélectionnez votre statut et régime d'imposition</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.formGrid, isLargeScreen ? styles.largeFormGrid : styles.smallFormGrid]}>
              {/* Statut juridique */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Statut juridique</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.status}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <Picker.Item label="Sélectionnez un statut" value="" />
                    <Picker.Item label="Auto-entrepreneur" value="auto" />
                    <Picker.Item label="SARL" value="sarl" />
                    <Picker.Item label="SA" value="sa" />
                    <Picker.Item label="Entreprise Individuelle" value="ei" />
                  </Picker>
                </View>
              </View>

              {/* Régime fiscal */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Régime fiscal</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.regime}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('regime', value)}
                  >
                    <Picker.Item label="Choisissez le régime" value="" />
                    <Picker.Item label="Régime Micro" value="micro" />
                    <Picker.Item label="Réel Simplifié" value="simplifie" />
                    <Picker.Item label="Réel Normal" value="normal" />
                  </Picker>
                </View>
              </View>

              {/* NIU */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Numéro NIU</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="M051234567890A"
                  placeholderTextColor={Colors[theme].text + '60'}
                  onChangeText={(text) => handleInputChange('niu', text)}
                  value={formData.niu}
                />
              </View>

              {/* Périodicité */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Périodicité déclaration</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.period}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('period', value)}
                  >
                    <Picker.Item label="Fréquence" value="" />
                    <Picker.Item label="Mensuelle" value="mensuelle" />
                    <Picker.Item label="Trimestrielle" value="trimestrielle" />
                    <Picker.Item label="Annuelle" value="annuelle" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Secteur d'activité */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: Colors[theme].text }]}>Secteur d'activité</Text>
              <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                <Picker
                  selectedValue={formData.activity}
                  style={styles.picker}
                  onValueChange={(value) => handleInputChange('activity', value)}
                >
                  <Picker.Item label="Sélectionnez votre secteur" value="" />
                  <Picker.Item label="Commerce" value="commerce" />
                  <Picker.Item label="Services" value="services" />
                  <Picker.Item label="Production" value="production" />
                  <Picker.Item label="Import/Export" value="import" />
                </Picker>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <CustomButton title="Précédent" onPress={handlePrev} variant="outline" />
              <CustomButton title="Suivant" onPress={() => navigation.navigate('TaxConfig')} />
            </View>
          </View>
        </View>

        {/* Info Alert Card */}
        <View style={[styles.alertCard, { backgroundColor: Colors[theme].semantic.primaryBlue + '10', borderColor: Colors[theme].semantic.primaryBlue + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.alertContent}>
            <View style={[styles.alertIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
              <Ionicons name="checkmark-outline" size={16} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View style={styles.alertText}>
              <Text style={[styles.alertTitle, { color: Colors[theme].text }]}>Configuration sécurisée</Text>
              <Text style={[styles.alertDesc, { color: Colors[theme].text + '80' }]}>
                Vos informations fiscales sont chiffrées et conformes aux normes DGI du Cameroun.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { flex: 1 },
  container: { padding: 24, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 24 },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  stepper: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  stepContainer: { flex: 1, alignItems: 'center' },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepNum: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  stepName: { fontSize: 12, textAlign: 'center' },
  stepLine: { height: 2, flex: 1, marginHorizontal: 8 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: { padding: 20 },
  cardTitle: { fontSize: 20, fontWeight: '600' },
  cardDescription: { fontSize: 14, marginTop: 4 },
  cardContent: { padding: 20 },
  formGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  largeFormGrid: {},
  smallFormGrid: { flexDirection: 'column' },
  inputGroup: { width: '48%', minWidth: 140 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  selectContainer: { borderWidth: 1, borderRadius: 8 },
  picker: { height: 44 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  actions: { flexDirection: 'row', gap: 12, marginTop: 16 },
  alertCard: {
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  alertContent: { flexDirection: 'row', gap: 12, padding: 24 },
  alertIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  alertDesc: { fontSize: 14 },
});

export default CompanySetup;