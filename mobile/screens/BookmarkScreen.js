import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';

const BookmarkScreen = ({navigation}) => {

    let starNum = 3
    
    return (
        <View style={styles.container}>
            <Text>Bookmarks Screen</Text>
            <Button
                title="go back"
                onPress={() => navigation.goBack()}
                />
                
            <StarRating
            disabled={false}
            maxStars={5}
            rating={starNum}
            fullStarColor={'gold'}
            />
        </View>
    )
}

export default BookmarkScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
