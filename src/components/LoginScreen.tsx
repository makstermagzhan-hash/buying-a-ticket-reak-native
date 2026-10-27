import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

interface LoginProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onNavigateToRegister, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    onLoginSuccess();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back to the app</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="hello@example.com" 
            placeholderTextColor="#C4C4C4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.passwordHeaderRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••••••" 
            placeholderTextColor="#C4C4C4"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.keepSignedInRow} activeOpacity={0.8}>
          <View style={styles.checkboxActive} />
          <Text style={styles.checkboxLabel}>Keep me signed in</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.mainButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or sign in with</Text>

        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <Text style={styles.googleButtonText}>G  Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerLinkContainer} onPress={onNavigateToRegister} activeOpacity={0.7}>
          <Text style={styles.footerText}>Create an account</Text>
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
    paddingHorizontal: 28, 
    justifyContent: 'center',
    paddingBottom: 40
  },
  title: { 
    fontSize: 32, 
    fontWeight: '800', 
    textAlign: 'center', 
    color: '#1A1A1A', 
    marginBottom: 6,
    letterSpacing: 0.5
  },
  subtitle: { 
    fontSize: 15, 
    textAlign: 'center', 
    color: '#FFCC00', 
    fontWeight: '600',
    marginBottom: 40,
    letterSpacing: 0.2
  },
  inputGroup: { 
    marginBottom: 22 
  },
  passwordHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  label: { 
    fontSize: 13, 
    color: '#555555', 
    fontWeight: '600',
    marginBottom: 8 
  },
  forgotText: {
    fontSize: 12,
    color: '#FFCC00',
    fontWeight: '700'
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#EFEFEF', 
    borderRadius: 14, 
    paddingVertical: 16,
    paddingHorizontal: 18, 
    fontSize: 15, 
    color: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1
  },
  keepSignedInRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    paddingLeft: 2
  },
  checkboxActive: {
    width: 18,
    height: 18,
    backgroundColor: '#FFCC00',
    borderRadius: 5,
    marginRight: 10
  },
  checkboxLabel: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500'
  },
  mainButton: { 
    backgroundColor: '#FFCC00', 
    borderRadius: 28, 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginBottom: 24,
    shadowColor: '#FFCC00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  mainButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700',
    letterSpacing: 0.3
  },
  dividerText: { 
    textAlign: 'center', 
    color: '#999999', 
    fontSize: 13, 
    fontWeight: '500',
    marginBottom: 24 
  },
  googleButton: { 
    backgroundColor: '#F3F3F3', 
    borderRadius: 28, 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginBottom: 36,
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },
  googleButtonText: { 
    color: '#444444', 
    fontSize: 15, 
    fontWeight: '600' 
  },
  footerLinkContainer: { 
    alignItems: 'center',
    paddingVertical: 8
  },
  footerText: { 
    color: '#FFCC00', 
    fontSize: 15, 
    fontWeight: '700',
    textDecorationLine: 'underline'
  }
});
