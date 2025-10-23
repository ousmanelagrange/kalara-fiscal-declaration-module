import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';
import { useRef } from 'react';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const mockDocuments = [
  {
    id: "INV-2024-001",
    type: "Facture vente",
    client: "Client ABC SARL",
    amount: "350 000",
    date: "15 Déc 2024",
    status: "verified",
    issues: [],
  },
  {
    id: "INV-2024-002",
    type: "Facture vente",
    client: "Entreprise XYZ",
    amount: "125 000",
    date: "18 Déc 2024",
    status: "warning",
    issues: ["NIU client manquant"],
  },
  {
    id: "ACH-2024-045",
    type: "Facture achat",
    supplier: "Fournisseur DEF",
    amount: "87 500",
    date: "12 Déc 2024",
    status: "verified",
    issues: [],
  },
  {
    id: "ACH-2024-046",
    type: "Facture achat",
    supplier: "Société GHI",
    amount: "450 000",
    date: "20 Déc 2024",
    status: "error",
    issues: ["Montant TVA incorrect", "Date non conforme"],
  },
  {
    id: "INV-2024-003",
    type: "Facture vente",
    client: "Particulier",
    amount: "25 000",
    date: "22 Déc 2024",
    status: "verified",
    issues: [],
  },
];

const mockStats = {
  total: 45,
  verified: 38,
  warnings: 4,
  errors: 3,
};

const getStatusIcon = (status: string, theme: 'light' | 'dark') => {
  switch (status) {
    case "verified":
      return <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />;
    case "warning":
      return <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />;
    case "error":
      return <Ionicons name="close-circle-outline" size={20} color="#EF4444" />;
    default:
      return <Ionicons name="document-text-outline" size={20} color={Colors[theme].text + '80'} />;
  }
};

const BadgeView = ({ children, variant }: { children: string; variant: 'success' | 'warning' | 'error' | 'outline' }) => {
  const { theme } = useTheme();
  const colors = {
    success: { bg: '#10B98120', text: '#10B981', border: '#10B98140' },
    warning: { bg: '#F59E0B20', text: '#F59E0B', border: '#F59E0B40' },
    error: { bg: '#EF444420', text: '#EF4444', border: '#EF444440' },
    outline: { bg: 'transparent', text: Colors[theme].text + '80', border: Colors[theme].text + '20' },
  };
  const style = colors[variant];
  return (
    <View style={[styles.badge]}>
      <Text style={[styles.badgeText, { color: style.text }]}>{children}</Text>
    </View>
  );
};

