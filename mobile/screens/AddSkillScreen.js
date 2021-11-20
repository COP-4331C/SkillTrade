import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AddSkillScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>AddSkillScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default AddSkillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});