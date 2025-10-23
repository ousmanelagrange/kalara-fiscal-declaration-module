import React, { useRef, useEffect } from 'react';
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
import { Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const DeclarationSubmission = ({ navigation }: any) => {
  const { theme } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [pulseAnim]);

  const handleDownload = (file: string) => Alert.alert('Téléchargé', `${file} téléchargé !`);
  const handleDownloadZip = () => Alert.alert('Téléchargé', 'Tous les documents ZIP téléchargés !');
  const handleEmail = () => Alert.alert('Envoyé', 'Récépissé envoyé par email !');
  const handleHistory = () => navigation.navigate('Dashboard');  // Mock, assume Dashboard existe
  const handleDashboard = () => navigation.navigate('Dashboard');

  const timelineSteps = [
    { title: "Génération des documents", desc: "PDF et XML conformes DGI générés", time: "28 Déc 2024, 14:32", status: "success" as const },
    { title: "Transmission portail DGI", desc: "Documents transmis avec succès", time: "28 Déc 2024, 14:35", status: "success" as const },
    { title: "Validation DGI", desc: "Traitement en cours par l'administration fiscale", time: "Délai habituel: 24-48h", status: "warning" as const },
  ];

  const renderTimelineStep = (step: typeof timelineSteps[0], index: number) => (
    <View key={index} style={styles.timelineStep}>
      <View style={[
        styles.timelineCircle,
        { backgroundColor: step.status === 'success' ? '#10B981' : '#F59E0B' }
      ]}>
        {step.status === 'success' ? (
          <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
        ) : (
          <Ionicons name="time-outline" size={20} color="#FFFFFF" />
        )}
      </View>
      <View style={styles.timelineContent}>
        <View style={styles.timelineHeader}>
          <Text style={[styles.timelineTitle, { color: Colors[theme].text }]}>{step.title}</Text>
          <BadgeView variant={step.status === 'success' ? 'success' : 'warning'}>
            {step.status === 'success' ? 'Terminé' : 'En attente'}
          </BadgeView>
        </View>
        <Text style={[styles.timelineDesc, { color: Colors[theme].text + '80' }]}>{step.desc}</Text>
        <Text style={[styles.timelineTime, { color: Colors[theme].text + '80' }]}>{step.time}</Text>
      </View>
    </View>
  );

  const renderDownloadItem = (item: string, size: string, desc: string, index: number) => (
    <TouchableOpacity key={index} style={styles.dlRow} onPress={() => handleDownload(item)} activeOpacity={0.7}>
      <View style={styles.dlLeft}>
        <Ionicons name="bag-check-outline" size={20} color={Colors[theme].semantic.primaryBlue} />
        <View style={styles.dlInfo}>
          <Text style={[styles.dlName, { color: Colors[theme].text }]}>{item}</Text>
          <Text style={[styles.dlSub, { color: Colors[theme].text + '80' }]}>{size} • {desc}</Text>
        </View>
      </View>
      <CustomButton title="Télécharger" onPress={() => handleDownload(item)} variant="outline" size="small" icon="download-outline" />
    </TouchableOpacity>
  );

  const downloads = [
    { name: "Déclaration TVA (PDF)", size: "245 KB", desc: "Conforme DGI" },
    { name: "Déclaration TVA (XML)", size: "18 KB", desc: "Format télédéclaration" },
    { name: "Récépissé de dépôt", size: "87 KB", desc: "Preuve de transmission" },
  ];

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Success Header */}
        <View style={styles.header}>
          <Animated.View style={[styles.headerIcon, { transform: [{ scale: pulseAnim }] }]}>
            <Ionicons name="checkmark-circle-outline" size={48} color="#10B981" />
          </Animated.View>
          <Text style={[styles.title, { color: Colors[theme].text }]}>Déclaration transmise !</Text>
          <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Votre déclaration TVA de Décembre 2024 a été soumise avec succès</Text>
        </View>

        {/* Timeline Status Card */}
        <View style={[styles.card, { borderColor: '#10B98120', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardContent}>
            <View style={styles.timeline}>
              {timelineSteps.map(renderTimelineStep)}
            </View>
          </View>
        </View>

        {/* Reference Info Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Références de votre déclaration</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Conservez ces informations pour votre suivi</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.refGrid, isLargeScreen ? styles.largeRefGrid : styles.smallRefGrid]}>
              <View style={styles.refItem}>
                <Text style={[styles.refLabel, { color: Colors[theme].text + '80' }]}>Numéro de déclaration</Text>
                <Text style={[styles.refValue, { color: Colors[theme].text, fontFamily: 'monospace' }]}>TVA-2024-12-001234</Text>
              </View>
              <View style={styles.refItem}>
                <Text style={[styles.refLabel, { color: Colors[theme].text + '80' }]}>Date de transmission</Text>
                <Text style={[styles.refValue, { color: Colors[theme].text }]}>28 Décembre 2024, 14:35</Text>
              </View>
              <View style={styles.refItem}>
                <Text style={[styles.refLabel, { color: Colors[theme].text + '80' }]}>Montant déclaré</Text>
                <Text style={[styles.refValue, { color: Colors[theme].semantic.primaryBlue }]}>2 450 000 FCFA</Text>
              </View>
              <View style={styles.refItem}>
                <Text style={[styles.refLabel, { color: Colors[theme].text + '80' }]}>Date limite paiement</Text>
                <Text style={[styles.refValue, { color: '#F59E0B' }]}>15 Janvier 2025</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Download Documents Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Télécharger vos documents</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Tous les fichiers de votre déclaration</Text>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={downloads}
              renderItem={({ item, index }) => renderDownloadItem(item.name, item.size, item.desc, index)}
              keyExtractor={(item, index) => index.toString()}
              style={styles.dlList}
            />
            <View style={styles.zipButton}>
              <CustomButton title="Tout télécharger (ZIP)" onPress={handleDownloadZip} variant="outline" />
            </View>
          </View>
        </View>

        {/* Next Steps Card */}
        <View style={[styles.card, { borderColor: Colors[theme].semantic.primaryBlue + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Prochaines étapes</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Ce qu'il faut faire maintenant</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.stepsList}>
              <View style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
                  <Text style={{ color: Colors[theme].semantic.primaryBlue, fontWeight: 'bold' }}>1</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: Colors[theme].text }]}>Effectuer le paiement</Text>
                  <Text style={[styles.stepDesc, { color: Colors[theme].text + '80' }]}>
                    Payez le montant de 2 450 000 FCFA avant le 15 Janvier 2025 via votre banque ou le portail e-payment DGI
                  </Text>
                </View>
              </View>
              <View style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
                  <Text style={{ color: Colors[theme].semantic.primaryBlue, fontWeight: 'bold' }}>2</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: Colors[theme].text }]}>Conserver les documents</Text>
                  <Text style={[styles.stepDesc, { color: Colors[theme].text + '80' }]}>
                    Archivez tous les documents pendant 10 ans minimum (obligation légale)
                  </Text>
                </View>
              </View>
              <View style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
                  <Text style={{ color: Colors[theme].semantic.primaryBlue, fontWeight: 'bold' }}>3</Text>
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepTitle, { color: Colors[theme].text }]}>Suivre la validation</Text>
                  <Text style={[styles.stepDesc, { color: Colors[theme].text + '80' }]}>
                    Vous recevrez une notification lorsque la DGI aura validé votre déclaration
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Notifications activées</Text>
            <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Nous vous tiendrons informé</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={[styles.notifItem, { backgroundColor: Colors[theme].text + '30' }]}>
              <View style={styles.notifLeft}>
                <Ionicons name="mail-outline" size={20} color={Colors[theme].semantic.primaryBlue + '80'} />
                <View>
                  <Text style={[styles.notifTitle, { color: Colors[theme].text }]}>Email</Text>
                  <Text style={[styles.notifSub, { color: Colors[theme].text + '80' }]}>contact@entreprise.cm</Text>
                </View>
              </View>
              <BadgeView variant="success">Actif</BadgeView>
            </View>
            <View style={[styles.notifItem, { backgroundColor: Colors[theme].text + '30' }]}>
              <View style={styles.notifLeft}>
                <Ionicons name="phone-portrait-outline" size={20} color={Colors[theme].semantic.primaryBlue + '80'} />
                <View>
                  <Text style={[styles.notifTitle, { color: Colors[theme].text }]}>SMS</Text>
                  <Text style={[styles.notifSub, { color: Colors[theme].text + '80' }]}>+237 6XX XX XX XX</Text>
                </View>
              </View>
              <BadgeView variant="success">Actif</BadgeView>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <CustomButton
            title="Envoyer le récépissé par email"
            onPress={handleEmail}
            icon="send-outline"
          />
          <View style={styles.actionGrid}>
            <CustomButton title="Voir l'historique" onPress={() => navigation.navigate('DeclarationHistory')} variant="outline" />            
          </View>
        </View>

        {/* Success Message */}
        <View style={styles.successMsg}>
          <Text style={[styles.successTitle, { color: '#10B981' }]}>✓ Félicitations !</Text>
          <Text style={[styles.successSub, { color: Colors[theme].text + '80' }]}>
            Votre déclaration fiscale est en cours de traitement. <Text style={{ fontWeight: 'bold' }}>Vous avez rempli vos obligations fiscales dans les délais.</Text>
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

