import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Animated,
    ActivityIndicator
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import { CustomButton } from './CustomButton';
import { useRef } from 'react';

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth > 600;

const initialCalculations = [
    {
        title: "TVA Collectée",
        amount: "4 850 000",
        detail: "Sur chiffre d'affaires TTC",
        change: "+12%",
        positive: true
    },
    {
        title: "TVA Déductible",
        amount: "2 400 000",
        detail: "Achats et charges",
        change: "-5%",
        positive: false
    },
    {
        title: "TVA à Payer",
        amount: "2 450 000",
        detail: "Net à reverser à la DGI",
        status: "primary"
    }
];

const verifications = [
    { label: "Cohérence des montants", status: "success", message: "Tous les calculs sont cohérents" },
    { label: "Justificatifs complets", status: "warning", message: "3 factures sans numéro NIU" },
    { label: "Seuils TVA", status: "success", message: "Seuil non franchi" },
    { label: "Délais de déclaration", status: "success", message: "Dans les temps (5 jours restants)" },
];

const getStatusIcon = (status: string, theme: keyof typeof Colors) => {
    switch (status) {
        case "success":
            return <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />;
        case "warning":
            return <Ionicons name="alert-circle-outline" size={20} color="#F59E0B" />;
        default:
            return <Ionicons name="information-circle-outline" size={20} color={Colors[theme].text + '80'} />;
    }
};

const ChangeBadge = ({ change, positive }: { change: string; positive: boolean }) => {
    const { theme } = useTheme();
    return (
        <View style={[
            styles.changeBadge,
            { borderColor: positive ? '#10B98140' : Colors[theme].text + '40' }
        ]}>
            <Ionicons name={positive ? "trending-up-outline" : "trending-down-outline"} size={12} color={positive ? "#10B981" : Colors[theme].text + '80'} />
            <Text style={[
                styles.changeText,
                { color: positive ? "#10B981" : Colors[theme].text + '80' }
            ]}>
                {change} vs mois précédent
            </Text>
        </View>
    );
};

