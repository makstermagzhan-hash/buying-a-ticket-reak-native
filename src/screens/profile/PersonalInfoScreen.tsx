import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PersonalInfoProps {
  onConfirm: () => void;
  onBack: () => void;
}

export default function PersonalInfoScreen({ onConfirm, onBack }: PersonalInfoProps) {
  const [name, setName] = useState('');
  const [passport, setPassport] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Жеке мәліметтер</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatarPlaceholder}>
          <Ionicons name="person" size={40} color="#9CA3AF" />
        </View>
        <Text style={styles.welcomeText}>Сәлем, Саяхатшы!</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Аты-жөніңіз</Text>
        <TextInput style={styles.input} placeholder="Атыңызды енгізіңіз" placeholderTextColor="#9CA3AF" value={name} onChangeText={setName} />
        <Text style={styles.label}>Паспорт нөмірі</Text>
        <TextInput style={styles.input} placeholder="ED-00000-000" placeholderTextColor="#9CA3AF" value={passport} onChangeText={setPassport} />
      </View>

      <TouchableOpacity style={styles.btnConfirm} onPress={onConfirm} activeOpacity={0.9}>
        <Text style={styles.btnText}>Растау</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  contentContainer: { padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 20 },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827', textAlign: 'center', flex: 1 },
  avatarSection: { alignItems: 'center', marginVertical: 15 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  welcomeText: { fontSize: 18, fontWeight: '600', color: '#111827' },
  form: { marginBottom: 25 },
  label: { fontSize: 14, color: '#6B7280', marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 15, color: '#111827' },
  btnConfirm: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
