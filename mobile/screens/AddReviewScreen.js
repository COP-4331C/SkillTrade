import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import {useTheme} from 'react-native-paper';
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// For dark theme go through video again, skipping that part
import {useIsFocused} from "@react-navigation/native"

const AddReviewScreen = ({navigation}) => {

  const [data, setData] = React.useState({
    subjectId: '', 
    // rating: 0,
    content: '',
    userToken: '',
  }); 

  const isFocused = useIsFocused() // when screen on top, it is focused

  useEffect(async() => { 
    if (isFocused){
      let subjectIdData = null;
      let userTokenData = null;
      try {
        subjectIdData = await SecureStore.getItemAsync('hostId'); 
        userTokenData = await SecureStore.getItemAsync('userToken'); 
      } catch (e) {
          console.warn(e);
      }
      setData({
        ...data,
        subjectId: subjectIdData,
        userToken: userTokenData,
      })
    }
  }, [isFocused])


  const contentInputChange = (val) => { // check contentInputChange 
    if(val.length > 0 && val.length <= 260){
        setData({
            ...data,
            content:val,
        })
    } else {
        setData({
            ...data,
            firstname:val,
            isValidContent:false,
        })
    }
  }

  // defaultRating varable hold the user input rating as a number within 1~5
  const [defaultRating, setdefaulRating] = useState(0) // initial rating
  const [maxRating, setmaxRating] = useState([1,2,3,4,5])

  const starImgFilled = 'https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true' // source={require('../assets/logo.png')} // '../assets/star_filled.png' ?
  const starImgCorner = 'https://github.com/tranhonghan/images/blob/main/star_corner.png?raw=true'  // '../assets/star_corner.png' ?

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {
          maxRating.map((item, key) => {
            return (
              <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setdefaulRating(item)}
              >
                <Image
                  style={styles.starImgStyle}
                  source={
                    item <= defaultRating
                    ? {uri: starImgFilled} // source={require('../assets/logo.png')} // require(starImgFilled) ?
                    : {uri: starImgCorner}
                  }
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }

  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1); 

  
  function connectToAddReviewApi(subjectId, defaultRating, content, userToken){
    axios.post('https://cop4331c.herokuapp.com/api/review/create-review', {
          subjectId: subjectId, 
          rating: defaultRating,  // int
          content: content, 
      }, {
          headers: {
            'Authorization': `Bearer ${userToken}`  
          }
        })
      .then(function(response) {
          Alert.alert(
            "Review created!", // Alert Title
            " ", // My Alert Msg
            [ // an array of objects (each object is a button)
              { 
                  text: "OK", 
                  onPress: () => console.log("OK Pressed") 
              },
            ], 
          )
          navigation.goBack()
      })
      .catch(function(error) {
          // console.warn(error)
          Alert.alert(
            "Fail to add your review!",
            "Please select your rating star.",
            [ // an array of objects (each object is a button)
              { 
                  text: "OK", 
                  onPress: () => console.log("OK Pressed") 
              },
            ], 
          )
      });
  }

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

      <Text style={styles.textStyle}> Rating </Text>
      <CustomRatingBar/>
      <Text style={styles.textStyle}> {defaultRating + ' / ' + maxRating.length} </Text> 

      <Text style={[styles.textStyle,{fontSize:18}]} >write your review:</Text>
      <Text style={[styles.textStyle,{fontSize:18}]} >(no more than 260 characters)</Text>
        <View style={styles.action}>
          
          <TextInput 
            placeholder="review content" // FIXME: input length limit(can not enter when overfit), 
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline={true}
            onChangeText={(val) => contentInputChange(val)} 
            // Some dark theme stuff here
            // style={styles.textInput}
            style={[styles.textInput, {color: colors.text,}, ]}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => {
            if (data.content.length > 0 && data.content.length < 260 ){
              connectToAddReviewApi( data.subjectId, defaultRating, data.content, data.userToken) 
            }
            else {
              Alert.alert('Review must between 1 to 260 characters', '', 
                  [ // an array of objects (each object is a button)
                    { 
                        text: "OK", 
                        onPress: () => console.log("OK Pressed") 
                    },
                  ], 
              );
            } 
        }}>
          <Text style={styles.panelButtonTitle}>Add Review</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
};

export default AddReviewScreen;

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
    // marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
    height: 150,
    margin:20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 20
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop:30
  },
  starImgStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover'
  }
});