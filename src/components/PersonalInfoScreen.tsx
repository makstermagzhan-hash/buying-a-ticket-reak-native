import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';

interface PersonalProps {
  onBack: () => void;
  onConfirm: () => void;
}

export default function PersonalInfoScreen({ onBack, onConfirm }: PersonalProps) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [passport, setPassport] = useState('');
  const [dob, setDob] = useState('');
  const [country, setCountry] = useState('');

  const handleConfirm = () => {
    if (!name || !address || !passport || !dob || !country) {
      Alert.alert('Предупреждение', 'Пожалуйста, заполните все поля');
      return;
    }
    Alert.alert('Успешно', 'Данные сохранены!');
    onConfirm();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Кастомный Хедер */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.6}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Info</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        {/* Аватар және сәлемдеме */}
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.greetingText}>Hello Traveler</Text>
        </View>

        {/* Форма өрістері */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputEmoji}>👤</Text>
            <TextInput style={styles.input} placeholder="Enter your name here" placeholderTextColor="#C4C4C4" value={name} onChangeText={setName} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputEmoji}>📍</Text>
            <TextInput style={styles.input} placeholder="Enter your address" placeholderTextColor="#C4C4C4" value={address} onChangeText={setAddress} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Passport</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputEmoji}>🪪</Text>
            <TextInput style={styles.input} placeholder="ED 00000 000" placeholderTextColor="#C4C4C4" value={passport} onChangeText={setPassport} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>DOB</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputEmoji}>📅</Text>
            <TextInput style={styles.input} placeholder="12/05/1990" placeholderTextColor="#C4C4C4" value={dob} onChangeText={setDob} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputEmoji}>🌐</Text>
            <TextInput style={styles.input} placeholder="Kazakhstan" placeholderTextColor="#C4C4C4" value={country} onChangeText={setCountry} />
          </View>
        </View>

        {/* Растау және Өткізіп жіберу батырмалары */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.8}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={onConfirm} activeOpacity={0.6}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: 60, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0',
    paddingHorizontal: 8
  },
  backButton: { 
    width: 44, 
    height: 44, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  backButtonText: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#1A1A1A' 
  },
  headerTitle: { 
    fontSize: 19, 
    fontWeight: '700', 
    color: '#1A1A1A',
    letterSpacing: 0.2
  },
  content: { 
    flex: 1, 
    paddingHorizontal: 26, 
    paddingTop: 12 
  },
  profileSection: { 
    alignItems: 'center', 
    marginBottom: 24 
  },
  avatar: { 
    width: 76, 
    height: 76, 
    borderRadius: 38, 
    backgroundColor: '#F5F5F7', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA'
  },
  avatarEmoji: { 
    fontSize: 38 
  },
  greetingText: { 
    fontSize: 17, 
    fontWeight: '600', 
    color: '#1A1A1A' 
  },
  inputGroup: { 
    marginBottom: 16 
  },
  label: { 
    fontSize: 13, 
    color: '#777777', 
    marginBottom: 6, 
    fontWeight: '600',
    paddingLeft: 2
  },
  inputWrapper: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#EAEAEA', 
    borderRadius: 12, 
    backgroundColor: '#FAFAFA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1
  },
  inputEmoji: { 
    marginLeft: 16, 
    fontSize: 18 
  },
  input: { 
    flex: 1, 
    paddingVertical: 14, 
    paddingHorizontal: 12, 
    fontSize: 15, 
    color: '#1A1A1A' 
  },
  confirmButton: { 
    backgroundColor: '#F24E1E', 
    paddingVertical: 16, 
    borderRadius: 14, 
    alignItems: 'center', 
    marginTop: 20,
    shadowColor: '#F24E1E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4
  },
  confirmButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '700',
    letterSpacing: 0.3
  },
  skipButton: { 
    paddingVertical: 14, 
    alignItems: 'center', 
    marginTop: 6 
  },
  skipButtonText: { 
    color: '#A0A0A0', 
    fontSize: 15, 
    fontWeight: '600' 
  }
});
