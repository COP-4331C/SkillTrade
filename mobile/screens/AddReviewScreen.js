import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AddReviewScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>AddReviewScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});