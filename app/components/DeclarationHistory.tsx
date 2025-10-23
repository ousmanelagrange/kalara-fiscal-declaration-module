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
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const historyData = [
  {
    period: "Décembre 2024",
    type: "TVA Mensuelle",
    amount: "2 450 000 FCFA",
    status: "Transmise",
    date: "05 Jan 2025",
    color: "success"
  },
  {
    period: "Novembre 2024",
    type: "TVA Mensuelle",
    amount: "2 180 000 FCFA",
    status: "Transmise",
    date: "10 Déc 2024",
    color: "success"
  },
  {
    period: "T4 2024",
    type: "IS Trimestriel",
    amount: "5 200 000 FCFA",
    status: "En attente",
    date: "À venir",
    color: "warning"
  },
  {
    period: "Octobre 2024",
    type: "TVA Mensuelle",
    amount: "2 340 000 FCFA",
    status: "Transmise",
    date: "12 Nov 2024",
    color: "success"
  },
  {
    period: "Septembre 2024",
    type: "TVA Mensuelle",
    amount: "1 950 000 FCFA",
    status: "Transmise",
    date: "08 Oct 2024",
    color: "success"
  }
];

const stats = [
  { label: "Total déclaré 2024", value: "28 M FCFA" },
  { label: "Déclarations transmises", value: "12" },
  { label: "Taux conformité", value: "100%" }
];

const getStatusStyle = (color: string) => {
  switch (color) {
    case "success": return { bg: '#10B98120', border: '#10B98140', text: '#10B981' };
    case "warning": return { bg: '#F59E0B20', border: '#F59E0B40', text: '#F59E0B' };
    default: return { bg: '#FFFFFF' + '20', border: '#FFFFFF' + '40', text: '#FFFFFF' + '80' };
  }
};

const StatusBadge = ({ status, color }: { status: string; color: string }) => {
  const { theme } = useTheme();
  const style = getStatusStyle(color);
  return (
    <View style={[styles.statusBadge, { backgroundColor: style.bg, borderColor: style.border }]}>
      <Text style={[styles.statusText, { color: style.text }]}>{status}</Text>
    </View>
  );
};

const DeclarationHistory = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = historyData.filter(item =>
    item.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => Alert.alert('Exported', 'Tous les historiques exportés en CSV !');

  const handleView = (item: typeof historyData[0]) => Alert.alert('Voir', `Ouvrir déclaration ${item.period}`);
  const handleDownload = (item: typeof historyData[0]) => Alert.alert('Téléchargé', `Déclaration ${item.period} téléchargée !`);

  const renderHistoryItem = ({ item }: { item: typeof historyData[0] }) => (
    <TouchableOpacity style={styles.historyRow} activeOpacity={0.7}>
      <View style={styles.historyLeft}>
        <View style={[styles.historyIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
          <Ionicons name="archive-outline" size={24} color={Colors[theme].semantic.primaryBlue} />
        </View>
        <View style={styles.historyInfo}>
          <View style={styles.historyHeader}>
            <Text style={[styles.historyPeriod, { color: Colors[theme].text }]}>{item.period}</Text>
            <BadgeView variant="outline">{item.type}</BadgeView>
          </View>
          <Text style={[styles.historyDetails, { color: Colors[theme].text + '80' }]}>{item.amount} • {item.date}</Text>
        </View>
      </View>
      <View style={styles.historyRight}>
        <StatusBadge status={item.status} color={item.color} />
        <CustomButton title="Voir" onPress={() => handleView(item)} variant="outline" size="small" icon="eye-outline" />
        <CustomButton title="Télécharger" onPress={() => handleDownload(item)} variant="outline" size="small" icon="download-outline" />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: Colors[theme].text }]}>Historique des déclarations</Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Consultez et téléchargez vos déclarations passées</Text>
          </View>
          <CustomButton title="Exporter tout" onPress={handleExport} variant="outline" icon="download-outline" />
        </View>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, isLargeScreen ? styles.largeStats : styles.smallStats]}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
              <View style={styles.statContent}>
                <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>{stat.label}</Text>
                <Text style={[styles.statValue, { color: Colors[theme].text }]}>{stat.value}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Filters Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Recherche et filtres</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Trouvez rapidement une déclaration</Text>
            </View>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.filtersRow}>
              <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={16} color={Colors[theme].text + '80'} style={styles.searchIcon} />
                <TextInput
                  style={[styles.searchInput, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20', color: Colors[theme].text }]}
                  placeholder="Rechercher par période, type..."
                  placeholderTextColor={Colors[theme].text + '60'}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <CustomButton title="Filtres" onPress={() => console.log('Filtres')} variant="outline" icon="filter-outline" />
              <CustomButton title="Période" onPress={() => console.log('Période')} variant="outline" icon="calendar-outline" />
            </View>
          </View>
        </View>

        {/* History Table Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Déclarations archivées</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Toutes vos déclarations conservées en ligne</Text>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={filteredHistory}
              renderItem={renderHistoryItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.historyList}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// BadgeView réutilisable (comme avant)
const BadgeView = ({ children, variant }: { children: string; variant: 'outline' }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.badge, { borderColor: Colors[theme].text + '20' }]}>
      <Text style={[styles.badgeText, { color: Colors[theme].text + '80' }]}>{children}</Text>
    </View>
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
  },  // Ajouts spécifiques :
  statsGrid: { flexDirection: 'row', gap: 24 },
  largeStats: {},
  smallStats: { flexDirection: 'column', gap: 16 },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statContent: { alignItems: 'center', padding: 24 },
  statLabel: { fontSize: 14, marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  filtersRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  searchContainer: { flex: 1, position: 'relative' },
  searchIcon: { position: 'absolute', left: 12, top: '50%', marginTop: -8 },
  searchInput: { paddingHorizontal: 40, paddingVertical: 12, borderWidth: 1, borderRadius: 8, fontSize: 16 },
  historyList: { marginBottom: 24 },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  historyLeft: { flexDirection: 'row', alignItems: 'center', gap: 16, flex: 1 },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyInfo: { flex: 1 },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  historyPeriod: { fontSize: 16, fontWeight: '600' },
  historyDetails: { fontSize: 14 },
  historyRight: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusText: { fontSize: 12, fontWeight: '500' },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: '500' },
});

export default DeclarationHistory;