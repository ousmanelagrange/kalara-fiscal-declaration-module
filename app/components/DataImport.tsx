import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const mockFiles = [
  { name: "Factures_Decembre.pdf", status: "success", size: "2.4 MB", items: 45 },
  { name: "Releve_bancaire_Q4.csv", status: "processing", size: "1.1 MB", items: 128 },
  { name: "Justificatifs_achats.zip", status: "error", size: "5.2 MB", items: 0 },
];

const getStatusIcon = (status: string, spinValue: any) => {
  switch (status) {
    case "success":
      return <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />;
    case "error":
      return <Ionicons name="close-circle-outline" size={16} color="#EF4444" />;
    default:
      return (
        <Animated.View style={{ transform: [{ rotate: spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }}>
          <Ionicons name="refresh-outline" size={16} color="#F59E0B" />
        </Animated.View>
      );
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "success": return { backgroundColor: '#10B98120', borderColor: '#10B98140' };
    case "error": return { backgroundColor: '#EF444420', borderColor: '#EF444440' };
    default: return { backgroundColor: '#F59E0B20', borderColor: '#F59E0B40' };
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "success": return "Terminé";
    case "error": return "Erreur";
    default: return "Traitement";
  }
};

const DataImport = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState(mockFiles);
  const spinValue = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const handleUpload = () => {
    // Mock : Ajoute un fichier random
    const newFile = { name: `Nouveau_${Date.now()}.pdf`, status: "processing" as const, size: "1.5 MB", items: 0 };
    setUploadedFiles(prev => [...prev, newFile]);
  };

  const renderFileItem = ({ item }: { item: typeof mockFiles[0] }) => (
    <View style={styles.fileItem}>
      <View style={styles.fileLeft}>
        <Ionicons name="document-outline" size={20} color={Colors[theme].semantic.primaryBlue} />
        <View style={styles.fileInfo}>
          <Text style={[styles.fileName, { color: Colors[theme].text }]}>{item.name}</Text>
          <Text style={[styles.fileSub, { color: Colors[theme].text + '80' }]}>
            {item.size} • {item.status === "success" ? `${item.items} éléments extraits` : "En traitement..."}
          </Text>
        </View>
      </View>
      <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
        {getStatusIcon(item.status, spinValue)}
        <Text style={[styles.statusText, { color: item.status === "success" ? "#10B981" : item.status === "error" ? "#EF4444" : "#F59E0B" }]}>
          {getStatusText(item.status)}
        </Text>
      </View>
      {item.status === "processing" && (
        <Progress.Bar progress={0.65} width={null} height={4} color={Colors[theme].semantic.primaryBlue} unfilledColor={Colors[theme].text + '30'} borderWidth={0} style={styles.fileProgress} />
      )}
    </View>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Import de données</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Importez vos factures, relevés et justificatifs</Text>
        </View>

        {/* Main Grid */}
        <View style={[styles.mainGrid, isLargeScreen ? styles.largeGrid : styles.smallGrid]}>
          {/* Upload Zone */}
          <TouchableOpacity style={[styles.uploadCard, { borderColor: Colors[theme].semantic.primaryBlue + '30' }]} onPress={handleUpload} activeOpacity={0.7}>
            <View style={styles.uploadContent}>
              <View style={[styles.uploadIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
                <Ionicons name="cloud-upload-outline" size={40} color={Colors[theme].semantic.primaryBlue} />
              </View>
              <View style={styles.uploadText}>
                <Text style={[styles.uploadTitle, { color: Colors[theme].text }]}>Glissez vos fichiers ici</Text>
                <Text style={[styles.uploadSub, { color: Colors[theme].text + '80' }]}>ou cliquez pour parcourir</Text>
                <Text style={[styles.uploadFormat, { color: Colors[theme].text + '60' }]}>PDF, CSV, Excel, Images (max 20 MB)</Text>
              </View>
              <CustomButton title="Sélectionner des fichiers" onPress={handleUpload} />
            </View>
          </TouchableOpacity>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <View style={[styles.quickCard, { borderColor: Colors[theme].text + '20' }]}>
              <View style={styles.quickHeader}>
                <Ionicons name="scan-outline" size={24} color={Colors[theme].text + '80'} />
                <Text style={[styles.quickTitle, { color: Colors[theme].text }]}>Scanner OCR</Text>
                <Text style={[styles.quickDesc, { color: Colors[theme].text + '80' }]}>Extraction automatique des factures papier</Text>
              </View>
              <CustomButton title="Activer scanner" onPress={() => console.log('Scanner')} />
            </View>

            <View style={[styles.quickCard, { borderColor: Colors[theme].text + '20' }]}>
              <View style={styles.quickHeader}>
                <Ionicons name="download-outline" size={24} color={Colors[theme].text + '80'} />
                <Text style={[styles.quickTitle, { color: Colors[theme].text }]}>Import bancaire</Text>
                <Text style={[styles.quickDesc, { color: Colors[theme].text + '80' }]}>Connexion automatique à votre banque</Text>
              </View>
              <CustomButton title="Connecter" onPress={() => console.log('Banque')} />
            </View>
          </View>
        </View>

        {/* Uploaded Files Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Fichiers importés</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Documents en cours de traitement</Text>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={uploadedFiles}
              renderItem={renderFileItem}
              keyExtractor={(item, index) => index.toString()}
              style={styles.fileList}
            />
            <View style={[styles.actionRow, { borderTopColor: Colors[theme].text + '20' }]}>
              <CustomButton title="Annuler" onPress={() => {}} />
              <CustomButton title={`Valider l'import (${uploadedFiles.filter(f => f.status === 'success').length} fichiers)`} onPress={() => navigation.navigate('DocumentVerification')} />
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={[styles.statsGrid, isLargeScreen ? styles.largeStats : styles.smallStats]}>
          <View style={[styles.statCard, { backgroundColor: '#10B98110', borderColor: '#10B98120' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: '#10B981' }]}>187</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Factures traitées</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F59E0B10', borderColor: '#F59E0B20' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: '#F59E0B' }]}>23</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>À vérifier</Text>
            </View>
          </View>
          <View style={[styles.statCard, { backgroundColor: Colors[theme].semantic.primaryBlue + '10', borderColor: Colors[theme].semantic.primaryBlue + '20' }]}>
            <View style={styles.statContent}>
              <Text style={[styles.statNumber, { color: Colors[theme].semantic.primaryBlue }]}>98%</Text>
              <Text style={[styles.statLabel, { color: Colors[theme].text + '80' }]}>Taux extraction</Text>
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
  container: { padding: 24, paddingBottom: 40, marginTop: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  mainGrid: { flexDirection: 'row', gap: 24 },
  largeGrid: { },
  smallGrid: { flexDirection: 'column' },
  uploadCard: {
    flex: 2,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  uploadContent: { alignItems: 'center', gap: 16 },
  uploadIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: { alignItems: 'center', gap: 4 },
  uploadTitle: { fontSize: 18, fontWeight: '600' },
  uploadSub: { fontSize: 14 },
  uploadFormat: { fontSize: 12 },
  quickActions: { flex: 1, gap: 16 },
  quickCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  quickHeader: { alignItems: 'center', gap: 8, marginBottom: 12 },
  quickTitle: { fontSize: 16, fontWeight: '600' },
  quickDesc: { fontSize: 12, textAlign: 'center' },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  cardTitle: { fontSize: 20, fontWeight: '600', flex: 1 },
  cardDescription: { fontSize: 14, color: '#64748B' },
  cardContent: { padding: 20 },
  grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
  fileList: { marginBottom: 24 },
  fileItem: { gap: 8, marginBottom: 16 },
  fileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  fileInfo: { flex: 1 },
  fileName: { fontSize: 14, fontWeight: '500' },
  fileSub: { fontSize: 12 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  statusText: { fontSize: 12, fontWeight: '500' },
  fileProgress: { marginTop: 4 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 24,
    borderTopWidth: 1,
    marginTop: 24,
  },
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
});

export default DataImport;