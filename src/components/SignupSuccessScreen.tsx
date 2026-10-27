import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

interface SuccessProps {
  onNavigateToLogin: () => void;
}

export default function SignupSuccessScreen({ onNavigateToLogin }: SuccessProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <Text style={styles.emoji}>🎉</Text>
        </View>
        
        <Text style={styles.title}>Congratulations!</Text>
        
        <Text style={styles.subtitle}>
          We've sent you a verification email, please check your inbox and follow the instructions to verify your account.
        </Text>
        
        <Text style={styles.thanksText}>Thank you for signing up with us!</Text>

        <TouchableOpacity style={styles.signInButton} onPress={onNavigateToLogin} activeOpacity={0.7}>
          <Text style={styles.signInButtonText}>Sign in here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAF8F0' 
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 36, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  illustrationWrapper: {
    marginBottom: 36,
    transform: [{ scale: 1.1 }]
  },
  emoji: { 
    fontSize: 90, 
    textAlign: 'center' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1A1A1A', 
    marginBottom: 18, 
    textAlign: 'center',
    letterSpacing: 0.3
  },
  subtitle: { 
    fontSize: 14, 
    color: '#8E8E93', 
    textAlign: 'center', 
    lineHeight: 24, 
    marginBottom: 20,
    fontWeight: '500'
  },
  thanksText: { 
    fontSize: 15, 
    color: '#FFCC00', 
    textAlign: 'center', 
    fontWeight: '700',
    marginBottom: 48 
  },
  signInButton: { 
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  signInButtonText: { 
    color: '#FFCC00', 
    fontSize: 17, 
    fontWeight: '800', 
    textDecorationLine: 'underline',
    letterSpacing: 0.2
  }
});
