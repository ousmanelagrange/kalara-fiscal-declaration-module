import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';

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
  const { theme } = useTheme();
  switch (color) {
    case "success": return { bg: '#10B98120', border: '#10B98140', text: '#10B981' };
    case "warning": return { bg: '#F59E0B20', border: '#F59E0B40', text: '#F59E0B' };
    default: return { bg: Colors[theme].text + '20', border: Colors[theme].text + '40', text: Colors[theme].text + '80' };
  }
};

const StatusBadge = ({ status, color }: { status: string; color: string }) => {
  const style = getStatusStyle(color);
  return (
    <View style={[styles.statusBadge, { backgroundColor: style.bg, borderColor: style.border }]}>
      <Text style={[styles.statusText, { color: style.text }]}>{status}</Text>
    </View>
  );
};

const BadgeOutline = ({ children }: { children: string }) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.badgeOutline, { borderColor: Colors[theme].text + '20' }]}>
      <Text style={[styles.badgeOutlineText, { color: Colors[theme].text + '80' }]}>{children}</Text>
    </View>
  );
};

const ExportButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.exportButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="download-outline" size={16} color={Colors[theme].semantic.primaryBlue} />
      <Text style={{ color: Colors[theme].semantic.primaryBlue, fontWeight: 'bold', marginLeft: 8 }}>Exporter tout</Text>
    </TouchableOpacity>
  );
};

const FilterButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.filterButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="filter-outline" size={8} color={Colors[theme].text + '80'} />
      <Text style={{ color: Colors[theme].text + '80', marginLeft: 8, fontSize: 14 }}>Filtres</Text>
    </TouchableOpacity>
  );
};

const PeriodButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.periodButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="calendar-outline" size={16} color={Colors[theme].text + '80'} />
      <Text style={{ color: Colors[theme].text + '80', marginLeft: 8, fontSize: 14 }}>Période</Text>
    </TouchableOpacity>
  );
};

const SeeButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.seeButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="eye-outline" size={16} color={Colors[theme].text + '80'} />
    </TouchableOpacity>
  );
};

const DownloadButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.downloadButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="download-outline" size={16} color={Colors[theme].text + '80'} />
    </TouchableOpacity>
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

  const handleFilter = () => console.log('Filtres');
  const handlePeriod = () => console.log('Période');

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
            <BadgeOutline>{item.type}</BadgeOutline>
          </View>
          <Text style={[styles.historyDetails, { color: Colors[theme].text + '80' }]}>{item.amount} • {item.date}</Text>
        </View>
      </View>
      <View style={styles.historyRight}>
        <StatusBadge status={item.status} color={item.color} />
        <SeeButton onPress={() => handleView(item)} />
        <DownloadButton onPress={() => handleDownload(item)} />
      </View>
    </TouchableOpacity>
  );

  const renderStat = (stat: typeof stats[0], index: number) => (
    <View key={index} style={[styles.statCard, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
      <View style={styles.statContent}>
        <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>{stat.label}</Text>
        <Text style={[styles.statValue, { color: Colors[theme].text }]}>{stat.value}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.title, { color: Colors[theme].text }]}>Historique des déclarations</Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Consultez et téléchargez vos déclarations passées</Text>
            <ExportButton onPress={handleExport} />
          </View>
       
        </View>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, isLargeScreen ? styles.largeStats : styles.smallStats]}>
          {stats.map(renderStat)}
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
                 <FilterButton onPress={handleFilter} />
                 <PeriodButton onPress={handlePeriod} />
              </View>
             
              
            </View>
          </View>
        </View>

        {/* History List Card */}
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

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { flex: 1 },
  container: { padding: 24, paddingBottom: 40, marginTop: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    margin: 2,
    borderColor: '#0A84FF',
  },
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
  card: {
    flex:1, marginTop: 24,
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
  filtersRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  searchContainer: { flex: 1, position: 'relative', width: '10%' },
  searchIcon: { position: 'absolute', left: 12, top: '50%', marginTop: -8 },
  searchInput: { paddingHorizontal: 4, paddingVertical: 12, borderWidth: 1, borderRadius: 8, fontSize: 16 },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0A84FF' + '20',
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0A84FF" + '20',
  },
  historyList: { marginBottom: 24 },
  historyRow: {
    flexDirection:'column',
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
  historyInfo: {  },
  historyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  historyPeriod: { fontSize: 14, fontWeight: '600' },
  historyDetails: { fontSize: 14 },
  historyRight: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  statusBadge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusText: { fontSize: 12, fontWeight: '500' },
  badgeOutline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,

  },
  badgeOutlineText: { fontSize: 12, fontWeight: '500' },
  seeButton: {
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0A84FF' + '20',
  },
  downloadButton: {
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#0A84FF'+ '20',
  },
});

export default DeclarationHistory;