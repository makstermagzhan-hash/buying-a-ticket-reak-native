import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

import WelcomeScreen from './screens/auth/WelcomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import SignupSuccessScreen from './screens/auth/SignupSuccessScreen';
import ResetPasswordScreen from './screens/auth/ResetPasswordScreen';
import PersonalInfoScreen from './screens/profile/PersonalInfoScreen';
import Homepage from './screens/auth/Homepage';

// Жаңа экрандарды импорттау
import PassengersScreen from './screens/auth/PassengersScreen';
import SeatSelectionScreen from './screens/auth/SeatSelectionScreen';
import PaymentScreen from './screens/auth/PaymentScreen';
import MyTicketsScreen from './screens/profile/MyTicketsScreen';
import CitySelectionScreen from './screens/auth/CitySelectionScreen'; // Қала таңдау беті

// Брондау мәліметтерінің интерфейсі
export interface BookingDetails {
  transport: 'plane' | 'train' | 'bus';
  from: string;
  to: string;
  dateStr: string;
  pricePerTicket: number;
  passengers?: { name: string; document: string; type: 'adult' | 'child' }[];
  selectedSeats?: string[];
  totalPrice?: number;
}

// Сақталған билеттің интерфейсі
export interface Ticket {
  id: string;
  booking: BookingDetails;
  purchaseDate: string;
  status: 'active' | 'archive';
}

type ScreenType = 'welcome' | 'login' | 'register' | 'success' | 'reset_password' | 'info' | 'home' | 'passengers' | 'seats' | 'payment' | 'my_tickets' | 'city_select';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');
  
  // Брондау мен билеттерді сақтайтын стейттер
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [ticketsList, setTicketsList] = useState<Ticket[]>([]);

  // Қала таңдауға арналған жаңа стейттер
  const [citySelectType, setCitySelectType] = useState<'from' | 'to'>('from');
  const [fromCity, setFromCity] = useState('Алматы');
  const [toCity, setToCity] = useState('Астана');

  // Басты экраннан брондауға өту
  const handleStartBooking = (details: BookingDetails) => {
    setBookingDetails(details);
    setCurrentScreen('passengers');
  };

  // Жолаушыларды енгізгеннен кейін орын таңдауға өту
  const handleConfirmPassengers = (passengers: any[]) => {
    if (bookingDetails) {
      setBookingDetails({ ...bookingDetails, passengers });
      setCurrentScreen('seats');
    }
  };

  // Орын таңдағаннан кейін төлемге өту
  const handleConfirmSeats = (seats: string[], totalPrice: number) => {
    if (bookingDetails) {
      setBookingDetails({ ...bookingDetails, selectedSeats: seats, totalPrice });
      setCurrentScreen('payment');
    }
  };

  // Төлем сәтті өткенде билетті сақтау
  const handlePaymentSuccess = () => {
    if (bookingDetails) {
      const newTicket: Ticket = {
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        booking: bookingDetails,
        purchaseDate: new Date().toLocaleString('kk-KZ'),
        status: 'active',
      };
      setTicketsList([newTicket, ...ticketsList]);
      setCurrentScreen('my_tickets');
    }
  };

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

      {/* ХОУМПЕЙДЖ: Пропстар толық байланыстырылды, енді қате шықпайды */}
      {currentScreen === 'home' && (
        <Homepage 
          fromCity={fromCity}
          toCity={toCity}
          onOpenCitySelect={(type) => {
            setCitySelectType(type);
            setCurrentScreen('city_select');
          }}
          onBookTicket={handleStartBooking} 
          onNavigateToProfile={() => setCurrentScreen('my_tickets')}
        />
      )}

      {/* ҚАЛА ТАНДАУ ЭКРАНЫ */}
      {currentScreen === 'city_select' && (
        <CitySelectionScreen
          type={citySelectType}
          currentSelection={citySelectType === 'from' ? fromCity : toCity}
          onSelect={(city) => {
            if (citySelectType === 'from') setFromCity(city);
            else setToCity(city);
            setCurrentScreen('home');
          }}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'passengers' && (
        <PassengersScreen 
          bookingDetails={bookingDetails!} 
          onNext={handleConfirmPassengers} 
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'seats' && (
        <SeatSelectionScreen 
          bookingDetails={bookingDetails!} 
          onNext={handleConfirmSeats} 
          onBack={() => setCurrentScreen('passengers')}
        />
      )}

      {currentScreen === 'payment' && (
        <PaymentScreen 
          bookingDetails={bookingDetails!} 
          onSuccess={handlePaymentSuccess} 
          onBack={() => setCurrentScreen('seats')}
        />
      )}

      {currentScreen === 'my_tickets' && (
        <MyTicketsScreen 
          tickets={ticketsList} 
          onBackToHome={() => setCurrentScreen('home')}
        />
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
