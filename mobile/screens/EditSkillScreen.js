import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditSkillScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>EditSkillScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default EditSkillScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});