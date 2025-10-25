import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
    ScrollView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const defaultCategories = [
  { code: "701", name: "Ventes de marchandises", type: "Produits", status: "active" },
  { code: "706", name: "Prestations de services", type: "Produits", status: "active" },
  { code: "601", name: "Achats de marchandises", type: "Charges", status: "active" },
  { code: "604", name: "Achats stockés - Matières", type: "Charges", status: "active" },
  { code: "605", name: "Autres achats", type: "Charges", status: "active" },
  { code: "622", name: "Rémunérations du personnel", type: "Charges", status: "active" },
  { code: "624", name: "Transport", type: "Charges", status: "active" },
  { code: "626", name: "Frais postaux", type: "Charges", status: "active" },
  { code: "628", name: "Frais de télécommunications", type: "Charges", status: "active" },
  { code: "631", name: "Impôts et taxes", type: "Charges", status: "active" },
];

const initialCustomCategories = [
  { code: "CUST01", name: "Marketing digital", type: "Charges", status: "custom" },
  { code: "CUST02", name: "Frais bancaires", type: "Charges", status: "custom" },
];

const QuickSetupButton = ({ title, subtitle, iconName, onPress }: { title: string; subtitle: string; iconName: string; onPress: () => void }) => {
  const { theme } = useTheme();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => onPress());
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <View style={[styles.quickCard, { borderColor: Colors[theme].text + '20' }]}>
          <View style={[styles.quickIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
            <Ionicons name={iconName} size={24} color={Colors[theme].semantic.primaryBlue} />
          </View>
          <Text style={[styles.quickTitle, { color: Colors[theme].text }]}>{title}</Text>
          <Text style={[styles.quickSubtitle, { color: Colors[theme].text + '80' }]}>{subtitle}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const StatusBadge = ({ children, variant }: { children: string; variant: 'active' | 'custom' }) => {
  const { theme } = useTheme();
  const colors = variant === 'active' ? { bg: '#10B98120', text: '#10B981' } : { bg: Colors[theme].semantic.primaryBlue + '20', text: Colors[theme].semantic.primaryBlue };
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{children}</Text>
    </View>
  );
};

const AddButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="add-circle-outline" size={20} color={Colors[theme].text} />
      <Text style={{ color: Colors[theme].text, fontWeight: 'bold', marginLeft: 8 }}>Ajouter</Text>
    </TouchableOpacity>
  );
};

const ModifyButton = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={styles.modifyButton} onPress={onPress} activeOpacity={0.8}>
      <Text style={{ color: Colors[theme].text, fontSize: 14 }}>Modifier</Text>
    </TouchableOpacity>
  );
};

const MainActionButton = ({ title, onPress, variant = 'default' }: { title: string; onPress: () => void; variant?: 'default' | 'outline' }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity style={[
      styles.mainButton,
      variant === 'outline' ? { backgroundColor: 'transparent', borderColor: Colors[theme].semantic.primaryBlue, borderWidth: 1 } : { backgroundColor: Colors[theme].semantic.primaryBlue }
    ]} onPress={onPress} activeOpacity={0.8}>
      <Text style={[
        styles.mainButtonText,
        variant === 'outline' ? { color: Colors[theme].semantic.primaryBlue } : { color: Colors[theme].text }
      ]}>{title}</Text>
    </TouchableOpacity>
  );
};

