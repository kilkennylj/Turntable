import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'; // Import ImageBackground
import { useFonts } from 'expo-font';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Load the "Hendangan" font asynchronously
  const [loaded] = useFonts({
    Hendangan: require('./assets/fonts/hendangan/Hendangan.ttf'),
  });

  if (!loaded) {
    return null; // You might want to render a loading indicator here
  }

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  const handleRegister = () => {
    console.log('Registering with:', firstName, lastName, email, password);
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <ImageBackground
      source={require('./assets/circle1.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Turntable</Text>
          <View style={styles.formGroup}>
            {isRegistering && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                />
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {isRegistering ? (
              <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}
            <Text onPress={toggleRegister} style={styles.toggleText}>
              {isRegistering ? "Already have an account? Login" : "Don't have an account yet? Register"}
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'rgba(59, 59, 59, 0.6)',
    borderRadius: 8,
    borderColor: '#fff',
    borderWidth: 2,
    color: '#fff',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Hendangan',
    textAlign: 'center',
    marginBottom: 20,
    color: 'red',
  },
  formGroup: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#656565',
    marginBottom: 15,
    padding: 8,
    fontSize: 16,
    borderRadius: 20,
    width: '100%',
    color: '#fff',
  },
  button: {
    backgroundColor: '#d9d9d9',
    width: '50%',
    padding: 10,
    fontSize: 16,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
  },
  toggleText: {
    alignSelf: 'center',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

export default App;
