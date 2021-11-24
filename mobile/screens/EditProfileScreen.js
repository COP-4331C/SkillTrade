// dark theme customisation at the end at abt 29:57
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



// import { Colors } from 'react-native/Libraries/NewAppScreen';
// For dark theme go through video again, skipping that part
const EditProfileScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    aboutMe: '',
    // profilePic: '',
    instagram: '',
    twitter: '',
    linkedIn: '',
    _id: '',
    city: '',
    country: '',
    state: '',
    /*firstname: '',
    lastname: '',
    password: '',
    confirm_password: '',
    check_email_InputChange: false,
    check_firstnameInputChange: false,
    check_lastnameInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    // firstClickUser: false,
    isValidPassword: true, 
    // firstClickPassword: false,
    isValidFirstName: true,
    // firstClickFirstName: false,
    isValidLastName: true,
    isValidConfirmPassword: true,
    // firstClickConfirmPassword: false,
  // isAllThere: true,*/

});
{/*const firstNameInputChange = (val) => { // check firstNameInputChange 
  if(val.length > 0 && val.length <= 50){
      setData({
          ...data,
          firstName:val,
          //check_firstnameInputChange:true,
          //isValidFirstName:true,
          // firstClickUser: true
      })
  } else {
      setData({
          ...data,
          firstName:val,
          // check_firstnameInputChange:false,
          // isValidFirstName:false,
          // firstClickUser: true
      })
  }
}*/}

 {/* const [profileData, setProfileData] = React.useState({
    firstName: '',
    lastName: '',
    aboutMe: '',
    profilePic: '',
    instagram: '',
    twitter: '',
    linkedIn: '',
    _id: '',
    city: '',
    country: '',
    state: '',
  });*/}

  //let userToken = 'eyJhbGciOiJIUzI1NiJ9.dGVzdEBleGFtcGxlLmNvbQ.BGWbZofno0_fxz6vrrawBovDRO-RAlEe6oLCEjEC4gc';
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  // const [TwitterUrlPath, setTwitterUrlPath] = useState("Twitter");
  // setPickedImagePath(profileData.profilePic);
  // connect to api and retive info
  useEffect(async() => {
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
    } catch (e) {
        console.warn('SecureStore error');
    }
    connectToProfileApi(userToken)
  }, [])

  function connectToProfileApi(userToken){
    axios.get('https://cop4331c.herokuapp.com/api/user/profile',  {
            headers: {
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
            //setProfileData(response.data)
            // console.warn(profileData)
          //handlePicChange(response.data["profilePic"]);
          setPickedImagePath(response.data["profilePic"]);
          setFirstName(response.data["firstName"]);
          setLastName(response.data["lastName"]);
          setAboutMe(response.data["aboutMe"]);
          setTwitter(response.data["twitter"]);
          setInstagram(response.data["instagram"]);
          setLinkedIn(response.data["linkedIn"]);
          setCountry(response.data["country"]);
          setState(response.data["state"]);
          setCity(response.data["city"]);
          // handleFirstNameChange(response.data["firstName"]);
          // console.warn("the firstname is " + data.firstName)
          // handleLastNameChange(response.data["lastName"]);
          // handleAboutMeChange(response.data["aboutMe"]);
          // handleTwitterChange(response.data["twitter"]);
          // handleInstagramChange(response.data["instagram"]);
          // handleLinkedInChange(response.data["linkedIn"]);
          // handleCountryChange(response.data["country"]);
          // handleStateChange(response.data["state"]);
          //handleCityChange(response.data["city"]);
          console.warn("Connetcted to profile!")
        })
        .catch(function(error) {
            console.warn("Fail to connetcted to profile!")
        });
  }

  /*useEffect(() => {
    connectToProfileApi()
  }, [])

  async function getValueFor() {
    let userToken = null;
    try {
        userToken =  await SecureStore.getItemAsync('userToken'); // need to add 'await' 
        return userToken
    } catch (e) {
        console.warn('SecureStore error');
    }
  }

  function connectToProfileApi(){
    let userToken = getValueFor()
    axios.get('https://cop4331c.herokuapp.com/api/user/profile',  {
            headers: {
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
          handlePicChange(response.data["profilePic"]);
          handleFirstNameChange(response.data["firstName"]);
          handleLastNameChange(response.data["lastName"]);
          handleAboutMeChange(response.data["aboutMe"]);
          handleTwitterChange(response.data["twitter"]);
          handleInstagramChange(response.data["instagram"]);
          handleLinkedInChange(response.data["linkedIn"]);
          handleCountryChange(response.data["country"]);
          handleStateChange(response.data["state"]);
          handleCityChange(response.data["city"]);
            // setData(response.data)
            // setPickedImagePath(response.profilePic)
            // setTwitterUrlPath(response.twitter)
            // console.warn(profileData)
        })
        .catch(function(error) {
            console.warn("Fail to connetcted to profile!")
        });
  }*/
  // connect to edit-profile api
  function connectToEditProfileApi(userToken, firstname, lastname, aboutme, instagram, twitter, linkedin, country, state, city, pickedImagePath){
    axios.put('https://cop4331c.herokuapp.com/api/user/edit-profile', { 
                  firstName: firstname,
                  lastName: lastname,
                  aboutMe: aboutme,
                  instagram: instagram,
                  twitter: twitter,
                  linkedIn: linkedin,
                  country: country,
                  state: state,
                  city: city,
                  profilePic: pickedImagePath
            }, {
                headers: {
                  'Authorization': `Bearer ${userToken}`  
                }
              })
            .then(function(response) {
                console.warn("profile changed")
                // navigation.goBack()
                Alert.alert(
                    "Profile Changed!", // Alert Title
                    " ", // My Alert Msg
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                )
                navigation.goBack()
                // navigation.navigate('ProfileScreen')
            })
            .catch(function(error) {
                console.warn("profile not changed")
                Alert.alert(
                    "Must Have a First Name!",
                    "Please try again.",
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                )

            });
  }

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
        <Text style={styles.panelButtonTitle}>Choose From Libary</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>

    </View>
  );
  const handlePicChange = (val) => {
    
    setPickedImagePath({
        ...data,
        pickedImagePath: val,
    })
}
  const handleFirstNameChange = (val) => {
    
        setData({
            ...data,
            firstName: val,
        })
  }

  const handleLastNameChange = (val) => {
    
    setData({
        ...data,
        lastName: val,
    })
}

