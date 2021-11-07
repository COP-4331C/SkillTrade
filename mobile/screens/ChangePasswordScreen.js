import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const ChangePasswordScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Forget password?</Text>
            <Button
                title="Click Here"
                onPress={() => alert('Button Clicked!')}
                />
        </View>
    )
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
