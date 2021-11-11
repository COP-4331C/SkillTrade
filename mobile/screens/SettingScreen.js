import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Settings Screen</Text>
        <Button
          title="go back"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="change password"
          onPress={() => navigation.navigate('ChangePasswordScreen')}
        />
      </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});