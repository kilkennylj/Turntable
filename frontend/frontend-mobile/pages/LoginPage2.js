import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
//import { useHistory } from 'react-router-dom';
var jwt;
const LoginPage = ({navigation}) => {
  console.log('App started');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [jwt, setJwt] = useState('');
  const [loaded] = useFonts({
    Hendangan: require('../assets/fonts/hendangan/Hendangan.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  
    const data = {
      login: email,
      password: password,
    };
  
    fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');
        }
        return response.json();
      })
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log('JWT Token:', data.accessToken);
  
          // Pass the JWT token to the LandingPage component
          navigation.navigate('LandingPage', { jwt: data.accessToken });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegister = () => {
    console.log('Registering with:', firstName, lastName, email, password);

    const Passwordshortmessage = 'Password must be at least 8 characters long, and contain at least one number, one uppercase letter, one lowercase letter, and one special character.';
    const FirstNamemessage = 'Please enter your first name';
    const LastNamemessage = 'Please enter your last name';
    const UserNamemessage = 'Please enter your username';
    const Emailmessage = 'Please enter a valid email address';

    if (password.length < 8 || !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      alert(Passwordshortmessage);
      return;
    } else if (firstName.length < 1) {
      alert(FirstNamemessage);
      return;
    } else if (lastName.length < 1) {
      alert(LastNamemessage);
      return;
    } else if (username.length < 1) {
      alert(UserNamemessage);
      return;
    } else if (email.length < 1 || !email.includes('@') || !email.includes('.')) {
      alert(Emailmessage);
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      username: username,
    };

    fetch('https://turntable-d8f41b9ae77d.herokuapp.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const toggleRegister = () => {
    console.log('Toggling register');
    setIsRegistering(!isRegistering);
  };


  return (
    <ImageBackground
      source={{ uri: 'https://media.giphy.com/media/pRWBFVZYNVe4vW1Waq/giphy.gifhttps://media.giphy.com/media/pRWBFVZYNVe4vW1Waq/giphy.gif' }}
      style={{ ...styles.backgroundImage, backgroundColor: 'black' }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Turntable</Text>
          <View style={styles.formGroup}>
            {isRegistering && (
              <>
                <TextInput
                  style={{ ...styles.input, backgroundColor: 'white', fontSize: 16, color: 'black' }}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                />
                <TextInput
                  style={{ ...styles.input, backgroundColor: 'white', fontSize: 16, color: 'black' }}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                />
                <TextInput
                  style={{ ...styles.input, backgroundColor: 'white', fontSize: 16, color: 'black' }}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                />
              </>
            )}
            <TextInput
              style={{ ...styles.input, backgroundColor: 'white', fontSize: 16, color: 'black' }}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={{ ...styles.input, backgroundColor: 'white', fontSize: 16, color: 'black' }}
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
            <Text onPress={toggleRegister} style={{ ...styles.toggleText, fontWeight: 'bold', fontSize: 14 }}>
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
    backgroundColor: 'rgba(59, 59, 59, 0.9)',
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

export default LoginPage;