// BadgeView comme avant (réutilisable)
const BadgeView = ({ children, variant }: { children: string; variant: 'success' | 'warning' }) => {
  const { theme } = useTheme();
  const colors = variant === 'success' ? { bg: '#10B98110', text: '#10B981', border: '#10B98140' } : { bg: '#F59E0B10', text: '#F59E0B', border: '#F59E0B40' };
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{children}</Text>
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
  headerIcon: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  timeline: { },
  timelineStep: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  timelineCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineContent: { flex: 1 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  timelineTitle: { fontSize: 16, fontWeight: '600' },
  timelineDesc: { fontSize: 14 },
  timelineTime: { fontSize: 12, marginTop: 4 },
  refGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  largeRefGrid: {},
  smallRefGrid: { flexDirection: 'column', gap: 16 },
  refItem: { width: '48%', minWidth: 140 },
  refLabel: { fontSize: 14, marginBottom: 4 },
  refValue: { fontSize: 18, fontWeight: 'bold' },
  dlList: { marginBottom: 16 },
  dlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 8,
  },
  dlLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  dlInfo: { flex: 1 },
  dlName: { fontSize: 16, fontWeight: '500' },
  dlSub: { fontSize: 12 },
  zipButton: { marginTop: 16 },
  stepsList: { gap: 16 },
  stepItem: { flexDirection: 'row', gap: 12 },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  stepDesc: { fontSize: 14 },
  notifItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  notifLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notifTitle: { fontSize: 14, fontWeight: '500' },
  notifSub: { fontSize: 12 },
  actionGrid: { flexDirection: 'row', gap: 12 },
  successMsg: { paddingVertical: 24, alignItems: 'center' },
  successTitle: { fontSize: 18, fontWeight: 'bold' },
  successSub: { fontSize: 14, textAlign: 'center', lineHeight: 20 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: '500' },
});

export default DeclarationSubmission;