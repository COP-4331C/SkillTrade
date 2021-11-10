import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TermsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Terms of Service Screen coming soon!</Text>
        <Button
          title="Go back"
          onPress={() => navigation.navigate('SignInScreen')}
        />
      </View>
    );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});