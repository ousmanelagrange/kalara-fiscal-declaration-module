import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import DeclarationGeneration from '../components/DeclarationGeneration';

const DeclarationGenerationScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <DeclarationGeneration />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DeclarationGenerationScreen;