const AccountingCategories = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [customCategories, setCustomCategories] = useState(initialCustomCategories);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');

  const handleAddCategory = () => {
    if (newCode && newName) {
      const newCat = { code: newCode, name: newName, type: "Charges", status: "custom" as const };
      setCustomCategories(prev => [...prev, newCat]);
      setNewCode('');
      setNewName('');
      console.log('Catégorie ajoutée :', newCat);
    }
  };

  const handleQuickSetup = (type: string) => {
    console.log('Setup pour', type);
    // Mock : Ajoute catégories spécifiques
  };

  const renderCategoryItem = (cat: typeof defaultCategories[0], index: number, isCustom = false) => (
    <TouchableOpacity key={index} style={styles.catRow} activeOpacity={0.7}>
      <View style={styles.catLeft}>
        <View style={[
          styles.catCode,
          isCustom ? { backgroundColor: Colors[theme].text + '10' } : { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }
        ]}>
          <Text style={[
            styles.catCodeText,
            isCustom ? { color: Colors[theme].text } : { color: Colors[theme].semantic.primaryBlue }
          ]}>{cat.code}</Text>
        </View>
        <View style={styles.catInfo}>
          <Text style={[styles.catName, { color: Colors[theme].text }]}>{cat.name}</Text>
          <Text style={[styles.catType, { color: Colors[theme].text + '80' }]}>{cat.type}</Text>
        </View>
      </View>
      <StatusBadge variant={isCustom ? 'custom' : 'active'}>Actif</StatusBadge>
      {isCustom && <ModifyButton onPress={() => console.log('Modifier', cat.code)} />}
    </TouchableOpacity>
  );

  const renderCustomItem = (cat: typeof initialCustomCategories[0], index: number) => (
    <TouchableOpacity key={index} style={[styles.catRow, { borderStyle: 'dashed', borderWidth: 1, borderColor: Colors[theme].text + '40' }]} activeOpacity={0.7}>
      <View style={styles.catLeft}>
        <View style={[styles.catCode, { backgroundColor: Colors[theme].text + '10' }]}>
          <Text style={{ color: Colors[theme].text, fontSize: 12 }}>{cat.code}</Text>
        </View>
        <View style={styles.catInfo}>
          <Text style={[styles.catName, { color: Colors[theme].text }]}>{cat.name}</Text>
          <Text style={[styles.catType, { color: Colors[theme].text + '80' }]}>{cat.type}</Text>
        </View>
      </View>
      <ModifyButton onPress={() => console.log('Modifier custom', cat.code)} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        {/* Progress Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.title, { color: Colors[theme].text }]}>Catégories comptables</Text>
            <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>Organisez vos comptes pour la déclaration</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={[styles.progressText, { color: Colors[theme].text + '80' }]}>Progression</Text>
            <Text style={[styles.progressValue, { color: Colors[theme].semantic.primaryBlue }]}>85%</Text>
          </View>
        </View>
        <Progress.Bar 
          progress={0.85} 
          width={screenWidth - 48} 
          color={Colors[theme].semantic.primaryBlue}
          unfilledColor={Colors[theme].text + '20'}
          borderWidth={0}
          height={8}
          style={styles.progress}
        />

        {/* Info Card */}
        <View style={[styles.infoCard, { backgroundColor: Colors[theme].semantic.primaryBlue + '10', borderColor: Colors[theme].semantic.primaryBlue + '20' }]}>
          <View style={styles.infoContent}>
            <View style={[styles.infoIcon, { backgroundColor: Colors[theme].semantic.primaryBlue + '20' }]}>
              <Ionicons name="folder-open-outline" size={20} color={Colors[theme].semantic.primaryBlue} />
            </View>
            <View style={styles.infoText}>
              <Text style={[styles.infoTitle, { color: Colors[theme].text }]}>Catégories pré-configurées</Text>
              <Text style={[styles.infoDesc, { color: Colors[theme].text + '80' }]}>
                Nous avons créé les catégories comptables standards selon le plan comptable OHADA. Vous pouvez les personnaliser selon vos besoins.
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Setup Grid */}
        <View style={[styles.quickGrid, isLargeScreen ? styles.largeQuickGrid : styles.smallQuickGrid]}>
          <QuickSetupButton
            title="Commerce"
            subtitle="Achat/Revente marchandises"
            iconName="shopping-cart-outline"
            onPress={() => handleQuickSetup('commerce')}
          />
          <QuickSetupButton
            title="Services"
            subtitle="Prestations intellectuelles"
            iconName="settings-outline"
            onPress={() => handleQuickSetup('services')}
          />
          <QuickSetupButton
            title="Production"
            subtitle="Fabrication et transformation"
            iconName="construct-outline"
            onPress={() => handleQuickSetup('production')}
          />
        </View>

        {/* Default Categories Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Comptes OHADA standards</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Plan comptable de base activé</Text>
            </View>
            <StatusBadge variant="active">10 comptes actifs</StatusBadge>
          </View>
          <View style={styles.cardContent}>
            <FlatList
              data={defaultCategories}
              renderItem={({ item, index }) => renderCategoryItem(item, index, false)}
              keyExtractor={(item, index) => index.toString()}
              style={styles.catList}
            />
          </View>
        </View>

        {/* Custom Categories Card */}
        <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Catégories personnalisées</Text>
              <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Ajoutez vos propres catégories spécifiques</Text>
            </View>
            <AddButton onPress={() => console.log('Ajouter catégorie')} />
          </View>
          <View style={styles.cardContent}>
            {customCategories.length > 0 && (
              <FlatList
                data={customCategories}
                renderItem={({ item, index }) => renderCustomItem(item, index)}
                keyExtractor={(item, index) => index.toString()}
                style={styles.catList}
              />
            )}
            <View style={[styles.addForm, { backgroundColor: Colors[theme].text + '30', borderColor: Colors[theme].text + '40' }]}>
              <View style={styles.formGrid}>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: Colors[theme].text }]}>Code catégorie</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                    placeholder="Ex: CUST03"
                    placeholderTextColor={Colors[theme].text + '60'}
                    value={newCode}
                    onChangeText={setNewCode}
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { color: Colors[theme].text }]}>Nom de la catégorie</Text>
                  <TextInput
                    style={[styles.input, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].text + '20' }]}
                    placeholder="Ex: Publicité Facebook"
                    placeholderTextColor={Colors[theme].text + '60'}
                    value={newName}
                    onChangeText={setNewName}
                  />
                </View>
              </View>
              <AddButton onPress={handleAddCategory} />
            </View>
          </View>
        </View>

        {/* Summary Card */}
        <View style={[styles.summaryCard, { backgroundColor: '#10B98110', borderColor: '#10B98120', shadowColor: Colors[theme].text + '10' }]}>
          <View style={styles.summaryContent}>
            <Ionicons name="checkmark-outline" size={24} color="#10B981" style={styles.summaryIcon} />
            <View style={styles.summaryText}>
              <Text style={[styles.summaryTitle, { color: Colors[theme].text }]}>Configuration comptable prête</Text>
              <Text style={[styles.summaryDesc, { color: Colors[theme].text + '80' }]}>
                Vous avez configuré <Text style={{ fontWeight: 'bold' }}>12 catégories</Text> (10 standards + 2 personnalisées). Votre système est prêt pour la saisie des transactions.
              </Text>
              <View style={styles.summaryBadges}>
                <StatusBadge variant="active">10 Produits</StatusBadge>
                <StatusBadge variant="active">2 Charges</StatusBadge>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <MainActionButton title="Précédent" onPress={() => navigation.goBack()} variant="outline" />
          <MainActionButton title="Terminer" onPress={() => navigation.navigate('DeclarationHistory')} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  scroll: { flex: 1 },
  container: { padding: 24, paddingBottom: 40,
    marginTop: 20
   },
  header: { flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
},

  headerLeft: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14 },
  headerRight: { alignItems: 'flex-end' },
  progressText: { fontSize: 12 },
  progressValue: { fontSize: 20, fontWeight: 'bold' },
  progress: { height: 8, marginBottom: 32 },
  infoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 0,
  },
  infoContent: { flexDirection: 'row', gap: 12, padding: 24 },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: { flex: 1 },
  infoTitle: { fontSize: 16, fontWeight: '600' },
  infoDesc: { fontSize: 14, marginTop: 4 },
  quickGrid: { flexDirection: 'row', gap: 16 },
  largeQuickGrid: {},
  smallQuickGrid: { flexDirection: 'column' },
  quickCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  quickSubtitle: { fontSize: 12, textAlign: 'center' },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  cardHeaderLeft: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '600' },
  cardDescription: { fontSize: 14, marginTop: 4 },
  cardContent: { padding: 20 },
  catList: { },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFF" + '20',
    marginBottom: 8,
  },
  catLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  catCode: {
    width: 64,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catCodeText: { fontSize: 12, fontWeight: 'bold' },
  catInfo: { flex: 1 },
  catName: { fontSize: 14, fontWeight: '500' },
  catType: { fontSize: 12 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  badgeText: { fontSize: 12, fontWeight: '500' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#FFF' + '40',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "0A84FF",
    marginTop: 8,
    padding: 6,
  },
  modifyButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFF' + '40',
  },
  addForm: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    marginTop: 16,
  },
  formGrid: { flexDirection: 'row',    flexWrap: 'wrap',
    justifyContent: 'space-between',gap: 16 },
  inputGroup: { width: '100%',
 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
  summaryCard: {
    borderWidth: 1,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  summaryContent: { flexDirection: 'row', gap: 12, padding: 24 },
  summaryIcon: { marginTop: 2 },
  summaryText: { flex: 1 },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  summaryDesc: { fontSize: 14, marginBottom: 12 },
  summaryBadges: { flexDirection: 'row', gap: 8 },
  actions: { flexDirection: 'row', gap: 12 },
  mainButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  mainButtonText: { fontSize: 14, fontWeight: 'bold' },
});

export default AccountingCategories;