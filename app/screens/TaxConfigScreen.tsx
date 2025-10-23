import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import TaxConfiguration from '../components/TaxConfiguration';

const TaxConfigScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <TaxConfiguration />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TaxConfigScreen;
