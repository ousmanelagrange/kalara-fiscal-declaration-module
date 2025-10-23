import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const declarationInfo = {
  period: "Décembre 2024",
  type: "TVA Mensuelle",
  regime: "Réel Normal",
  amount: "2 450 000 FCFA",
  dueDate: "15 Janvier 2025"
};

const documents = [
  { name: "Déclaration TVA (PDF)", size: "245 KB", format: "pdf", ready: true },
  { name: "Déclaration TVA (XML)", size: "18 KB", format: "xml", ready: true },
  { name: "Annexe justificatifs", size: "3.2 MB", format: "pdf", ready: true },
  { name: "Grand livre comptable", size: "892 KB", format: "pdf", ready: false },
];

const BadgeWaiting = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.badge, { backgroundColor: 'transparent', borderColor: Colors[theme].text + '40' }]}>
      <Text style={[styles.badgeText, { color: Colors[theme].text + '80' }]}>En attente</Text>
    </View>
  );
};

const renderDocItem = ({ item }: { item: typeof documents[0] }) => {
  const { theme } = useTheme();
  const handleView = () => Alert.alert('Voir', `Ouvrir ${item.name}`);
  const handleDownload = () => Alert.alert('Téléchargé', `${item.name} téléchargé !`);

  return (
    <TouchableOpacity style={styles.docRow} activeOpacity={0.7}>
      <View style={styles.docLeft}>
        <View style={[
          styles.docIcon,
          item.ready ? { backgroundColor: '#10B98110' } : { backgroundColor: Colors[theme].text + '10' }
        ]}>
          {item.ready ? (
            <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
          ) : (
            <Ionicons name="document-text-outline" size={20} color={Colors[theme].text + '80'} />
          )}
        </View>
        <View style={styles.docInfo}>
          <Text style={[styles.docName, { color: Colors[theme].text }]}>{item.name}</Text>
          <Text style={[styles.docSub, { color: Colors[theme].text + '80' }]}>{item.size} • {item.format.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.docRight}>
        {item.ready ? (
          <>
            <CustomButton title="Voir" onPress={handleView} variant="outline" size="small" />
            <CustomButton title="Télécharger" onPress={handleDownload} variant="outline" size="small" icon="download-outline" />
          </>
        ) : (
          <BadgeWaiting />
        )}
      </View>
    </TouchableOpacity>
  );
};

