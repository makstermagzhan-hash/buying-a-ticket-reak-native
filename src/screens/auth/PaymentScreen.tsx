import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingDetails } from '../../App';

interface Props {
  bookingDetails: BookingDetails;
  onSuccess: () => void;
  onBack: () => void;
}

export default function PaymentScreen({ bookingDetails, onSuccess, onBack }: Props) {
  const [method, setMethod] = useState<'card' | 'qr'>('card');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Төлем жасау</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.route}>{bookingDetails.from} ➔ {bookingDetails.to}</Text>
        <Text style={styles.date}>📅 {bookingDetails.dateStr}</Text>
        <Text style={styles.seats}>💺 Таңдалған орындар: {bookingDetails.selectedSeats?.join(', ')}</Text>
        <Text style={styles.price}>Төлем сомасы: {bookingDetails.totalPrice?.toLocaleString()} ₸</Text>
      </View>

      {/* Төлем түрін таңдау копкалары */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, method === 'card' && styles.activeTab]} onPress={() => setMethod('card')}>
          <Text style={method === 'card' ? styles.activeTabText : styles.tabText}>Банк картасы</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, method === 'qr' && styles.activeTab]} onPress={() => setMethod('qr')}>
          <Text style={method === 'qr' ? styles.activeTabText : styles.tabText}>Kaspi / Halyk QR</Text>
        </TouchableOpacity>
      </View>

      {method === 'card' ? (
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Карта нөмірі (16 таңба)" keyboardType="numeric" maxLength={16} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput style={[styles.input, { flex: 0.45 }]} placeholder="Мерзімі (ММ/ЖЖ)" keyboardType="numeric" maxLength={5} />
            <TextInput style={[styles.input, { flex: 0.45 }]} placeholder="CVC" keyboardType="numeric" secureTextEntry maxLength={3} />
          </View>
        </View>
      ) : (
        <View style={styles.qrContainer}>
          <Ionicons name="qr-code" size={180} color="#111827" />
          <Text style={styles.qrHint}>Банк қосымшасынан QR-кодты сканерлеңіз немесе скриншот жасаңыз</Text>
        </View>
      )}

      <TouchableOpacity style={styles.payBtn} onPress={() => { Alert.alert('Сәтті', 'Төлеміңіз қабылданды!'); onSuccess(); }}>
        <Text style={styles.payBtnText}>Төлемді растау</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  summaryCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 },
  route: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 6 },
  date: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  seats: { fontSize: 14, color: '#6B7280', marginBottom: 10 },
  price: { fontSize: 16, fontWeight: '700', color: '#FF4500' },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderColor: '#E5E7EB' },
  activeTab: { borderColor: '#FF4500' },
  tabText: { color: '#6B7280', fontWeight: '600' },
  activeTabText: { color: '#FF4500', fontWeight: '700' },
  form: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  input: { borderBottomWidth: 1, borderColor: '#E5E7EB', paddingVertical: 10, fontSize: 16, marginBottom: 15 },
  qrContainer: { alignItems: 'center', padding: 20 },
  qrHint: { textAlign: 'center', color: '#6B7280', marginTop: 15, fontSize: 14 },
  payBtn: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 'auto' },
  payBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
