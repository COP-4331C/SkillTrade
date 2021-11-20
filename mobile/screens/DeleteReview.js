import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DeleteReviewScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>DeleteReviewScreen</Text>
        <Button
          title="Click Here"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
      </View>
    );
};

export default DeleteReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});