import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingDetails } from '../../App';

interface Props {
  bookingDetails: BookingDetails;
  onNext: (passengers: any[]) => void;
  onBack: () => void;
}

export default function PassengersScreen({ bookingDetails, onNext, onBack }: Props) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const totalCount = adults + children;
  const [passengerDetails, setPassengerDetails] = useState<Array<{ name: string; document: string }>>(
    Array.from({ length: 1 }, () => ({ name: '', document: '' }))
  );

  const updateCounts = (type: 'adult' | 'child', operation: '+' | '-') => {
    let newAdults = adults;
    let newChildren = children;

    if (type === 'adult') {
      newAdults = operation === '+' ? adults + 1 : Math.max(1, adults - 1);
    } else {
      newChildren = operation === '+' ? children + 1 : Math.max(0, children - 1);
    }

    setAdults(newAdults);
    setChildren(newChildren);

    const newTotal = newAdults + newChildren;
    setPassengerDetails(Array.from({ length: newTotal }, (_, i) => passengerDetails[i] || { name: '', document: '' }));
  };

  const handleInputChange = (index: number, field: 'name' | 'document', value: string) => {
    const updated = [...passengerDetails];
    updated[index] = { ...updated[index], [field]: value };
    setPassengerDetails(updated);
  };

  const handleContinue = () => {
    for (let i = 0; i < totalCount; i++) {
      if (!passengerDetails[i]?.name || !passengerDetails[i]?.document) {
        Alert.alert('Қате', 'Барлық жолаушылардың мәліметін толтырыңыз!');
        return;
      }
    }

    const fullData = passengerDetails.map((p, idx) => ({
      ...p,
      type: idx < adults ? 'adult' : 'child'
    }));
    onNext(fullData);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Жолаушылар мәліметі</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Санауыштар жолағы */}
      <View style={styles.counterCard}>
        <View style={styles.counterRow}>
          <View><Text style={styles.cLabel}>Ересектер</Text><Text style={styles.cSub}>12 жастан жоғары</Text></View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => updateCounts('adult', '-')} style={styles.minusBtn}><Text style={{fontSize: 18}}>-</Text></TouchableOpacity>
            <Text style={styles.countText}>{adults}</Text>
            <TouchableOpacity onPress={() => updateCounts('adult', '+')} style={styles.plusBtn}><Text style={{color: '#FFF', fontSize: 18}}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.counterRow}>
          <View><Text style={styles.cLabel}>Балалар</Text><Text style={styles.cSub}>0 - 12 жас (Кішкентай бала)</Text></View>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => updateCounts('child', '-')} style={styles.minusBtn}><Text style={{fontSize: 18}}>-</Text></TouchableOpacity>
            <Text style={styles.countText}>{children}</Text>
            <TouchableOpacity onPress={() => updateCounts('child', '+')} style={styles.plusBtn}><Text style={{color: '#FFF', fontSize: 18}}>+</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Жолаушылардың аты-жөндерін енгізу */}
      <Text style={styles.sectionTitle}>Құжат мәліметтері</Text>
      {Array.from({ length: totalCount }).map((_, index) => (
        <View key={index} style={styles.passCard}>
          <Text style={styles.passNumber}>👤 Жолаушы №{index + 1} ({index < adults ? 'Ересек' : 'Бала'})</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Толық аты-жөні (ФИО)" 
            value={passengerDetails[index]?.name || ''} 
            onChangeText={(v) => handleInputChange(index, 'name', v)}
          />
          <TextInput 
            style={styles.input} 
            placeholder="ЖСН (ИИН) немесе Құжат нөмірі" 
            value={passengerDetails[index]?.document || ''} 
            onChangeText={(v) => handleInputChange(index, 'document', v)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.nextBtn} onPress={handleContinue}>
        <Text style={styles.nextBtnText}>Орын таңдауға өту</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  counterCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 },
  counterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cLabel: { fontSize: 16, fontWeight: '600', color: '#111827' },
  cSub: { fontSize: 12, color: '#9CA3AF' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  minusBtn: { backgroundColor: '#E5E7EB', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  plusBtn: { backgroundColor: '#FF4500', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  countText: { marginHorizontal: 15, fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 15 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },
  passCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 14 },
  passNumber: { fontSize: 14, fontWeight: '600', color: '#FF4500', marginBottom: 10 },
  input: { borderBottomWidth: 1, borderColor: '#E5E7EB', paddingVertical: 8, marginBottom: 12, fontSize: 15 },
  nextBtn: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  nextBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
