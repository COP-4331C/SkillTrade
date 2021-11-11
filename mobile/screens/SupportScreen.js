import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SupportScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>Support Screen</Text>
        <Button
          title="go back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
};

export default SupportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
});