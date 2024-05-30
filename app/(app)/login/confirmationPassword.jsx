import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ConfirmationPasswordPage = () => {
    const { email } = useLocalSearchParams();
  return (
    <View style={styles.container}>
    <Image 
      source={require('../../../assets/logo.png')} 
      style={styles.logo}
      f
    />
    <View style={styles.inputContainer}>
      <Text style={styles.label}>SE LE ENVIARA UN MAIL A <Text style={styles.bold}>{email}</Text> CON SU CONTRASEÑA EN CASO DE SER UN USUARIO VALIDO</Text>
    </View>
  </View>
 
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#eff0ed',
      flexDirection: 'column',
    },
    logo: {
      width: 240,
      height: 240,
      paddingTop:250,
    },
    inputContainer: {
      width: '100%',
      height: 400,
      marginTop: 30,
    },
    bold: {
      fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
    },
  });

export default ConfirmationPasswordPage;