// dark theme customisation at the end at abt 29:57
import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {useIsFocused} from "@react-navigation/native"
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// For dark theme go through video again, skipping that part


const EditSkillScreen = ({navigation, route}) => {
  // console.disableYellowBox = true;
  // const [data, setData] = React.useState({
  //   reviewId: route.params.paramKey._id, // {route.params.paramKey._id}
  //   newContent: route.params.paramKey.content,
  //   userToken: '',
  // }); 
  useEffect(() => {
    console.log("updated " + title);
  },[title]);

  const [data, setData] = React.useState({
    skillId: route.params.paramKey._id, // {route.params.paramKey._id}
    // title: route.params.paramKey.title,
    // summary: route.params.paramKey.summary,
    // description: route.params.paramKey.description,
    // status: route.params.paramKey.status,
    // price: route.params.paramKey.price,
    // country: route.params.paramKey.country,
    // state: route.params.paramKey.state,
    // city: route.params.paramKey.city,
    // imageUrl: route.params.paramKey.imageUrl,
  }); 
  // const [id, setId] = useState("");
  // setId(route.params.paramKey._id);
  const [userToken, setToken] = useState("");
  const [title, setTitle] = useState(route.params.paramKey.title);
  const [summary, setSummary] = useState(route.params.paramKey.summary);
  const [description, setDescription] = useState(route.params.paramKey.description);
  const [status, setStatus] = useState(route.params.paramKey.status);
  const [price, setPrice] = useState(route.params.paramKey.price);
  const [country, setCountry] = useState(route.params.paramKey.country);
  const [state, setState] = useState(route.params.paramKey.state);
  const [city, setCity] = useState(route.params.paramKey.city);
  // setPickedImagePath(route.params.paramKey.imageUrl)
  const [pickedImagePath, setPickedImagePath] = useState('');
  // const [pickedImagePath, setPickedImagePath] = useState('');
  
  // useEffect(() => {
  //   // connectToSkillApi(data.skillId);
  // }, []);
  const isFocused = useIsFocused()

  useEffect(()=>{
    console.log(route.params.paramKey.imageURL)
    // setPickedImagePath(route.params.paramKey.imageURL)
    if (isFocused){
      setData({
        ...data,
        skillId: route.params.paramKey._id,
        // title: route.params.paramKey.title,
        // summary: route.params.paramKey.summary,
        // description: route.params.paramKey.description,
        // status: route.params.paramKey.status,
        // price: route.params.paramKey.price,
        // country: route.params.paramKey.country,
        // state: route.params.paramKey.state,
        // city: route.params.paramKey.city,
        // imageUrl: route.params.paramKey.imageUrl,

      })
      setTitle(route.params.paramKey.title)
      setSummary(route.params.paramKey.summary)
      setDescription(route.params.paramKey.description)
      setStatus(route.params.paramKey.status)
      setPrice(route.params.paramKey.price)
      setCountry(route.params.paramKey.country)
      setState(route.params.paramKey.state)
      setCity(route.params.paramKey.city)
      // setPickedImagePath(route.params.paramKey.imageURL)
      // connectToSkillApi(data.skillId);
    }
  },[isFocused])
  // USE EFFECT ///////////////////////////////////////////////////////////////////////////
  useEffect(async() => { 
    // console.warn(data.skillId)
    let userTokenData = null; 
    try {
      userTokenData = await SecureStore.getItemAsync('userToken'); 
    } catch (e) {
        console.warn(e);
    }
    setToken(userTokenData);
  }, [])

  // USE EFFECT ///////////////////////////////////////////////////////////////////////////

  // Camera /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
  
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        setPickedImagePath(result);
        console.log(result.uri);
        // console.log(pickedImagePath)
      }
    };
  
    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync();
      //let localUri = result.uri;
      //let filename = localUri.split('/').pop();
      // setPickedImagePath(result.uri);
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        setPickedImagePath(result);
        console.log(result.uri);
      }
    };
  
    const renderInner = () => (
      <View style={styles.panel}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
          <Text style={styles.panelButtonTitle}>Choose From Libary</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => bs.current.snapTo(1)}
        >
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
  //Camera//////////////////////
  // // This function is triggered when the "Select an image" button pressed
  // const showImagePicker = async () => {
  //   // Ask the user for the permission to access the media library 
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("You've refused to allow this appp to access your photos!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync();

  //   // Explore the result
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setPickedImagePath(result); // Marked: changed all uri to url, to avoid empty uri warning
  //     console.log(result.url);
  //   }
  // }

  // // This function is triggered when the "Open camera" button pressed
  // const openCamera = async () => {
  //   // Ask the user for the permission to access the camera
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

  //   if (permissionResult.granted === false) {
  //     alert("You've refused to allow this appp to access your camera!");
  //     return;
  //   }

  //   const result = await ImagePicker.launchCameraAsync();

  //   // Explore the result
  //   console.log(result);

  //   if (!result.cancelled) {
  //     setPickedImagePath(result);
  //     console.log(result.url);
  //   }
  // }

  // const renderInner = () => (
  //   <View style={styles.panel}>
  //     <View style={{alignItems: 'center'}}>
  //       <Text style={styles.panelTitle}>Upload Photo</Text>
  //       <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
  //     </View>
  //     <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
  //       <Text style={styles.panelButtonTitle}>Take Photo</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
  //       <Text style={styles.panelButtonTitle}>Choose From Libary</Text>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={styles.panelButton} onPress={() => bs.current.snapTo(1)}>
  //       <Text style={styles.panelButtonTitle}>Cancel</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  // const renderHeader = () => (
  //   <View style={styles.header}>
  //     <View style={styles.panelHeader}>
  //       <View style={styles.panelHandle}></View>
  //     </View>

  //   </View>
  // );

  const {colors} = useTheme();
  const bs = React.createRef();
  const fall = new Animated.Value(1); 
  // Camera ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // API Connections ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // GetSkill API
  async function connectToSkillApi(skillId) {
    let userToken = null;
    try {
      userToken = await SecureStore.getItemAsync("userToken"); 
    } catch (e) {
      console.warn("SecureStore error");
    }
    axios
      .get(`https://cop4331c.herokuapp.com/api/skills/${skillId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(function (response) {
        console.log("before " +  title);
        setPickedImagePath({ uri: response.data["imageURL"] });
        setTitle(response.data["title"]);
        setDescription(response.data["description"]);
        setSummary(response.data["summary"]);
        setStatus(response.data["status"]);
        setPrice(response.data["price"]);
        setCountry(response.data["country"]);
        setState(response.data["state"]);
        setCity(response.data["city"]);
        console.log("Connetcted to get skill i!");
        console.log("after " +  title);
        console.log(response.data["title"]);
      })
      .catch(function (error) {
        // console.log(error)
        // console.warn("Fail to connect to get skill api!");
        Alert.alert(
          "Fail to connect to get skill api!", // Alert Title
          " ", // My Alert Msg
          [ // an array of objects (each object is a button)
            { 
                text: "OK", 
                onPress: () => console.log("OK Pressed") 
            },
          ], 
        )
      });
  }

  // Edit - skill API 
  async function connectToEditSkillApi(skillId, title, summary, description, status, price, country, state, city){
    let userToken = null;
    try {
      userToken = await SecureStore.getItemAsync("userToken"); 
    } catch (e) {
      console.warn("SecureStore error");
    }
    axios.put(`https://cop4331c.herokuapp.com/api/skills/${skillId}`, { // {route.params.paramKey._id}
          title: title,
          summary: summary,
          description: description,
          status: status,
          price: price,
          country: country,
          state: state,
          city: city
      }, {
          headers: {
            'Authorization': `Bearer ${userToken}`  
          }
        })
      .then(function(response) {
          Alert.alert(
            "skill edited and working!", // Alert Title
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
          console.log(error)
          Alert.alert(
            "Fail to edit skill!", // Alert Title
            " ", // My Alert Msg
            [ // an array of objects (each object is a button)
              { 
                  text: "OK", 
                  onPress: () => console.log("OK Pressed") 
              },
            ], 
          )
          
      });
  }


  // Upload Pic API Stuff
  const createFileFormData = (image, body = {}) => {
    const data = new FormData();

    data.append("file", {
      name: image.uri.split("/").pop(),
      type: "image/jpg",
      // font
      uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  function uploadProfilePic(skillId, image) {
    const data = createFileFormData(image);
    console.log(image);
    console.log(data);
    axios
      .post(
        `https://cop4331c.herokuapp.com/api/skills/${skillId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // console.warn("profile picture is changed");
        // navigation.goBack()
      })
      .catch(function (error) {
        console.log(error.message);
        // console.warn("profile picture is not changed");
      });
  }



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
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
        <View flexDirection="row">
          <TouchableOpacity style={{marginTop:10}} onPress={() => {navigation.goBack()}}>
            <Entypo name="back" size={32} color="black" />
          </TouchableOpacity>
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
                  resizeMode="cover"
                  source={{
                    uri: pickedImagePath.uri,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
                {/* <ImageBackground
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
                    <Icon name="camera" size={35} color="#666666" style={{ // "#666666" "#fff"
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}/>
                  </View>

                </ImageBackground> */}

              </View>
            </TouchableOpacity>
            <Text style={{marginBottom: 5, fontSize: 15, fontWeight: 'bold'}}>Click the camera icon to change a picture.</Text>
          </View>
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons name="format-title" size={24} color="black" />
          <TextInput 
            placeholder="Skill title"
            placeholderTextColor="#666666"
            onChangeText={(val) => setTitle(val)}
            autoCorrect={false}
            value = {title}
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
        <Entypo name="text-document" size={24} color="black" />
          <TextInput 
            placeholder="summary"
            placeholderTextColor="#666666"
            onChangeText={(val) => setSummary(val)}
            autoCorrect={false}
            value = {summary}
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
        <MaterialCommunityIcons name="file-document-edit" size={24} color="black" />
          <TextInput 
            placeholder="description"
            placeholderTextColor="#666666"
            onChangeText={(val) => setDescription(val)}
            autoCorrect={false}
            value = {description}
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
        <MaterialCommunityIcons name="calendar-star" size={24} color="black" />
          <TextInput 
            placeholder="status"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => setStatus(val)}
            value = {status}
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
        <FontAwesome5 name="comment-dollar" size={24} color="black" />
          <TextInput 
            placeholder="price"
            placeholderTextColor="#666666"
            keyboardType='decimal-pad'
            onChangeText={(val) => setPrice(val)}
            autoCorrect={false}
            value = {price.toString()}
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
            placeholder="country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => setCountry(val)}
            value = {country}
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
        <Entypo name="location" size={24} color="black" />
          <TextInput 
            placeholder="state"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(val) => setState(val)}
            value = {state}
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
        <MaterialCommunityIcons name="home-city-outline" size={24} color="black" />
          <TextInput 
            placeholder="city"
            placeholderTextColor="#666666"
            onChangeText={(val) => setCity(val)}
            autoCorrect={false}
            value = {city}
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

        <TouchableOpacity style={styles.commandButton} onPress={async() => {
          if (pickedImagePath?.uri)
            uploadProfilePic( data.skillId,  pickedImagePath);
          connectToEditSkillApi(data.skillId, title, summary, description, status, price, country, state, city);
        }}>
          <Text style={styles.panelButtonTitle}>Edit Skill</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
};


export default EditSkillScreen;

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