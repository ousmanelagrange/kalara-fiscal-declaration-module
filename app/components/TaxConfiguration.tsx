import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Switch as RNSwitch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const TaxConfiguration = ({ navigation }: any) => {  // Pour Précédent
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    taxRegime: '',
    startDate: new Date(),
    fiscalYear: 'civil',
    accountingMethod: '',
    tvaEnabled: true,
    tvaRate: '19.25',
    tvaPeriod: '',
    tvaDate: '15',
    tvaNumber: '',
    isRate: '30',
    isPeriod: 'quarterly',
    irppEnabled: false,
    patentsEnabled: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [progress, setProgress] = useState(0.65);  // Dynamique plus tard

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Update progress (ex: count non-empty)
    const filled = Object.values({ ...formData, [field]: value }).filter(v => v !== '' && v !== false).length;
    setProgress(Math.min(1, filled / 14));  // 14 champs approx
  };

  const toggleSwitch = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field as keyof typeof formData] }));
  };

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Progress Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>Configuration fiscale</Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Paramétrez votre régime d'imposition</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.progressText, { color: Colors[theme].text + '80' }]}>Progression</Text>
            <Text style={[styles.progressValue, { color: Colors[theme].semantic.primaryBlue }]}>{Math.round(progress * 100)}%</Text>
          </View>
        </View>
        <Progress.Bar 
          progress={progress} 
          width={screenWidth - 48} 
          color={Colors[theme].semantic.primaryBlue}
          unfilledColor={Colors[theme].text + '20'}
          borderWidth={0}
          height={8}
          style={styles.progress}
        />

        {/* Régime fiscal Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-lock-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Régime fiscal</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Définissez votre régime d'imposition</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.grid}>
              {/* Régime d'imposition */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Régime d'imposition *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.taxRegime}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('taxRegime', value)}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Régime Micro (CA < 10M FCFA)" value="micro" />
                    <Picker.Item label="Réel Simplifié (10M - 100M FCFA)" value="simplifie" />
                    <Picker.Item label="Réel Normal (CA > 100M FCFA)" value="normal" />
                  </Picker>
                </View>
              </View>

              {/* Date début */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Date de début d'activité *</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <TextInput
                    style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                    placeholder="Sélectionnez la date"
                    placeholderTextColor={Colors[theme].text + '60'}
                    value={formData.startDate.toLocaleDateString()}
                    editable={false}  // Non éditable, trigger picker
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePickerModal
                        isVisible={showDatePicker}
                        mode="date"
                        date={formData.startDate}
                        display="default"
                        onConfirm={(selectedDate: Date) => {
                            setShowDatePicker(false);
                            handleInputChange('startDate', selectedDate);
                        }}
                        onCancel={() => setShowDatePicker(false)}
                        textColor="#1E3A8A" // Bleu foncé pour texte
                        buttonTextColorIOS="#1E3A8A" // Bleu pour boutons iOS
                        accentColor="#3B82F6" // Bleu clair pour accents
                    />
                )}
              </View>

              {/* Exercice fiscal */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Exercice fiscal</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.fiscalYear}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('fiscalYear', value)}
                  >
                    <Picker.Item label="Année civile" value="civil" />
                    <Picker.Item label="Exercice décalé" value="custom" />
                  </Picker>
                </View>
              </View>

              {/* Méthode comptable */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Méthode comptable</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.accountingMethod}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('accountingMethod', value)}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Comptabilité de trésorerie" value="cash" />
                    <Picker.Item label="Comptabilité d'engagement" value="accrual" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Info Card imbriquée */}
            <View style={[styles.infoCard, { backgroundColor: Colors[theme].semantic.primaryBlue + '10', borderColor: Colors[theme].semantic.primaryBlue + '20' }]}>
              <View style={styles.infoContent}>
                <Ionicons name="information-circle-outline" size={20} color={Colors[theme].semantic.primaryBlue} style={styles.infoIcon} />
                <View>
                  <Text style={[styles.infoTitle, { color: Colors[theme].text }]}>Le régime simplifié est recommandé</Text>
                  <Text style={[styles.infoText, { color: Colors[theme].text + '80' }]}>
                    Basé sur votre secteur d'activité et chiffre d'affaires estimé, le régime réel simplifié offre le meilleur équilibre entre obligations et avantages fiscaux.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* TVA Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
              <Ionicons name="print-outline" size={24} color={Colors[theme].semantic.primaryBlue + '80'} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Configuration TVA</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Paramètres de la Taxe sur la Valeur Ajoutée</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            {/* Switch TVA */}
            <View style={[styles.switchContainer, { backgroundColor: Colors[theme].text + '30' }]}>
              <View style={styles.switchLabel}>
                <Text style={[styles.switchTitle, { color: Colors[theme].text }]}>Assujetti à la TVA</Text>
                <Text style={[styles.switchDesc, { color: Colors[theme].text + '80' }]}>Votre entreprise collecte et déclare la TVA</Text>
              </View>
              <RNSwitch
                value={formData.tvaEnabled}
                onValueChange={() => toggleSwitch('tvaEnabled')}
                trackColor={{ false: Colors[theme].text + '30', true: Colors[theme].semantic.primaryBlue + '30' }}
                thumbColor={formData.tvaEnabled ? Colors[theme].semantic.primaryBlue : Colors[theme].text + '50'}
              />
            </View>

            <View style={styles.grid}>
              {/* Taux TVA */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Taux de TVA standard *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.tvaRate}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('tvaRate', value)}
                  >
                    <Picker.Item label="19,25% (Taux normal)" value="19.25" />
                    <Picker.Item label="0% (Exonéré)" value="0" />
                    <Picker.Item label="Taux spécifique" value="custom" />
                  </Picker>
                </View>
              </View>

              {/* Périodicité TVA */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Périodicité déclaration *</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.tvaPeriod}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('tvaPeriod', value)}
                  >
                    <Picker.Item label="Sélectionnez" value="" />
                    <Picker.Item label="Mensuelle (recommandé)" value="monthly" />
                    <Picker.Item label="Trimestrielle" value="quarterly" />
                    <Picker.Item label="Annuelle" value="annual" />
                  </Picker>
                </View>
              </View>

              {/* Jour limite */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Jour limite déclaration</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="15"
                  placeholderTextColor={Colors[theme].text + '60'}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(text) => handleInputChange('tvaDate', text)}
                  value={formData.tvaDate}
                />
                <Text style={[styles.helperText, { color: Colors[theme].text + '60' }]}>Jour du mois (généralement le 15)</Text>
              </View>

              {/* Numéro TVA */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Numéro TVA</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                  placeholder="CM-XXXXXXXXXX"
                  placeholderTextColor={Colors[theme].text + '60'}
                  onChangeText={(text) => handleInputChange('tvaNumber', text)}
                  value={formData.tvaNumber}
                />
              </View>
            </View>
          </View>
        </View>

        {/* IS Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '30' }]}>
              <Ionicons name="calculator-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Impôt sur les Sociétés (IS)</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Configuration IS et autres impôts</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.grid}>
              {/* Taux IS */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Taux IS applicable</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.isRate}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('isRate', value)}
                  >
                    <Picker.Item label="30% (Taux normal)" value="30" />
                    <Picker.Item label="25% (PME éligibles)" value="25" />
                    <Picker.Item label="33% (Secteur pétrolier)" value="33" />
                  </Picker>
                </View>
              </View>

              {/* Périodicité IS */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: Colors[theme].text }]}>Périodicité IS</Text>
                <View style={[styles.selectContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}>
                  <Picker
                    selectedValue={formData.isPeriod}
                    style={styles.picker}
                    onValueChange={(value) => handleInputChange('isPeriod', value)}
                  >
                    <Picker.Item label="Acomptes trimestriels" value="quarterly" />
                    <Picker.Item label="Déclaration annuelle uniquement" value="annual" />
                  </Picker>
                </View>
              </View>

              {/* IRPP Switch */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <View style={styles.switchRow}>
                  <RNSwitch
                    value={formData.irppEnabled}
                    onValueChange={() => toggleSwitch('irppEnabled')}
                    trackColor={{ false: Colors[theme].text + '30', true: Colors[theme].semantic.primaryBlue + '30' }}
                    thumbColor={formData.irppEnabled ? Colors[theme].semantic.primaryBlue : Colors[theme].text + '50'}
                  />
                  <Text style={[styles.switchLabelText, { color: Colors[theme].text }]}>Déclaration IRPP (Impôt sur le Revenu)</Text>
                </View>
                <Text style={[styles.helperText, { color: Colors[theme].text + '60', marginLeft: 28 }]}>Pour les entreprises individuelles et revenus salariaux</Text>
              </View>

              {/* Patentes Switch */}
              <View style={[styles.inputGroup, isLargeScreen && styles.fullWidth]}>
                <View style={styles.switchRow}>
                  <RNSwitch
                    value={formData.patentsEnabled}
                    onValueChange={() => toggleSwitch('patentsEnabled')}
                    trackColor={{ false: Colors[theme].text + '30', true: Colors[theme].semantic.primaryBlue + '30' }}
                    thumbColor={formData.patentsEnabled ? Colors[theme].semantic.primaryBlue : Colors[theme].text + '50'}
                  />
                  <Text style={[styles.switchLabelText, { color: Colors[theme].text }]}>Patente et Licences</Text>
                </View>
                <Text style={[styles.helperText, { color: Colors[theme].text + '60', marginLeft: 28 }]}>Contribution des patentes selon activité</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Calendrier Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
              <Ionicons name="calendar-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Calendrier des déclarations</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Récapitulatif de vos échéances fiscales</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.scheduleList}>
              {/* TVA Mensuelle */}
              <View style={[styles.scheduleItem, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
                <View>
                  <Text style={[styles.scheduleTitle, { color: Colors[theme].text }]}>TVA Mensuelle</Text>
                  <Text style={[styles.scheduleDesc, { color: Colors[theme].text + '80' }]}>Le 15 de chaque mois</Text>
                </View>
                <Text style={[styles.scheduleStatus, { color: Colors[theme].semantic.primaryBlue }]}>Configuré</Text>
              </View>

              {/* IS Trimestriel */}
              <View style={[styles.scheduleItem, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
                <View>
                  <Text style={[styles.scheduleTitle, { color: Colors[theme].text }]}>IS Trimestriel</Text>
                  <Text style={[styles.scheduleDesc, { color: Colors[theme].text + '80' }]}>Mars, Juin, Sept, Déc</Text>
                </View>
                <Text style={[styles.scheduleStatus, { color: Colors[theme].semantic.primaryBlue }]}>Configuré</Text>
              </View>

              {/* Annuelle */}
              <View style={[styles.scheduleItem, { backgroundColor: Colors[theme].text + '30' }]}>
                <View>
                  <Text style={[styles.scheduleTitle, { color: Colors[theme].text }]}>Déclaration annuelle</Text>
                  <Text style={[styles.scheduleDesc, { color: Colors[theme].text + '80' }]}>31 Mars N+1</Text>
                </View>
                <Text style={[styles.scheduleStatus, { color: Colors[theme].text + '60' }]}>Automatique</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Précédent"
            onPress={() => navigation.goBack()}
             // Utilise le variant qu'on a ajouté
          />
          <CustomButton
            title="Suivant : Catégories comptables"
            onPress={() => navigation.navigate('TaxConfig')}
            icon="arrow-forward"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// Styles (ajoute les nouveaux)
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
  },  // Ajouts spécifiques :
  infoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  infoContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIcon: {
    marginTop: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  switchLabel: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  switchDesc: {
    fontSize: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabelText: {
    fontSize: 14,
    flex: 1,
  },
  scheduleList: {
    gap: 12,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleDesc: {
    fontSize: 12,
  },
  scheduleStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  // ... Reste identique à ProfileCompletion
});

export default TaxConfiguration;