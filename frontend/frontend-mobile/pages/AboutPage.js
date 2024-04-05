import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';

// Define styles using StyleSheet.create
const styles = StyleSheet.create({
  headerTitle: {
    // color: '#fff',
    // Add other text styles as needed
  },
});

const AboutPage = () => {
  return (
    <Header
      centerComponent={{ text: '', style: styles.headerTitle }}
      backgroundColor='#fff'
    />
  );
};

export default AboutPage;
