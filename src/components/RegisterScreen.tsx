import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';

interface RegisterProps {
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterScreen({ onNavigateToLogin, onRegisterSuccess }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }
    onRegisterSuccess();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Welcome back to the app</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor="#C4C4C4" value={name} onChangeText={setName} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput style={styles.input} placeholder="hello@example.com" placeholderTextColor="#C4C4C4" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="••••••••••••" placeholderTextColor="#C4C4C4" secureTextEntry value={password} onChangeText={setPassword} />
        </View>

        <TouchableOpacity style={styles.termsRow} activeOpacity={0.8}>
          <View style={styles.checkboxActive} />
          <Text style={styles.termsText}>
            By continuing, you agree to our <Text style={styles.termsLink}>terms of service</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainButton} onPress={handleRegister} activeOpacity={0.8}>
          <Text style={styles.mainButtonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>or sign up with</Text>

        <TouchableOpacity style={styles.googleButton} activeOpacity={0.8}>
          <Text style={styles.googleButtonText}>G  Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerLinkContainer} onPress={onNavigateToLogin} activeOpacity={0.7}>
          <Text style={styles.footerText}>Already have an account? <Text style={styles.footerTextLink}>Sign in here</Text></Text>
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
    paddingBottom: 20
  },
  title: { 
    fontSize: 30, 
    fontWeight: '800', 
    textAlign: 'center', 
    color: '#1A1A1A', 
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 15, 
    textAlign: 'center', 
    color: '#FFCC00', 
    fontWeight: '600',
    marginBottom: 36 
  },
  inputGroup: { 
    marginBottom: 18 
  },
  label: { 
    fontSize: 13, 
    color: '#555555', 
    fontWeight: '600',
    marginBottom: 8 
  },
  input: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#EFEFEF', 
    borderRadius: 14, 
    paddingVertical: 15,
    paddingHorizontal: 18, 
    fontSize: 15, 
    color: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 26,
    paddingRight: 10
  },
  checkboxActive: {
    width: 16,
    height: 16,
    backgroundColor: '#FFCC00',
    borderRadius: 4,
    marginRight: 10
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    lineHeight: 16
  },
  termsLink: {
    color: '#FFCC00',
    fontWeight: '700'
  },
  mainButton: { 
    backgroundColor: '#FFCC00', 
    borderRadius: 28, 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginBottom: 22,
    shadowColor: '#FFCC00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  mainButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  dividerText: { 
    textAlign: 'center', 
    color: '#999999', 
    fontSize: 13, 
    marginBottom: 22 
  },
  googleButton: { 
    backgroundColor: '#F3F3F3', 
    borderRadius: 28, 
    paddingVertical: 16, 
    alignItems: 'center', 
    marginBottom: 28,
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
    paddingVertical: 6
  },
  footerText: { 
    color: '#666666', 
    fontSize: 14,
    fontWeight: '500'
  },
  footerTextLink: {
    color: '#FFCC00',
    fontWeight: '700',
    textDecorationLine: 'underline'
  }
});
