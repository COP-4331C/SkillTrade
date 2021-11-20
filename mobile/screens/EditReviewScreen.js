import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditReviewScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>EditReviewScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default EditReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});