const TaxCalculation = ({ navigation }: any) => {
    const { theme } = useTheme();
    const [calculations, setCalculations] = useState(initialCalculations);
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handleRecalculate = () => {
        setCalculations(prev => prev.map(calc => ({
            ...calc,
            amount: Math.round(Math.random() * 1000000 + 2000000).toLocaleString(),  // Mock random
        })));
    };

    const renderCalculationCard = (calc: typeof initialCalculations[0], index: number) => (
        <TouchableOpacity key={index} onPress={() => {
            Animated.timing(scaleValue, { toValue: 0.98, duration: 100, useNativeDriver: true }).start(() => {
                Animated.timing(scaleValue, { toValue: 1, duration: 100, useNativeDriver: true }).start();
            });
        }} activeOpacity={0.8}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <View style={[styles.calcCard, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
                    <View style={styles.calcHeader}>
                        <Text style={[styles.calcTitle, { color: Colors[theme].text + '80' }]}>{calc.title}</Text>
                    </View>
                    <View style={styles.calcContent}>
                        <View style={styles.amountRow}>
                            <Text style={[styles.amount, { color: Colors[theme].text }]}>{calc.amount}</Text>
                            <Text style={[styles.currency, { color: Colors[theme].text + '80' }]}>FCFA</Text>
                        </View>
                        <Text style={[styles.detail, { color: Colors[theme].text + '80' }]}>{calc.detail}</Text>
                        {calc.change && <ChangeBadge change={calc.change} positive={calc.positive} />}
                    </View>
                </View>
            </Animated.View>
        </TouchableOpacity>
    );

    const RecalculerButton = ({ isLoading = false }) => {
        return (
            <TouchableOpacity
                style={styles.recalculerButton}
                disabled={isLoading}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                    <>
                        <Ionicons name="calculator" size={20} color="#FFFFFF" />
                        <Text style={styles.recalculerText}>Recalculer</Text>
                    </>
                )}
            </TouchableOpacity>
        );
    };
    // Bouton 2 : Modifier les données (bouton secondaire/outline)
    const ModifierButton = ({ }) => {
        return (
            <TouchableOpacity
                style={styles.modifierButton}
                activeOpacity={0.8}
            >
                <Text style={styles.modifierText}>Modifier les données</Text>
            </TouchableOpacity>
        );
    };

    // Bouton 3 : Valider et passer à la génération (bouton principal pleine largeur)
    const ValiderButton = ({ isLoading = false, disabled = false }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.validerButton,
                    (disabled || isLoading) && styles.validerButtonDisabled
                ]}
                disabled={disabled || isLoading}
                activeOpacity={0.8}
            >
                {isLoading ? (
                    <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                    <Text style={styles.validerText}>Valider et passer à la génération</Text>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <LinearGradient colors={['#FFFFFF', '#F8FAFC']} style={styles.gradient}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.title, { color: Colors[theme].text }]}>Calculs fiscaux</Text>
                        <Text style={[styles.subtitle, { color: Colors[theme].text + '80' }]}>TVA - Période: Décembre 2024</Text>
                    </View>
                    <RecalculerButton isLoading={false}
                    />
                </View>

                {/* Main Calculations Grid */}
                <View style={[styles.calcGrid, isLargeScreen ? styles.largeCalcGrid : styles.smallCalcGrid]}>
                    {calculations.map(renderCalculationCard)}
                </View>

                {/* Detailed Breakdown Card */}
                <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
                    <View style={styles.cardHeader}>
                        <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Détail des opérations</Text>
                        <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Récapitulatif des transactions déclarées</Text>
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.breakdownItem}>
                            <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>Ventes TTC</Text>
                            <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>29 250 000 FCFA</Text>
                        </View>
                        <View style={[styles.separator, { backgroundColor: Colors[theme].text + '20' }]} />
                        <View style={styles.breakdownItem}>
                            <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>TVA collectée (19.25%)</Text>
                            <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>4 850 000 FCFA</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.breakdownItem}>
                            <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>Achats et charges TTC</Text>
                            <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>14 468 000 FCFA</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.breakdownItem}>
                            <Text style={[styles.breakdownLabel, { color: Colors[theme].text + '80' }]}>TVA déductible (19.25%)</Text>
                            <Text style={[styles.breakdownValue, { color: Colors[theme].text }]}>2 400 000 FCFA</Text>
                        </View>
                        <View style={[styles.separator, styles.separatorThick, { backgroundColor: Colors[theme].text + '20' }]} />
                        <View style={[styles.netRow, { backgroundColor: Colors[theme].semantic.primaryBlue + '10' }]}>
                            <Text style={[styles.netLabel, { color: Colors[theme].text }]}>TVA nette à payer</Text>
                            <Text style={[styles.netValue, { color: Colors[theme].semantic.primaryBlue }]}>2 450 000 FCFA</Text>
                        </View>
                    </View>
                </View>


                {/* Verifications Card */}
                <View style={[styles.card, { borderColor: Colors[theme].text + '20', shadowColor: Colors[theme].text + '10' }]}>
                    <View style={styles.cardHeader}>
                        <View>
                        <Text style={[styles.cardTitle, { color: Colors[theme].text }]}>Vérifications automatiques</Text>
                        <Text style={[styles.cardDescription, { color: Colors[theme].text + '80' }]}>Contrôles de conformité et d'exhaustivité</Text>
                        </View>
                    </View>
                    <View style={styles.cardContent}>
                        <View style={styles.verifList}>
                            {verifications.map((check, index) => (
                                <View key={index} style={[styles.verifItem, { backgroundColor: Colors[theme].text + '30' }]}>
                                    <View style={styles.verifIcon}>{getStatusIcon(check.status, theme)}</View>
                                    <View style={styles.verifContent}>
                                        <Text style={[styles.verifLabel, { color: Colors[theme].text }]}>{check.label}</Text>
                                        <Text style={[styles.verifMessage, { color: Colors[theme].text + '80' }]}>{check.message}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                    <ModifierButton
                    />
                    <ValiderButton
                    />
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
        marginTop: 20,
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
    calcGrid: { flexDirection: 'row', gap: 24 },
    largeCalcGrid: {},
    smallCalcGrid: { flexDirection: 'column' },
    calcCard: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    calcHeader: { padding: 16, paddingBottom: 8 },
    calcTitle: { fontSize: 12, fontWeight: '500' },
    calcContent: { padding: 16 },
    amountRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
    amount: { fontSize: 28, fontWeight: 'bold' },
    currency: { fontSize: 14 },
    detail: { fontSize: 14 },
    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 9999,
        borderWidth: 1,
    },
    changeText: { fontSize: 12, fontWeight: '500' },
    breakdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
    breakdownLabel: { fontSize: 14 },
    breakdownValue: { fontSize: 14, fontWeight: '600' },
    separator: { height: 1, marginVertical: 12 },
    separatorThick: { marginVertical: 16 },
    netRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderRadius: 8 },
    netLabel: { fontSize: 16, fontWeight: '600' },
    netValue: { fontSize: 20, fontWeight: 'bold' },
    verifList: { gap: 16 },
    verifItem: {
        flexDirection: 'row',
        gap: 12,
        padding: 12,
        borderRadius: 8,
    },
    verifIcon: { marginTop: 2 },
    verifContent: { flex: 1 },
    verifLabel: { fontSize: 14, fontWeight: '500' },
    verifMessage: { fontSize: 12, marginTop: 2 },

    buttonRow: {
        gap: 12,
    },
    // Style pour le bouton Recalculer
    recalculerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22B573',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
        minHeight: 15,
        marginLeft: 10,
    },
    recalculerText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '600',
    },

    // Style pour le bouton Modifier
    modifierButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    modifierText: {
        color: '#374151',
        fontSize: 12,
        fontWeight: '500',
    },

    // Style pour le bouton Valider
    validerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#22B573',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        width: '47%',
    },
    validerButtonDisabled: {
        backgroundColor: '#9CA3AF',
        opacity: 0.6,
    },
    validerText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
});

export default TaxCalculation;
// Already provided by React, so you can remove this custom implementation.
// If you need to use useRef, just import it from 'react' as above.
