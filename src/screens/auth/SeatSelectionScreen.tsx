import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookingDetails } from '../../App';

interface Props {
  bookingDetails: BookingDetails;
  onNext: (seats: string[], totalPrice: number) => void;
  onBack: () => void;
}

export default function SeatSelectionScreen({ bookingDetails, onNext, onBack }: Props) {
  const requiredSeats = bookingDetails.passengers?.length || 1;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Алдын ала алынып қойған (бос емес) орындар тізімі
  const occupiedSeats = ['A2', 'B4', 'C1', 'D5', 'A6'];
  const rows = ['A', 'B', 'C', 'D'];
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSeatPress = (seatCode: string) => {
    if (occupiedSeats.includes(seatCode)) return;

    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatCode));
    } else {
      if (selectedSeats.length >= requiredSeats) {
        Alert.alert('Назар аударыңыз', `Сіз тек ${requiredSeats} орын таңдай аласыз.`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatCode]);
    }
  };

  const totalPrice = requiredSeats * bookingDetails.pricePerTicket;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}><Ionicons name="chevron-back" size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Орын таңдау ({selectedSeats.length}/{requiredSeats})</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.cabin} showsVerticalScrollIndicator={false}>
        <View style={styles.frontIndicator}><Text style={styles.frontText}>Алдыңғы жағы (Салон басы)</Text></View>

        {numbers.map((num) => (
          <View key={num} style={styles.row}>
            {rows.map((letter) => {
              const seatCode = `${letter}${num}`;
              const isOccupied = occupiedSeats.includes(seatCode);
              const isSelected = selectedSeats.includes(seatCode);

              return (
                <TouchableOpacity
                  key={seatCode}
                  disabled={isOccupied}
                  style={[
                    styles.seat,
                    isOccupied && styles.occupiedSeat,
                    isSelected && styles.selectedSeat
                  ]}
                  onPress={() => handleSeatPress(seatCode)}
                >
                  <Text style={[styles.seatText, isSelected && styles.selectedSeatText]}>{seatCode}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.totalText}>Жалпы сомасы: {totalPrice.toLocaleString()} ₸</Text>
        <TouchableOpacity 
          style={[styles.confirmBtn, selectedSeats.length !== requiredSeats && { backgroundColor: '#9CA3AF' }]}
          disabled={selectedSeats.length !== requiredSeats}
          onPress={() => onNext(selectedSeats, totalPrice)}
        >
          <Text style={styles.confirmBtnText}>Төлемге өту</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  cabin: { alignItems: 'center', paddingVertical: 20 },
  frontIndicator: { backgroundColor: '#E5E7EB', padding: 8, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 30 },
  frontText: { color: '#6B7280', fontWeight: '600' },
  row: { flexDirection: 'row', marginBottom: 15, justifyContent: 'center' },
  seat: { width: 50, height: 50, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginHorizontal: 6 },
  occupiedSeat: { backgroundColor: '#E5E7EB', borderColor: '#E5E7EB' },
  selectedSeat: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  seatText: { fontSize: 12, fontWeight: '600', color: '#4B5563' },
  selectedSeatText: { color: '#FFF' },
  footer: { marginTop: 'auto', backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB' },
  totalText: { fontSize: 16, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  confirmBtn: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center' },
  confirmBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
