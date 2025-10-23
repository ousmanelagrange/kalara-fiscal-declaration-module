import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import TaxCalculation from '../components/TaxCalculation';

const TaxCalculationScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <TaxCalculation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default TaxCalculationScreen;