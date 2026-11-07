import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ticket } from '../../App';

interface Props {
  tickets: Ticket[];
  onBackToHome: () => void;
}

export default function MyTicketsScreen({ tickets, onBackToHome }: Props) {
  const [tab, setTab] = useState<'active' | 'archive'>('active');

  const filteredTickets = tickets.filter(t => t.status === tab);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBackToHome}><Ionicons name="home-outline" size={24} color="#111827" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Менің билеттерім</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Белсенді және Мұрағат вкладкалары */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, tab === 'active' && styles.activeTab]} onPress={() => setTab('active')}>
          <Text style={tab === 'active' ? styles.activeTabText : styles.tabText}>Белсенді</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'archive' && styles.activeTab]} onPress={() => setTab('archive')}>
          <Text style={tab === 'archive' ? styles.activeTabText : styles.tabText}>Мұрағат</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {filteredTickets.length === 0 ? (
          <Text style={styles.emptyText}>Әзірге ешқандай билет жоқ</Text>
        ) : (
          filteredTickets.map((ticket) => (
            <View key={ticket.id} style={styles.ticketCard}>
              <View style={styles.ticketHeader}>
                <Text style={styles.idText}>Билет ID: #{ticket.id}</Text>
                <Text style={styles.typeTag}>
                  {ticket.booking.transport === 'plane' ? '✈️ Ұшақ' : ticket.booking.transport === 'train' ? '🚂 Поезд' : '🚌 Автобус'}
                </Text>
              </View>

              <Text style={styles.route}>{ticket.booking.from} ➔ {ticket.booking.to}</Text>
              <Text style={styles.details}>🗓 Сапар уақыты: {ticket.booking.dateStr}</Text>
              <Text style={styles.details}>💺 Таңдалған орын: {ticket.booking.selectedSeats?.join(', ')}</Text>
              
              <View style={styles.divider} />
              
              <Text style={styles.details}>👥 Жолаушылар: {ticket.booking.passengers?.length} адам</Text>
              {/* Сатып алынған күні мен уақыты */}
              <Text style={styles.purchaseDate}>🛒 Сатып алынған уақыты: {ticket.purchaseDate}</Text>
              
              {/* Штрих-код немесе QR-код */}
              <View style={styles.qrPlaceholder}>
                <Ionicons name="barcode-outline" size={60} color="#4B5563" />
                <Text style={styles.qrText}>Тексерушіге арналған электронды штрих-код</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderBottomWidth: 2, borderColor: '#E5E7EB' },
  activeTab: { borderColor: '#FF4500' },
  tabText: { color: '#6B7280', fontWeight: '600' },
  activeTabText: { color: '#FF4500', fontWeight: '700' },
  emptyText: { textAlign: 'center', color: '#9CA3AF', marginTop: 40, fontSize: 16 },
  ticketCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 16 },
  ticketHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  idText: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  typeTag: { fontSize: 13, fontWeight: '700', color: '#FF4500' },
  route: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  details: { fontSize: 14, color: '#4B5563', marginBottom: 4 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  purchaseDate: { fontSize: 12, color: '#9CA3AF', marginTop: 4 },
  qrPlaceholder: { marginTop: 15, backgroundColor: '#F3F4F6', padding: 12, borderRadius: 12, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#D1D5DB' },
  qrText: { fontSize: 11, color: '#6B7280', marginTop: 4 }
});
