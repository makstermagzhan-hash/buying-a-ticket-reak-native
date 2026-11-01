import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

interface ResetProps {
  onBack: () => void;
}

export default function ResetPasswordScreen({ onBack }: ResetProps) {
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Құпия сөзді қалпына келтіру</Text>
      <TextInput style={styles.input} placeholder="Email поштаңызды енгізіңіз" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      
      <TouchableOpacity style={styles.button} onPress={() => { Alert.alert('Сәтті', 'Сілтеме жіберілді'); onBack(); }}>
        <Text style={styles.buttonText}>Сілтеме жіберу</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Артқа</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#111827' },
  input: { borderWidth: 1, borderColor: '#E5E7EB', padding: 14, borderRadius: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#F9FAFB' },
  button: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  backButton: { padding: 10, alignItems: 'center' },
  backButtonText: { color: '#9CA3AF' }
});
