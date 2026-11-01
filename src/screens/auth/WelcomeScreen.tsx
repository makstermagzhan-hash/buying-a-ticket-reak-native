import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface WelcomeProps {
  onNavigateToLogin: () => void;
}

export default function WelcomeScreen({ onNavigateToLogin }: WelcomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.iconCircle}>
          <Ionicons name="briefcase" size={64} color="#FF4500" />
        </View>
        <Text style={styles.title}>Билеттер онлайн</Text>
        <Text style={styles.subtitle}>Ұшақтар • Поездар • Автобустар</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onNavigateToLogin} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Саяхатты бастау</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF4500', justifyContent: 'space-between', paddingVertical: 60, paddingHorizontal: 30, alignItems: 'center' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#FFE4E1', marginTop: 8, fontWeight: '500' },
  button: { backgroundColor: '#fff', width: '90%', paddingVertical: 16, borderRadius: 30, alignItems: 'center', elevation: 5 },
  buttonText: { color: '#FF4500', fontSize: 16, fontWeight: '700' }
});
