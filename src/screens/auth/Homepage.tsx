import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TransportType = 'plane' | 'train' | 'bus';

const months = ['Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым', 'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'];

interface HomepageProps {
  fromCity: string;
  toCity: string;
  onOpenCitySelect: (type: 'from' | 'to') => void;
  onBookTicket: (details: any) => void;
  onNavigateToProfile: () => void;
}

export default function Homepage({ fromCity, toCity, onOpenCitySelect, onBookTicket, onNavigateToProfile }: HomepageProps) {
  const [transport, setTransport] = useState<TransportType>('plane');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [selectedHour, setSelectedHour] = useState<number>(12);

  // Логикалық шектеулер
  const getTravelTime = () => {
    if (fromCity === toCity) return '0 сағат';
    const isClose = (fromCity === 'Алматы' && toCity === 'Тараз') || (fromCity === 'Астана' && toCity === 'Қарағанды');

    if (transport === 'bus') return isClose ? '4-5 сағат' : '12-14 сағат'; // 14 сағаттан аспайды
    if (transport === 'train') return isClose ? '6 сағат' : '22-36 сағат'; // 3 күннен аспайды
    return isClose ? '50 минут' : '1.5 - 2 сағат';
  };

  const getBasePrice = () => {
    if (transport === 'train') return 12000;
    if (transport === 'bus') return 6000;
    return 38000;
  };

  const calculateDayPrice = (day: number) => {
    const base = getBasePrice();
    const modifier = (day % 7 === 0 || day % 7 === 6) ? 1.2 : 1.0;
    return Math.round(base * modifier);
  };

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Билет іздеу</Text>
          <Ionicons name="list" size={24} color="#111827" />
        </View>

        {/* ТРАНСПОРТ ТАҢДАУ */}
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

        {/* ҚАЛАЛАРДЫ БАСҚАНДА БӨЛЕК БЕТКЕ НАВИГАЦИЯ ЖАСАУ */}
        <View style={styles.searchCard}>
          <TouchableOpacity style={styles.locationRow} onPress={() => onOpenCitySelect('from')}>
            <Ionicons name="location-outline" size={22} color="#FF4500" style={styles.fieldIcon} />
            <View>
              <Text style={styles.locLabel}>Қайдан</Text>
              <Text style={styles.locName}>{fromCity} ➔</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.locationRow} onPress={() => onOpenCitySelect('to')}>
            <Ionicons name="flag-outline" size={22} color="#FF4500" style={styles.fieldIcon} />
            <View>
              <Text style={styles.locLabel}>Қайда</Text>
              <Text style={styles.locName}>{toCity} ➔</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* АЙЛАР, КҮНДЕР, САҒАТТАР */}
        <Text style={styles.subLabel}>Айды таңдаңыз:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {months.map((month, index) => (
            <TouchableOpacity key={index} style={[styles.monthItem, selectedMonth === index && styles.activeMonthItem]} onPress={() => setSelectedMonth(index)}>
              <Text style={[styles.monthText, selectedMonth === index && styles.activeMonthText]}>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.subLabel}>Күнді таңдаңыз:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isSelected = selectedDay === day;
            return (
              <TouchableOpacity key={day} style={[styles.dayCard, isSelected && styles.activeDayCard]} onPress={() => setSelectedDay(day)}>
                <View style={styles.dayCardContent}>
                  <Text style={[styles.dayNumber, isSelected && styles.activeDayNumber]}>{day}</Text>
                  <Text style={[styles.dayPrice, isSelected && styles.activeDayPrice]}>{calculateDayPrice(day)} ₸</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.subLabel}>Сағатты таңдаңыз:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
            <TouchableOpacity key={hour} style={[styles.hourItem, selectedHour === hour && styles.activeHourItem]} onPress={() => setSelectedHour(hour)}>
              <Text style={[styles.hourText, selectedHour === hour && styles.activeHourText]}>{hour < 10 ? `0${hour}` : hour}:00</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ҚОРЫТЫНДЫ */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryDetails}>📍 Бағыт: {fromCity} ➔ {toCity}</Text>
          <Text style={styles.summaryTime}>⏱ Жолдағы уақыт: <Text style={{fontWeight: '700', color: '#FF4500'}}>{getTravelTime()}</Text></Text>
          <Text style={styles.summaryDetails}>🗓 Уақыты: {selectedDay} {months[selectedMonth]}, {selectedHour}:00</Text>
          <Text style={styles.totalPriceLabel}>Билет бағасы: <Text style={styles.totalPriceText}>{calculateDayPrice(selectedDay).toLocaleString()} ₸</Text></Text>
          
          <TouchableOpacity 
            style={styles.searchBtn}
            onPress={() => onBookTicket({
              transport,
              from: fromCity,
              to: toCity,
              dateStr: `${selectedDay} ${months[selectedMonth]}, Сағат ${selectedHour}:00 (Жолда: ${getTravelTime()})`,
              pricePerTicket: calculateDayPrice(selectedDay)
            })}
          >
            <Text style={styles.searchBtnText}>Билетті брондау</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ТӨМЕНГІ МЕНЮ */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity><Ionicons name="home" size={24} color="#FF4500" /></TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToProfile}><Ionicons name="document-text-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToProfile}><Ionicons name="heart-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToProfile}><Ionicons name="mail-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
        <TouchableOpacity onPress={onNavigateToProfile}><Ionicons name="person-outline" size={24} color="#9CA3AF" /></TouchableOpacity>
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
  locationRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  fieldIcon: { marginRight: 14 },
  locLabel: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  locName: { fontSize: 18, fontWeight: '700', color: '#111827', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 14 },
  subLabel: { fontSize: 13, color: '#6B7280', marginBottom: 8, marginTop: 12, fontWeight: '500' },
  horizontalScroll: { flexDirection: 'row', marginBottom: 10 },
  monthItem: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#FFF', borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  activeMonthItem: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  monthText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  activeMonthText: { color: '#FFF' },
  dayCard: { width: 75, height: 85, backgroundColor: '#FFF', borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', marginRight: 8 },
  activeDayCard: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  dayCardContent: { flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  dayNumber: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 2 },
  activeDayNumber: { color: '#FFF' },
  dayPrice: { fontSize: 11, color: '#9CA3AF', textAlign: 'center' },
  activeDayPrice: { color: '#FFF', fontWeight: '600' },
  hourItem: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#FFF', borderRadius: 12, marginRight: 8, borderWidth: 1, borderColor: '#E5E7EB' },
  activeHourItem: { backgroundColor: '#FF4500', borderColor: '#FF4500' },
  hourText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  activeHourText: { color: '#FFF' },
  summaryCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginTop: 20 },
  summaryDetails: { fontSize: 15, fontWeight: '600', color: '#4B5563', marginBottom: 4 },
  summaryTime: { fontSize: 15, color: '#4B5563', marginBottom: 4 },
  totalPriceLabel: { fontSize: 15, color: '#111827', marginTop: 12, fontWeight: '600' },
  totalPriceText: { fontSize: 22, fontWeight: '800', color: '#FF4500' },
  searchBtn: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 15 },
  searchBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
 bottomTabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#FFF', paddingVertical: 16, borderTopWidth: 1, borderColor: '#E5E7EB' }
});
  