const DocumentVerification = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.client || doc.supplier || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.amount.includes(searchQuery)
  );

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleRowPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.98, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const renderDocumentItem = ({ item }: { item: typeof mockDocuments[0] }) => (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity style={styles.docRow} onPress={handleRowPress} activeOpacity={0.8}>
        <View style={styles.docLeft}>
          <View style={{ marginTop: 4 }}>{getStatusIcon(item.status, theme)}</View>
          <View style={styles.docInfo}>
            <View style={styles.docHeader}>
              <Text style={[styles.docId, { color: Colors[theme].text }]}>{item.id}</Text>
              <BadgeView variant="outline">{item.type}</BadgeView>
              <BadgeView variant={item.status as any}>{item.status === 'verified' ? 'Vérifié' : item.status === 'warning' ? 'Attention' : 'Erreur'}</BadgeView>
            </View>
            <View style={styles.docDetails}>
              <Text style={[styles.docClient, { color: Colors[theme].text + '80' }]}>{item.client || item.supplier}</Text>
              <View style={styles.docMeta}>
                <Text style={[styles.docAmount, { color: Colors[theme].text + '80' }]}>{item.amount} FCFA</Text>
                <Text style={[styles.docSeparator, { color: Colors[theme].text + '60' }]}>•</Text>
                <Text style={[styles.docDate, { color: Colors[theme].text + '80' }]}>{item.date}</Text>
              </View>
            </View>
            {item.issues.length > 0 && (
              <View style={styles.issuesContainer}>
                {item.issues.map((issue, idx) => (
                  <View key={idx} style={styles.issueItem}>
                    <View style={[
                      styles.issueDot,
                      { backgroundColor: item.status === "error" ? "#EF4444" : "#F59E0B" }
                    ]} />
                    <Text style={[styles.issueText, { color: Colors[theme].text + '80' }]}>{issue}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.docActions}>
          {item.status !== "verified" && (
            <CustomButton title="Corriger" onPress={() => console.log('Corriger', item.id)} size="small" />
          )}
          <CustomButton title="Voir" icon="eye-outline" onPress={() => console.log('Voir', item.id)} size="small" />
          <CustomButton title="Télécharger" icon="download-outline" onPress={() => console.log('DL', item.id)} size="small" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const hasErrors = mockStats.errors > 0;

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Vérification des documents</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Contrôlez la conformité de vos pièces justificatives</Text>
        </View>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, isLargeScreen ? styles.largeStats : styles.smallStats]}>
          <View style={styles.statCard}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: Colors[theme].text }]}>{mockStats.total}</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Documents total</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#10B98110', borderColor: '#10B98120' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>{mockStats.verified}</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Vérifiés</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B10', borderColor: '#F59E0B20' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: '#F59E0B' }]}>{mockStats.warnings}</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Avertissements</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#EF444410', borderColor: '#EF444420' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: '#EF4444' }]}>{mockStats.errors}</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Erreurs</Text>
            </View>
          </View>
        </View>

        {/* Filters Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardContent}>
            <View style={styles.filtersRow}>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={16} color={Colors[theme].text + '80'} style={styles.searchIcon} />
                <TextInput
                  style={[styles.searchInput, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20', color: Colors[theme].text }]}
                  placeholder="Rechercher par numéro, client, montant..."
                  placeholderTextColor={Colors[theme].text + '60'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <CustomButton title="Filtrer" onPress={() => console.log('Filtrer')} />
              <CustomButton title="Tout vérifier" onPress={() => console.log('Tout vérifier')} />
            </View>
          </View>
        </View>

        {/* Documents List Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Documents à vérifier</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Période: Décembre 2024</Text>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={filteredDocuments}
              renderItem={renderDocumentItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.docList}
            />
          </View>
        </View>

        {/* Summary Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Résumé de vérification</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Points de contrôle automatiques</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.summaryList}>
              {/* Numéros factures */}
              <View style={[styles.summaryItem, { backgroundColor: '#10B98110' }]}>
                <View style={styles.summaryLeft}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                  <View>
                    <Text style={[styles.summaryTitle, { color: Colors[theme].text }]}>Numéros de factures</Text>
                    <Text style={[styles.summaryDesc, { color: Colors[theme].text + '80' }]}>Séquence conforme et sans doublon</Text>
                  </View>
                </View>
                <BadgeView variant="success">OK</BadgeView>
              </View>

              {/* Calculs TVA */}
              <View style={[styles.summaryItem, { backgroundColor: '#10B98110' }]}>
                <View style={styles.summaryLeft}>
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                  <View>
                    <Text style={[styles.summaryTitle, { color: Colors[theme].text }]}>Calculs TVA</Text>
                    <Text style={[styles.summaryDesc, { color: Colors[theme].text + '80' }]}>Taux et montants corrects</Text>
                  </View>
                </View>
                <BadgeView variant="success">OK</BadgeView>
              </View>

              {/* Clients */}
              <View style={[styles.summaryItem, { backgroundColor: '#F59E0B10' }]}>
                <View style={styles.summaryLeft}>
                  <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />
                  <View>
                    <Text style={[styles.summaryTitle, { color: Colors[theme].text }]}>Informations clients</Text>
                    <Text style={[styles.summaryDesc, { color: Colors[theme].text + '80' }]}>4 NIU clients manquants</Text>
                  </View>
                </View>
                <BadgeView variant="warning">À corriger</BadgeView>
              </View>

              {/* Dates */}
              <View style={[styles.summaryItem, { backgroundColor: '#EF444410' }]}>
                <View style={styles.summaryLeft}>
                  <Ionicons name="close-circle-outline" size={20} color="#EF4444" />
                  <View>
                    <Text style={[styles.summaryTitle, { color: Colors[theme].text }]}>Dates de facturation</Text>
                    <Text style={[styles.summaryDesc, { color: Colors[theme].text + '80' }]}>3 dates hors période fiscale</Text>
                  </View>
                </View>
                <BadgeView variant="error">Erreur</BadgeView>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Retour à l'import"
            onPress={() => navigation.goBack()}
          />
          <CustomButton
            title="Continuer vers les calculs"
            onPress={() => console.log('Vers calculs')}
            disabled={hasErrors}
          />
        </View>

        {hasErrors && (
          <Text style={[styles.warningText, { color: '#EF4444' }]}>
            Veuillez corriger toutes les erreurs avant de continuer
          </Text>
        )}
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
  bg : {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
  statsGrid: { flexDirection: 'row', gap: 16 },
  largeStats: {},
  smallStats: { flexDirection: 'column' },
  statCard: {
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    padding: 0,
  },
  statContent: { alignItems: 'center', padding: 24 },
  statNumber: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  filtersRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  searchContainer: { flex: 1, position: 'relative' },
  searchIcon: { position: 'absolute', left: 12, top: '50%', marginTop: -8 },
  searchInput: { paddingHorizontal: 40, paddingVertical: 12, borderWidth: 1, borderRadius: 8, fontSize: 16 },
  docList: { marginBottom: 24 },
  docRow: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  docLeft: { flex: 1, flexDirection: 'row', gap: 16 },
  docInfo: { flex: 1 },
  docHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  docId: { fontSize: 16, fontWeight: '600' },
  docDetails: { },
  docClient: { fontSize: 14 },
  docMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  docAmount: { fontSize: 14 },
  docSeparator: { fontSize: 14 },
  docDate: { fontSize: 14 },
  issuesContainer: { marginTop: 8 },
  issueItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  issueDot: { width: 6, height: 6, borderRadius: 3 },
  issueText: { fontSize: 12 },
  docActions: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 12, fontWeight: '500' },
  summaryList: { gap: 12 },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  summaryLeft: { flexDirection: 'row', gap: 12, alignItems: 'center', flex: 1 },
  summaryTitle: { fontSize: 14, fontWeight: '500' },
  summaryDesc: { fontSize: 12 },
  warningText: { fontSize: 12, textAlign: 'center', marginTop: 8 },
});

export default DocumentVerification;

