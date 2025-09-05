import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  return (
    <LinearGradient
      colors={['rgba(199, 244, 246, 1)', 'rgba(209, 244, 246, 1)','rgba(229, 244, 245, 1)','rgba(0, 204, 249, 1)']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/logo.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>GROW</Text>
        <Text style={styles.title}>YOUR BUSINESS</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We will help you to grow your business using online server
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        {/* HOW WE WORK? section */}
        <View style={styles.howWeWorkContainer}>
          <Text style={styles.howWeWorkText}>HOW WE WORK?</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 58,
    borderWidth: 5,
    borderColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    marginTop: 50,
    textAlign: 'center',
    paddingHorizontal: 10,
    color: '#000',
    fontSize: 16,
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#E3C000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    minWidth: 100,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  howWeWorkContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  howWeWorkText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    textDecorationLine: 'underline',
  },
});

export default App;