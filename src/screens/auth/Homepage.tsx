import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TransportType = 'plane' | 'train' | 'bus';

const months = ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'];

export default function Homepage() {
  const [transport, setTransport] = useState<TransportType>('plane');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<number>(12);

  const getBasePrice = () => {
    if (transport === 'train') return 15000;
    if (transport === 'bus') return 7000;
    return 45000;
  };

  const calculateDayPrice = (day: number) => {
    const base = getBasePrice();
    const modifier = (day % 7 === 0 || day % 7 === 6) ? 1.2 : 1.0;
    return Math.round(base * modifier);
  };

  const getTransportIcon = () => {
    return transport === 'train' ? 'train-outline' : transport === 'bus' ? 'bus-outline' : 'airplane-outline';
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Билет іздеу</Text>
          <Ionicons name="list" size={24} color="#111827" />
        </View>

        {/* ҰШАҚ / ПОЕЗД / АВТОБУС ТАҢДАУ */}
        <View style={styles.transportSelector}>
          {(['plane', 'train', 'bus'] as TransportType[]).map((type) => (
            <TouchableOpacity key={type} style={[styles.transportBtn, transport === type && styles.activeTransportBtn]} onPress={() => setTransport(type)}>
              <Ionicons name={type === 'plane' ? 'airplane' : type === 'train' ? 'train' : 'bus'} size={20} color={transport === type ? '#FFF' : '#6B7280'} />
              <Text style={[styles.transportBtnText, transport === type && styles.activeTransportBtnText]}>
                {type === 'plane' ? 'Ұшақ' : type === 'train' ? 'Поезд' : 'Автобус'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.searchCard}>
          <View style={styles.locationRow}>
            <Ionicons name={getTransportIcon()} size={22} color="#9CA3AF" style={styles.fieldIcon} />
            <View><Text style={styles.locLabel}>Қайдан</Text><Text style={styles.locName}>Алматы</Text></View>
          </View>
          <View style={styles.divider} />
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={22} color="#9CA3AF" style={styles.fieldIcon} />
            <View><Text style={styles.locLabel}>Қайда</Text><Text style={styles.locName}>Астана</Text></View>
          </View>
        </View>

        {/* 12 АЙДЫ ТАҢДАУ */}
        <Text style={styles.subLabel}>Айды таңдаңыз:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {months.map((month, index) => (
            <TouchableOpacity key={index} style={[styles.monthItem, selectedMonth === index && styles.activeMonthItem]} onPress={() => setSelectedMonth(index)}>
              <Text style={[styles.monthText, selectedMonth === index && styles.activeMonthText]}>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 30 КҮН ЖӘНЕ АВТОМАТТЫ БАҒАЛАР */}
        <Text style={styles.subLabel}>Күнді таңдаңыз (Астында бағасы):</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
            <TouchableOpacity key={day} style={[styles.dayCard, selectedDay === day && styles.activeDayCard]} onPress={() => setSelectedDay(day)}>
              <Text style={[styles.dayNumber, selectedDay === day && styles.activeDayNumber]}>{day}</Text>
              <Text style={[styles.dayPrice, selectedDay === day && styles.activeDayPrice]}>{calculateDayPrice(day)} ₸</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 24 САҒАТТЫ ТАҢДАУ */}
        <Text style={styles.subLabel}>Сағатты таңдаңыз:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <TouchableOpacity key={hour} style={[styles.hourItem, selectedHour === hour && styles.activeHourItem]} onPress={() => setSelectedHour(hour)}>
              <Text style={[styles.hourText, selectedHour === hour && styles.activeHourText]}>{hour < 10 ? `0${hour}` : hour}:00</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ҚОРЫТЫНДЫ КАРТОЧКАСЫ */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryDetails}>🗓 {selectedDay} {months[selectedMonth]}, Сағат {selectedHour}:00</Text>
          <Text style={styles.totalPriceLabel}>Бағасы: <Text style={styles.totalPriceText}>{calculateDayPrice(selectedDay).toLocaleString()} ₸</Text></Text>
          <TouchableOpacity style={styles.searchBtn}><Text style={styles.searchBtnText}>Билетті брондау</Text></TouchableOpacity>
        </View>
      </ScrollView>

      {/* ТӨМЕНГІ МЕНЮ */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity><Ionicons name="home" size={24} color="#FF4500" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="document-text-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="heart-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="mail-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity><Ionicons name="person-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 110 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111827' },
  transportSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  transportBtn: { flex: 1, flexDirection: 'row', backgroundColor: '#FFF', paddingVertical: 12, marginHorizontal: 4, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  activeTransportBtn: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  transportBtnText: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginLeft: 6 },
  activeTransportBtnText: { color: '#FFF' },
  searchCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 20 },
  locationRow: { flexDirection: 'row', alignItems: 'center' },
  fieldIcon: { marginRight: 14 },
  locLabel: { fontSize: 12, color: '#9CA3AF' },
  locName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
  subLabel: { fontSize: 13, color: '#6B7280', marginBottom: 8, marginTop: 12, fontWeight: '500' },
  horizontalScroll: { flexDirection: 'row', marginBottom: 10 },
  monthItem: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#FFF', borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  activeMonthItem: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  monthText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  activeMonthText: { color: '#FFF' },
  dayCard: { width: 75, height: 75, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  activeDayCard: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  dayNumber: { fontSize: 18, fontWeight: '700', color: '#111827' },
  activeDayNumber: { color: '#FFF' },
  dayPrice: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  activeDayPrice: { color: '#FFE4E1' },
  hourItem: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#FFF', borderRadius: 12, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  activeHourItem: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  hourText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  activeHourText: { color: '#FFF' },
  summaryCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginTop: 20 },
  summaryDetails: { fontSize: 16, fontWeight: '700', color: '#111827' },
  totalPriceLabel: { fontSize: 15, color: '#111827', marginTop: 12 },
  totalPriceText: { fontSize: 20, fontWeight: '800', color: '#FF4500' },
  searchBtn: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  searchBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', paddingVertical: 16, borderTopWidth: 1, borderColor: '#E5E7EB' }
});
