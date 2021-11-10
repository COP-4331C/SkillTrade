import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ForgetPasswordScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>ForgetPasswordScreen coming soon!</Text>
        <Button
          title="Go back"
          onPress={() => navigation.navigate('SignInScreen')}
        />
      </View>
    );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});