import React, { Component, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, Image, ScrollView, Linking, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Entypo, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Directions, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AddSkillScreen from './AddSkillScreen';
import moment from "moment";
// import { DirectConnect } from 'aws-sdk';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const ProfileScreen = ({navigation}) => {

  const [profileData, setProfileData] = React.useState({
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
  });

  const [reviewData, setReviewData] = React.useState([]);

  
  useEffect(async() => {
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
    } catch (e) {
        console.warn(e);
    }
    connectToProfileApi(userToken) // if need to get userId, can get it form profile API

    let userId = '6189698db9e8c8287e27ab7a'; //should be null; 
    // try {
    //     userId = await SecureStore.getItemAsync('userId'); // can get the userId when connect to profile API, store in SecureStore, then get it back here. // or try to use the data get from profile API directly
    // } catch (e) {
    //     console.warn(e);
    // }
    connectToGetReviewApi(userId)
  }, [])

  function connectToProfileApi(userToken){
    axios.get('https://cop4331c.herokuapp.com/api/user/profile',  {
            headers: {
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
            setProfileData(response.data)
            // console.warn(profileData)
        })
        .catch(function(error) {
            console.warn(error)
        });
  }

  function connectToGetReviewApi(userId){
    axios.get(`https://cop4331c.herokuapp.com/api/review/get-reviews/${userId}`,  {
            
          })
        .then(function(response) {
            setReviewData(response.data)
            // console.warn(profileData)
        })
        .catch(function(error) {
            console.warn(error)
        });
  }

  let userId = profileData._id
  try {
    SecureStore.setItemAsync('userId', userId); //store userId in SecureStore
  } catch (e) {
    console.log(e);
  }

  const deleteSkillHandler = () => {
    navigation.navigate('EditSkillScreen') // FIXME: connect to delete skill API and delete record
  }

  const deleteReviewHandler = () => {
    navigation.navigate('EditReviewScreen') // FIXME: connect to delete review API and delete record
  }

  const renderItem = ({ item }) => (
    <Item title={item.reviewerName} />
  );

  const renderPost = post => { // const???
    return (
        <View>
            <View style={styles.reviewContainer}>
              <Text style={[styles.text, {fontWeight: "500"}]}>@{post.reviewerName}: 
              <Text style={{fontWeight:"400"}}> {post.content}</Text>
              </Text>
              <View style={{paddingTop: 8}} flexDirection="row" justifyContent='flex-end'>
                <TouchableOpacity onPress={()=>{ navigation.navigate('EditReviewScreen')}} > 
                  <AntDesign name="edit" size={18} color="black" />
                </TouchableOpacity>
                <Text>           </Text>
                <TouchableOpacity onPress={()=>{ deleteReviewHandler() }} >                 
                  <AntDesign name="delete" size={18} color="black" />
                </TouchableOpacity>
              </View>
            </View>
        </View>
    );
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.titleBar}>
          <Ionicons name="location-sharp" size={24} color="black">
            <Text style={{fontSize:24}}>{profileData.city}</Text>
          </Ionicons>
          <Text style={{fontSize:24}}>{profileData.state}</Text>
          <Text style={{fontSize:24}}>{profileData.country}</Text>
        </View>

        <View style={{alignSelf:"center"}}>
          <View style={styles.profileImage}>
            <Image source={{url:profileData.profilePic}} style={styles.image} resizeMode="center"></Image>
          </View>
          <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
          </View> 
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons name="ios-add" size={48} color="#DFD8c8" style={{marginTop: 6, marginLeft: 2}}></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, {fontWeight:"200", fontSize: 36}]}>@{profileData.firstName} {profileData.lastName}</Text>
          <Text style={[styles.text, {color:"#AEB5BC", fontSize:14}]}>Chef/Photographer/Surfer/Bookworm</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>234</Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View style={[styles.statsBox, {borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth:1}]}>
            <Text style={[styles.text, {fontSize: 24}]}>4,324</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>100</Text>
            <Text style={[styles.text, styles.subText]}>Coins</Text>
          </View>
        </View>

        <View style={styles.mediaContainer}> 
          <View style={styles.statsBox}>
            <TouchableOpacity onPress={()=>{ Linking.openURL( `https://www.instagram.com/${profileData.instagram}` )}} > 
              <AntDesign name="instagram" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.statsBox}>
          < TouchableOpacity onPress={()=>{ Linking.openURL( `https://twitter.com/${profileData.twitter}` )}} > 
              <AntDesign name="twitter" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.statsBox}>
            <TouchableOpacity onPress={()=>{ Linking.openURL( `https://www.linkedin.com/${profileData.linkedIn}` )}} > 
              <AntDesign name="linkedin-square" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.sectionContainer, {marginTop:15}]}>
          <Text style={styles.sectionTitle}> ABOUT ME </Text>
          <Text style={styles.about}>{profileData.aboutMe}</Text>
        </View>
        
        <View style={styles.sectionContainer}>
          <View style={[{flexDirection: "row"},{justifyContent: 'space-between'}]}>
            <Text style={styles.sectionTitle}> MY SKILLS </Text>
            <TouchableOpacity onPress={()=>{ navigation.navigate('AddSkillScreen')}} > 
             <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.skillContainer}>
            <View style={styles.skillBar}>
              <Text style={[styles.about, {fontWeight:"600"}]}>Cooking chinese food</Text>
              <TouchableOpacity onPress={()=>{ navigation.navigate('EditSkillScreen')}} > 
                <AntDesign name="edit" size={18} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{ deleteSkillHandler() }} > 
                <AntDesign name="delete" size={18} color="black" />
              </TouchableOpacity>

            </View>
            <Text style={[styles.about, {fontWeight:"400"}]}>
              I am good at cooking and have been a chef in a chinese resturant couple years ago.
            </Text>

            <View style={{marginTop:10}}>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                  <Image source={{uri:'https://pic2.zhimg.com/v2-705cd9ed6cb5ffb9bca5b0aa7941c18f_1440w.jpg?source=172ae18b'}} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.imageContainer}>
                  <Image source={{uri:'https://static2.qiang100.com/images/zhuanti-icon/original/400/gouliang.jpg'}} style={styles.image} resizeMode="cover"></Image>
                </View>
                <View style={styles.imageContainer}>
                  <Image source={{uri:'https://p5.itc.cn/images01/20210301/547198d3eb884443ace76c9a9d3d77fb.jpeg'}} style={styles.image} resizeMode="cover"></Image>
                </View>
              </ScrollView>
            </View>
          </View>

        </View>

        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, {marginBottom:18}]}> WANT TO LEARN </Text>
          {/* <Text style={[styles.subText, styles.recent]}>Recent Activity</Text> */}
          <View style={{alignItems:"center"}}>
            <View style={styles.recentItem}>
                <View style={styles.recentItemIndicator}></View>
                <View style={{width:250}}>
                  <Text style={[styles.text, {color:"#41444B", fontWeight:"600"}]}>Play piano -  </Text>
                  <Text style={[styles.text, {fontWeight: "400"}]}>entry level / 
                  <Text style={{fontWeight:"400"}}> pay by exchange hours</Text>
                  </Text>
                </View>
            </View>
          </View>
          <View style={{alignItems:"center"}}>
            <View style={styles.recentItem}>
                <View style={styles.recentItemIndicator}></View>
                <View style={{width:250}}>
                  <Text style={[styles.text, {color:"#41444B", fontWeight:"600"}]}>Coding in Python - </Text>
                  <Text style={[styles.text, {fontWeight: "400"}]}>advanced level / 
                  <Text style={{fontWeight:"400"}}> pay by coins or money</Text>
                  </Text>
                </View>
            </View>
          </View>
        </View>


        <View style={styles.sectionContainer}>

          <View style={[{flexDirection: "row"},{justifyContent: 'space-between'}]}>
            <Text style={[styles.sectionTitle, {marginBottom:18}]}> REVIEWS </Text>
            <TouchableOpacity onPress={()=>{ navigation.navigate('AddReviewScreen')}} > 
              <Entypo name="add-to-list" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <SafeAreaView style={{flex: 1}}> 
            <FlatList //VirtualizedLists should never be nested inside plain ScrollViews with the same orientation: error FIXME
              data={reviewData}
              renderItem={({item}) => renderPost(item)}
              keyExtractor={item => item._id}
            />
          </SafeAreaView>

        </View>

      </ScrollView>
    </SafeAreaView>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: -10,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  mediaContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
    paddingHorizontal: 24
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  imageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  recentItemIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  about: {
    fontSize: 15,
    fontWeight: "500",
    // color: black,
    marginTop: 6,
    lineHeight: 20
  },
  sectionTitle: {
    fontWeight: "700",
    // color: ,
    fontSize: 15
  },
  sectionContainer: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    // marginBottom: 8,
    // backgroundColor: 
  },
  reviewContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    // marginBottom: 8,
    // backgroundColor: 
  },
  skillContainer: {
    paddingVertical: 12,
    paddingLeft: 10,
    marginBottom: 4,
    // backgroundColor: 
  },
  skillBar: {
    flexDirection: "row",
    justifyContent: 'space-between', // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
    // marginTop: 0,
    // marginHorizontal: 0
}
  
});