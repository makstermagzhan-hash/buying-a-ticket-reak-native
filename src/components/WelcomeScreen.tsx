import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

interface WelcomeProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✈️</Text>
        </View>
        <Text style={styles.title}>Book Flight</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Start Your Journey</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F24E1E', // Түпнұсқа ашық қызғылт-сары түс
    padding: 24, 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 60
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 24,
    borderRadius: 40,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },
  icon: { 
    fontSize: 84,
    color: '#FFFFFF'
  },
  title: { 
    fontSize: 40, 
    fontWeight: '900', 
    color: '#FFFFFF',
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  button: { 
    backgroundColor: '#FFFFFF', 
    width: '88%', 
    paddingVertical: 18, 
    borderRadius: 35, 
    alignItems: 'center', 
    marginBottom: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6
  },
  buttonText: { 
    color: '#F24E1E', 
    fontSize: 17, 
    fontWeight: '800',
    letterSpacing: 0.4
  }
});