const DeclarationGeneration = ({ navigation }: any) => {
  const { theme } = useTheme();

  const handleMarkTransmitted = () => {
    Alert.alert('Transmise', 'Déclaration marquée comme transmise et archivée !');
    // Plus tard : navigation.navigate('Dashboard')
  };

  const handleDownloadZip = () => Alert.alert('Téléchargé', 'Tous les documents ZIP téléchargés !');

  const handleTransmit = () => Alert.alert('Bientôt disponible', 'Transmission API DGI en développement.');

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: '#10B98110' }]}>
            <Ionicons name="checkmark-circle-outline" size={32} color="#10B981" />
          </View>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Déclaration prête</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Vos documents sont générés et prêts à être transmis</Text>
        </View>

        {/* Declaration Summary Card */}
        <View style={[styles.card, { borderColor: Colors[theme].semantic.primaryBlue + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Récapitulatif de déclaration</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Vérifiez les informations avant transmission</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.summaryGrid, isLargeScreen ? styles.largeSummaryGrid : styles.smallSummaryGrid]}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: Colors[theme].text + '80' }]}>Période</Text>
                <Text style={[styles.summaryValue, { color: Colors[theme].text }]}>{declarationInfo.period}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: Colors[theme].text + '80' }]}>Type de déclaration</Text>
                <Text style={[styles.summaryValue, { color: Colors[theme].text }]}>{declarationInfo.type}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: Colors[theme].text + '80' }]}>Régime fiscal</Text>
                <Text style={[styles.summaryValue, { color: Colors[theme].text }]}>{declarationInfo.regime}</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: Colors[theme].text + '80' }]}>Date limite</Text>
                <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>{declarationInfo.dueDate}</Text>
              </View>
            </View>
            <View style={[styles.separator, { backgroundColor: Colors[theme].text + '20' }]} />
            <View style={[styles.amountRow, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
              <Text style={[styles.amountLabel, { color: Colors[theme].text }]}>Montant à payer</Text>
              <Text style={[styles.amountValue, { color: Colors[theme].semantic.primaryBlue }]}>{declarationInfo.amount}</Text>
            </View>
          </View>
        </View>

        {/* Documents Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Documents générés</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Téléchargez ou visualisez vos documents conformes DGI</Text>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={documents}
              renderItem={renderDocItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.docList}
            />
          </View>
        </View>

        {/* Transmission Options Grid */}
        <View style={[styles.transGrid, isLargeScreen ? styles.largeTransGrid : styles.smallTransGrid]}>
          {/* Export manuel */}
          <View style={[styles.transCard, { borderColor: Colors[theme].text + '20' }]}>
            <View style={styles.transHeader}>
              <Ionicons name="download-outline" size={24} color={Colors[theme].text + '80'} />
              <Text style={[styles.transTitle, { color: Colors[theme].text }]}>Export manuel</Text>
              <Text style={[styles.transDesc, { color: Colors[theme].text + '80' }]}>Téléchargez et transmettez via le portail DGI</Text>
            </View>
            <CustomButton title="Télécharger tout (ZIP)" onPress={handleDownloadZip} variant="outline" />
          </View>

          {/* Transmission directe */}
          <View style={[styles.transCard, { borderColor: Colors[theme].semantic.primaryBlue + '20' }]}>
            <View style={styles.transHeader}>
              <Ionicons name="send-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
              <Text style={[styles.transTitle, { color: Colors[theme].text }]}>Transmission directe</Text>
              <Text style={[styles.transDesc, { color: Colors[theme].text + '80' }]}>Envoi automatique vers la DGI (prochainement)</Text>
            </View>
            <CustomButton title="Transmettre à la DGI" onPress={handleTransmit} disabled />
          </View>
        </View>

        {/* Final Actions Card */}
        <View style={[styles.finalCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.finalContent}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" style={styles.finalIcon} />
            <View style={styles.finalText}>
              <Text style={[styles.finalTitle, { color: Colors[theme].text }]}>Prêt pour la transmission</Text>
              <Text style={[styles.finalDesc, { color: Colors[theme].text + '80' }]}>
                Votre déclaration est conforme aux exigences de la DGI. Tous les documents sont validés et prêts à être transmis.
              </Text>
              <View style={styles.finalActions}>
                <CustomButton title="Retour aux modifications" onPress={() => navigation.goBack()} variant="outline" size="small" />
                <CustomButton title="Marquer comme transmise" onPress={() => navigation.navigate('DeclarationSubmission')} size="small" />              </View>
            </View>
          </View>
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
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
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
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  largeSummaryGrid: {},
  smallSummaryGrid: { flexDirection: 'column', gap: 16 },
  summaryItem: { width: '48%', minWidth: 140 },
  summaryLabel: { fontSize: 14, marginBottom: 4 },
  summaryValue: { fontSize: 16, fontWeight: '600' },
  separator: { height: 1, marginVertical: 24 },
  amountRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderRadius: 8 },
  amountLabel: { fontSize: 16, fontWeight: '600' },
  amountValue: { fontSize: 20, fontWeight: 'bold' },
  docList: { marginBottom: 24 },
  docRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  docLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  docIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docInfo: { flex: 1 },
  docName: { fontSize: 16, fontWeight: '500' },
  docSub: { fontSize: 12 },
  docRight: { flexDirection: 'row', gap: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: '500' },
  transGrid: { flexDirection: 'row', gap: 24 },
  largeTransGrid: {},
  smallTransGrid: { flexDirection: 'column' },
  transCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  transHeader: { alignItems: 'center', gap: 8, marginBottom: 12 },
  transTitle: { fontSize: 16, fontWeight: '600' },
  transDesc: { fontSize: 14, textAlign: 'center' },
  finalCard: {
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  finalContent: { flexDirection: 'row', gap: 12, padding: 24 },
  finalIcon: { marginTop: 4 },
  finalText: { flex: 1 },
  finalTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  finalDesc: { fontSize: 14, marginBottom: 16 },
  finalActions: { flexDirection: 'row', gap: 8 },
});

export default DeclarationGeneration;