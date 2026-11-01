import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import WelcomeScreen from './screens/auth/WelcomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import SignupSuccessScreen from './screens/auth/SignupSuccessScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';
import PersonalInfoScreen from './screens/profile/PersonalInfoScreen';
import Homepage from './screens/auth/Homepage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'login' | 'register' | 'success' | 'reset_password' | 'info' | 'home'>('welcome');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={currentScreen === 'welcome' ? 'light-content' : 'dark-content'} />

      {currentScreen === 'welcome' && (
        <WelcomeScreen onNavigateToLogin={() => setCurrentScreen('login')} />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onLoginSuccess={() => setCurrentScreen('info')} 
          onForgotPassword={() => setCurrentScreen('reset_password')}
          onRegister={() => setCurrentScreen('register')}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen 
          onRegisterSuccess={() => setCurrentScreen('success')} 
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'success' && (
        <SignupSuccessScreen onContinue={() => setCurrentScreen('info')} />
      )}

      {currentScreen === 'reset_password' && (
        <ResetPasswordScreen onBack={() => setCurrentScreen('login')} />
      )}

      {currentScreen === 'info' && (
        <PersonalInfoScreen 
          onConfirm={() => setCurrentScreen('home')} 
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'home' && (
        <Homepage />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
