import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface SuccessProps {
  onContinue: () => void;
}

export default function SignupSuccessScreen({ onContinue }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🎉</Text>
      <Text style={styles.title}>Тіркелу сәтті өтті!</Text>
      
      <TouchableOpacity style={styles.button} onPress={onContinue}>
        <Text style={styles.buttonText}>Жалғастыру</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff', alignItems: 'center' },
  icon: { fontSize: 64, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32, textAlign: 'center' },
  button: { backgroundColor: '#FF4500', padding: 16, borderRadius: 12, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});