const handleAboutMeChange = (val) => {
    
  setData({
      ...data,
      aboutMe: val,
  })
}

const handleInstagramChange = (val) => {
    
  setData({
      ...data,
      instagram: val,
  })
}

const handleTwitterChange = (val) => {
    
  setData({
      ...data,
      twitter: val,
  })
}

const handleLinkedInChange = (val) => {
    
  setData({
      ...data,
      linkedIn: val,
  })
}

const handleCityChange = (val) => {
    
  setData({
      ...data,
      city: val,
  })
}

const handleStateChange = (val) => {
    
  setData({
      ...data,
      state: val,
  })
}

const handleCountryChange = (val) => {
    
  setData({
      ...data,
      country: val,
  })
}


  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1); 




  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <BottomSheet 
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
      opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),      
      }}>
        <View style ={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
              resizeMode='cover' 
              source={{
                uri: pickedImagePath,
              }}

              style={{height:100, width: 100}}
              imageStyle={{borderRadius: 15}}
              >
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Icon name="camera" size={35} color="#fff" style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}/>
                </View>

              </ImageBackground>

            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>Jhon Doe</Text>
        </View>
        
        <Text>Your name is {firstName}</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput 
            placeholder="First Name"
            placeholderTextColor="#666666"
            // onChangeText={(val) => firstNameInputChange(val)} 
            onChangeText={(val) => setFirstName(val)} 
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
        <Text>Your name is {firstName}</Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput 
            placeholder="Last Name"
            onChangeText={(val) => setLastName(val)} 
            placeholderTextColor="#666666"
            // onChangeText = "Hello"
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
        <Text>Your name is {lastName}</Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput 
            placeholder="About Me"
            onChangeText={(val) => setAboutMe(val)} 
            placeholderTextColor="#666666"
            autoCorrect={false}
            multiline={true}
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
        <Text>About Me {aboutMe}</Text>
        <View style={styles.action}>
          <Feather name="twitter" size={20} />
          <TextInput 
            placeholder="Twitter Url"
            onChangeText={(val) => setTwitter(val)} 
            // onChangeText={(val) => setTwitterUrlPath(val)}
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
        <Text>About Me {twitter}</Text>


        <View style={styles.action}>
          <Feather name="instagram" size={20} />
          <TextInput 
            placeholder="Instagram Url"
            onChangeText={(val) => setInstagram(val)} 
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
        <Text>About Me {instagram}</Text>

        <View style={styles.action}>
          <Feather name="linkedin" size={20} />
          <TextInput 
            placeholder="LinkedIn Url"
            onChangeText={(val) => setLinkedIn(val)} 
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
        <Text>About Me {linkedIn}</Text>

        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput 
            placeholder="Country"
            onChangeText={(val) => setCountry(val)} 
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
        <Text>About Me {country}</Text>

        <View style={styles.action}>
          <FontAwesome name="globe" size={20} />
          <TextInput 
            placeholder="State"
            onChangeText={(val) => setState(val)} 
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
        <Text>About Me {state}</Text>


        <View style={styles.action}>
          <Icon name="map-marker-outline" size={20} />
          <TextInput 
            placeholder="City"
            onChangeText={(val) => setCity(val)} 
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
        <Text>About Me {city}</Text>

        <TouchableOpacity style={styles.commandButton} onPress={async() => {
          let userToken = null;
           try {
              userToken =  await SecureStore.getItemAsync('userToken'); // need to add 'await' 
           } catch (e) {
              console.warn('SecureStore error');
           }
            connectToEditProfileApi(userToken, firstName, lastName, aboutMe, instagram, twitter, linkedIn, country, state, city, pickedImagePath)
        }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
    </ScrollView>
  );
};


export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
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
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
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
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#05375a',
  },
});