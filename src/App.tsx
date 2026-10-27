import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SignupSuccessScreen from './components/SignupSuccessScreen';
import WelcomeScreen from './components/WelcomeScreen';
import PersonalInfoScreen from './components/PersonalInfoScreen';

type ScreenType = 'Login' | 'Register' | 'SignupSuccess' | 'Welcome' | 'PersonalInfo';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('Login');

  return (
    <View style={styles.container}>
      
      {/* 1. Кіру экраны */}
      {currentScreen === 'Login' && (
        <LoginScreen 
          onNavigateToRegister={() => setCurrentScreen('Register')}
          onLoginSuccess={() => setCurrentScreen('Welcome')} 
        />
      )}
      
      {/* 2. Тіркелу экраны */}
      {currentScreen === 'Register' && (
        <RegisterScreen 
          onNavigateToLogin={() => setCurrentScreen('Login')}
          onRegisterSuccess={() => setCurrentScreen('SignupSuccess')} 
        />
      )}

      {/* 3. Тіркелу сәтті аяқталды деген құттықтау экраны */}
      {currentScreen === 'SignupSuccess' && (
        <SignupSuccessScreen 
          onNavigateToLogin={() => setCurrentScreen('Login')} 
        />
      )}

      {/* 4. Ұшақ күтіп алу экраны "Book Flight" */}
      {currentScreen === 'Welcome' && (
        <WelcomeScreen 
          onStart={() => setCurrentScreen('PersonalInfo')} 
        />
      )}

      {/* 5. Жеке деректерді енгізу экраны */}
      {currentScreen === 'PersonalInfo' && (
        <PersonalInfoScreen 
          onBack={() => setCurrentScreen('Welcome')}
          onConfirm={() => setCurrentScreen('Login')} 
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
