import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeleteSkillScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>DeleteSkillScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default DeleteSkillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});