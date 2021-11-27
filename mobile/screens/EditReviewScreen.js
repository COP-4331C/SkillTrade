// dark theme customisation at the end at abt 29:57
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';

import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// For dark theme go through video again, skipping that part


const EditReviewScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    userId: '', // get from storage // profileId != userId FIXME ???
    reviewerId: '', // get from storage
    reviewerName: '', // get from storage & database??
    rating: 0,
    content: '',
});

  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1); 


  return (
    <View style={styles.container}>
      
      <Animated.View style={{margin: 20,
      opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),      
      }}>
        <SafeAreaView>
          <TouchableOpacity style={{marginVertical:15}} onPress={() => {navigation.goBack()}}>
            <Entypo name="back" size={32} color="black" />
          </TouchableOpacity>
        </SafeAreaView>

        
        <View style={styles.action}> 
        <FontAwesome5 name="comment-dollar" size={24} color="black" /> 
          <TextInput 
            placeholder="new rating" // FIXME: need to implement 5 star rating 
            placeholderTextColor="#666666"
            keyboardType='decimal-pad'
            autoCorrect={false}
            // Some dark theme stuff here
            // style={styles.textInput}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> 

            
        <View style={styles.action}>
        <MaterialCommunityIcons name="earth" size={24} color="black" />
          <TextInput 
            placeholder="new review content" // FIXME: need to have a big input box, input length limit(can not enter when overfit), 
            placeholderTextColor="#666666"
            autoCorrect={false}
            // Some dark theme stuff here
            // style={styles.textInput}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Edit Review</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
};


export default EditReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#694fad', //  '#FF6347'
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },

  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
  },
});