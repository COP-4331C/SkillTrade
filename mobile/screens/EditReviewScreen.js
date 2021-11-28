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
import { is } from '@babel/types';

const EditReviewScreen = ({navigation, route}) => {

  const [data, setData] = React.useState({
    reviewId: route.params.paramKey._id, // {route.params.paramKey._id}
    newContent: route.params.paramKey.content,
    userToken: '',
  }); 

  const isFocused = useIsFocused()

  useEffect(()=>{
    if (isFocused){
      setData({
        ...data,
        reviewId: route.params.paramKey._id,
        newContent: route.params.paramKey.content,
      })
      setnewRating(route.params.paramKey.rating)
    }
  },[isFocused])

  // catch newContentInputChange 
  const newContentInputChange = (val) => { 
    if(val.length > 0 && val.length <= 260){
        setData({
            ...data,
            newContent:val,
        })
    } else {
        setData({
            ...data,
            newContent:val,
            isValidContent:false,
        })
    }
  }

  useEffect(async() => { 
    let userTokenData = null; 
    try {
      userTokenData = await SecureStore.getItemAsync('userToken'); 
    } catch (e) {
        console.warn(e);
    }
    setData({
      ...data,
      userToken: userTokenData,
    })
  }, [])

  // newRating varable hold the user input rating as a number within 1~5
  const [newRating, setnewRating] = useState(route.params.paramKey.rating) // initial rating
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
              onPress={() => setnewRating(item)}
              >
                <Image
                  style={styles.starImgStyle}
                  source={
                    item <= newRating
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

  
  async function connectToEditReviewApi(reviewId, newRating, newContent, userToken){
    await axios.patch('https://cop4331c.herokuapp.com/api/review/edit-review', { // {route.params.paramKey._id}
          reviewId: reviewId, 
          newRating: newRating,  // int
          newContent: newContent, 
      }, {
          headers: {
            'Authorization': `Bearer ${userToken}`  
          }
        })
      .then(function(response) {
          Alert.alert(
            "Review updated!", // Alert Title
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
          navigation.goBack()
          Alert.alert(
            "Fail to edit review!",
            "You can not edit other user's review.",
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
      <Text style={styles.textStyle}> {newRating + ' / ' + maxRating.length} </Text> 

      <Text style={[styles.textStyle,{fontSize:18}]} >write your review:</Text>
      <Text style={[styles.textStyle,{fontSize:18}]} >(no more than 260 characters)</Text>
        <View style={styles.action}>
          
          <TextInput 
            value={data.newContent} // FIXME: input length limit(can not enter when overfit), //
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline={true}
            onChangeText={(val) => newContentInputChange(val)} 
            // Some dark theme stuff here
            // style={styles.textInput}
            style={[styles.textInput, {color: colors.text,}, ]}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => {
          console.log(data)
            if (data.newContent.length > 0 && data.newContent.length < 260 ){
              connectToEditReviewApi( data.reviewId, newRating, data.newContent, data.userToken) 
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
          <Text style={styles.panelButtonTitle}>Update Review</Text>
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