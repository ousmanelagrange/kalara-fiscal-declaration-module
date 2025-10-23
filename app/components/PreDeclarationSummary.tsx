import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const companyInfo = {
  name: "SARL Kalar Technologies",
  niu: "M051234567890A",
  regime: "Réel Normal",
  period: "Décembre 2024"
};

const taxCalculations = {
  sales: "29 250 000",
  tvaCollected: "4 850 000",
  purchases: "14 468 000",
  tvaDeductible: "2 400 000",
  tvaDue: "2 450 000"
};

const documents = {
  invoicesSales: 45,
  invoicesPurchases: 28,
  bankStatements: 3,
  otherDocs: 7
};

const initialChecklist = [
  { id: 1, label: "Toutes les factures de vente sont numérotées séquentiellement", checked: true },
  { id: 2, label: "Les NIU clients sont présents sur toutes les factures", checked: false },
  { id: 3, label: "Les calculs de TVA sont corrects", checked: true },
  { id: 4, label: "Les relevés bancaires concordent avec la comptabilité", checked: true },
  { id: 5, label: "Tous les justificatifs sont archivés", checked: true },
];

const PreDeclarationSummary = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [checklist, setChecklist] = useState(initialChecklist);

  const toggleChecklist = (id: number) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const allChecked = checklist.every(item => item.checked);

  const renderChecklistItem = (item: typeof initialChecklist[0]) => (
    <TouchableOpacity key={item.id} style={styles.checkItem} onPress={() => toggleChecklist(item.id)} activeOpacity={0.7}>
      <View style={[styles.checkbox, item.checked && { backgroundColor: Colors[theme].semantic.primaryBlue }]}>
        {item.checked && <Ionicons name="checkmark" size={16} color={Colors[theme].text} />}
      </View>
      <Text style={[styles.checkLabel, { color: Colors[theme].text }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDocStat = (count: number, label: string, index: number) => (
    <View key={index} style={[styles.docStat, { backgroundColor: '#10B98110' }]}>
      <Text style={[styles.docCount, { color: '#10B981' }]}>{count}</Text>
      <Text style={[styles.docLabel, { color: Colors[theme].text + '80' }]}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
            <Ionicons name="bag-check-outline" size={32} color={Colors[theme].semantic.primaryBlue} />
          </View>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Récapitulatif final</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Vérifiez toutes les informations avant génération</Text>
        </View>

        {/* Company Info Card */}
        <View style={[styles.card, { borderColor: Colors[theme].semantic.primaryBlue + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="business-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Informations entreprise</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Données déclarantes</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.infoGrid, isLargeScreen ? styles.largeInfoGrid : styles.smallInfoGrid]}>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: Colors[theme].text + '80' }]}>Raison sociale</Text>
                <Text style={[styles.infoValue, { color: Colors[theme].text }]}>{companyInfo.name}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: Colors[theme].text + '80' }]}>NIU</Text>
                <Text style={[styles.infoValue, { color: Colors[theme].text }]}>{companyInfo.niu}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: Colors[theme].text + '80' }]}>Régime</Text>
                <Text style={[styles.infoValue, { color: Colors[theme].text }]}>{companyInfo.regime}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: Colors[theme].text + '80' }]}>Période</Text>
                <Text style={[styles.infoValue, { color: Colors[theme].text }]}>{companyInfo.period}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tax Calculations Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].text + '20' }]}>
              <Ionicons name="calculator-outline" size={24} color={Colors[theme].text + '80'} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Calculs fiscaux</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Montants TVA de la période</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.breakdownList}>
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>Chiffre d'affaires TTC</Text>
                <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>{taxCalculations.sales} FCFA</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>TVA collectée (19.25%)</Text>
                <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>{taxCalculations.tvaCollected} FCFA</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>Achats et charges TTC</Text>
                <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>{taxCalculations.purchases} FCFA</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.breakdownItem}>
                <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>TVA déductible (19.25%)</Text>
                <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>{taxCalculations.tvaDeductible} FCFA</Text>
              </View>
              <View style={[styles.separatorThick]} />
              <View style={[styles.netRow, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
                <Text style={[styles.netLabel, { color: Colors[theme].text }]}>TVA nette à payer</Text>
                <Text style={[styles.netValue, { color: Colors[theme].semantic.primaryBlue }]}>{taxCalculations.tvaDue} FCFA</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Documents Summary Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: Colors[theme].semantic.primaryBlue + '30' }]}>
              <Ionicons name="document-text-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Documents annexés</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Pièces justificatives de la déclaration</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.docGrid, isLargeScreen ? styles.largeDocGrid : styles.smallDocGrid]}>
              {renderDocStat(documents.invoicesSales, "Factures ventes", 0)}
              {renderDocStat(documents.invoicesPurchases, "Factures achats", 1)}
              {renderDocStat(documents.bankStatements, "Relevés bancaires", 2)}
              {renderDocStat(documents.otherDocs, "Autres documents", 3)}
            </View>
          </View>
        </View>

        {/* Checklist Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Liste de vérification finale</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Cochez tous les points avant de continuer</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.checkList}>
              {checklist.map(renderChecklistItem)}
            </View>
          </View>
        </View>

        {/* Important Notice Card */}
        <View style={[styles.noticeCard, { backgroundColor: '#F59E0B10', borderColor: '#F59E0B20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.noticeContent}>
            <Ionicons name="alert-circle-outline" size={24} color="#F59E0B" style={styles.noticeIcon} />
            <View style={styles.noticeText}>
              <Text style={[styles.noticeTitle, { color: Colors[theme].text }]}>Attention - Vérification importante</Text>
              <Text style={[styles.noticeDesc, { color: Colors[theme].text + '80' }]}>
                Une fois la déclaration générée, vous ne pourrez plus modifier les données de cette période. Assurez-vous que toutes les informations sont exactes.
              </Text>
              <View style={styles.noticeList}>
                <Text style={[styles.noticeItem, { color: Colors[theme].text + '80' }]}>• 1 point de checklist non validé</Text>
                <Text style={[styles.noticeItem, { color: Colors[theme].text + '80' }]}>• Vérifiez les NIU clients manquants</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Confirmation Card */}
        <View style={[styles.noticeCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.noticeContent}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" style={styles.noticeIcon} />
            <View style={styles.noticeText}>
              <Text style={[styles.noticeTitle, { color: Colors[theme].text }]}>Déclaration prête à être générée</Text>
              <Text style={[styles.noticeDesc, { color: Colors[theme].text + '80' }]}>
                Tous les calculs ont été vérifiés et les documents sont complets. Vous pouvez procéder à la génération des fichiers de déclaration.
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Retour aux modifications"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
            <CustomButton
            title="Générer la déclaration"
            onPress={() => {
                if (allChecked) {
                navigation.navigate('DeclarationGeneration');
                } else {
                console.log('Checklist incomplète');
                }
            }}
            disabled={!allChecked}
            />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors[theme].text + '80'} />
            <Text style={[styles.footerText, { color: Colors[theme].text + '80' }, { fontSize: 12, textAlign: 'center' }]}>Date limite de transmission : 15 Janvier 2025</Text>
          </View>
          <Text style={[styles.footerSub, { color: Colors[theme].text + '60' }, { fontSize: 12, textAlign: 'center' }]}>La génération prendra quelques instants</Text>
        </View>
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
    alignItems: 'center',
    // Removed fontSize and textAlign, which are not valid for View
  },  // Ajouts spécifiques :
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  largeInfoGrid: { },
  smallInfoGrid: { flexDirection: 'column' },
  infoItem: { width: '48%', minWidth: 140 },
  infoLabel: { fontSize: 12, marginBottom: 4 },
  infoValue: { fontSize: 14, fontWeight: '600' },
  breakdownList: { },
  breakdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  breakdownLabel: { fontSize: 14 },
  breakdownValue: { fontSize: 14, fontWeight: '600' },
  separator: { height: 1, marginVertical: 12 },
  separatorThick: { marginVertical: 16 },
  netRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 8 },
  netLabel: { fontSize: 16, fontWeight: '600' },
  netValue: { fontSize: 20, fontWeight: 'bold' },
  docGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  largeDocGrid: { },
  smallDocGrid: { flexDirection: 'column' },
  docStat: {
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  docCount: { fontSize: 20, fontWeight: 'bold' },
  docLabel: { fontSize: 12, marginTop: 4 },
  checkList: { gap: 16 },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
   
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkLabel: { fontSize: 14, fontWeight: '500', flex: 1 },
  noticeCard: {
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  noticeContent: { flexDirection: 'row', gap: 12, padding: 24 },
  noticeIcon: { marginTop: 2 },
  noticeText: { flex: 1 },
  noticeTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  noticeDesc: { fontSize: 14, marginBottom: 12 },
  noticeList: { },
  noticeItem: { fontSize: 12, marginBottom: 4 },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  footerText: { fontSize: 14 },
  footerSub: { fontSize: 12 },
});

export default PreDeclarationSummary;