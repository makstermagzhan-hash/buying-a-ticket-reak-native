import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const allCities = [
  'Алматы', 'Астана', 'Шымкент', 'Қарағанды', 'Ақтөбе', 
  'Тараз', 'Павлодар', 'Өскемен', 'Семей', 'Орал', 
  'Қостанай', 'Қызылорда', 'Aтырау', 'Ақтау', 'Петропавл',
  'Түркістан', 'Көкшетау', 'Талдықорған', 'Жезқазған', 'Екібастұз'
];

interface Props {
  type: 'from' | 'to';
  currentSelection: string;
  onSelect: (city: string) => void;
  onBack: () => void;
}

export default function CitySelectionScreen({ type, currentSelection, onSelect, onBack }: Props) {
  const [search, setSearch] = useState('');

  // Іздеу жолағына қарай қалаларды сүзгіден өткізу
  const filteredCities = allCities.filter(city => 
    city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Хедер */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="close" size={26} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {type === 'from' ? 'Жөнөлу қаласы' : 'Қону/Келу қаласы'}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* Іздеу жолағы */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Қала атын жазыңыз..."
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Қалалар тізімі */}
      <FlatList
        data={filteredCities}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = item === currentSelection;
          return (
            <TouchableOpacity 
              style={[styles.cityItem, isSelected && styles.selectedCityItem]} 
              onPress={() => onSelect(item)}
            >
              <View style={styles.cityRow}>
                <Ionicons name="location-outline" size={20} color={isSelected ? "#FF4500" : "#6B7280"} />
                <Text style={[styles.cityName, isSelected && styles.selectedCityName]}>{item}</Text>
              </View>
              {isSelected && <Ionicons name="checkmark" size={20} color="#FF4500" />}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 20 },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: '#111827', padding: 0 },
  cityItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  selectedCityItem: { borderBottomColor: '#FF4500' },
  cityRow: { flexDirection: 'row', alignItems: 'center' },
  cityName: { fontSize: 16, color: '#374151', marginLeft: 12, fontWeight: '500' },
  selectedCityName: { color: '#FF4500', fontWeight: '700' }
});
