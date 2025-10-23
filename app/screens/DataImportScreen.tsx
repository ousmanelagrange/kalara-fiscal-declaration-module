import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import DataImport from '../components/DataImport';

const DataImportScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <DataImport />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DataImportScreen;