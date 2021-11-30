import React, { Component, useEffect } from 'react';
import { 
  View, 
  Text, 
  Button, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  ScrollView, 
  Linking, 
  TouchableOpacity, 
  FlatList, 
  SectionList,
  StatusBar, 
  Alert 
} from 'react-native';
import { Entypo, Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Directions, TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import EditSkillScreen from './EditSkillScreen';
import moment from "moment";
import { render } from 'react-dom';
import StarRating from 'react-native-star-rating';
// import { DirectConnect } from 'aws-sdk';

const Item = ({ title }) => ( // style={styles.item} // style={styles.title} ?
  <View > 
    <Text >{title}</Text> 
  </View>
);

const ProfileScreen = ({navigation}) => {


  const [isEdit, setIsEdit] = React.useState(false);

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
  const [skillData, setSkillData] = React.useState([]);
  const [learnSkillData, setLearnSkillData] = React.useState([]);

  const sections = [
    {
      _id: '0',
      title: 'MY SKILLS',
      data: skillData,
      renderItem: ({ item }) => 
        renderSkills(item),
        // {return <Text style={styles.row}>{item.title}</Text>}
    },
    {
      _id: '1',
      title: 'WANT TO LEARN',
      data: learnSkillData,
      renderItem: ({ item }) => 
        renderLearnSkills(item),
      // <Text style={styles.rowDark}>{item.text}</Text>,
    },
    {
      _id: '2',
      title: 'REVIEWS',
      data: reviewData,
      renderItem: ({ item }) => //<Text style={styles.rowDark}>{item.content}</Text>,
        renderReviews(item),
    },
  ]

  useEffect(async() => {
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
    } catch (e) {
        console.warn(e);
    }
    connectToProfileApi(userToken)
    const unsubscribe = navigation.addListener('focus', () => {
      connectToProfileApi(userToken)
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(async() => {
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
    } catch (e) {
        console.warn(e);
    }
    connectToUserSkillsApi(userToken)
    connectToLearnSkillsApi(userToken)
    const unsubscribe = navigation.addListener('focus', () => {
      connectToUserSkillsApi(userToken)
      connectToLearnSkillsApi(userToken)
    });
    return unsubscribe;
  }, [navigation]);
  
  useEffect(async() => {
    let userId = null; 
    try {
        userId = await SecureStore.getItemAsync('hostId'); // should store a hostId variable in SecureStore, then get it back here. 
        // because the userId here is not alwasy match to the login user. when login user browse other user's profile it will not match.
    } catch (e) {
        console.warn(e);
    }
    connectToGetReviewApi(userId)
    const unsubscribe = navigation.addListener('focus', () => {
      connectToGetReviewApi(userId)
    });
    return unsubscribe;
  }, [navigation]);

  function connectToProfileApi(userToken){
    axios.get('https://cop4331c.herokuapp.com/api/user/profile',  {
            headers: {
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
            setProfileData(response.data)
        })
        .catch(function(error) {
            console.warn(error)
        });
  }

  async function connectToUserSkillsApi(userToken){
    let hostId = null;
    let status = 'Teaching';
    try {
      hostId = await SecureStore.getItemAsync('hostId'); 
    } catch (e) {
        console.warn(e);
    };
    axios.get(`https://cop4331c.herokuapp.com/api/skills/user/?status=${status}&userId=${hostId}`,  { 
            headers: { 
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
          setSkillData(response.data)
        })
        .catch(function(error) {
            console.warn(error)
        });
  }

  async function connectToLearnSkillsApi(userToken){
    let hostId = null;
    let status = 'Learning';
    try {
      hostId = await SecureStore.getItemAsync('hostId'); 
    } catch (e) {
        console.warn(e);
    };
    axios.get(`https://cop4331c.herokuapp.com/api/skills/user/?status=${status}&userId=${hostId}`,  { 
            headers: { 
              Authorization: `Bearer ${userToken}`  
            }
          })
        .then(function(response) {
          setLearnSkillData(response.data)
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
        })
        .catch(function(error) {
            console.warn(error)
        });
  }

  function confirmDeleteSkill (skillId){
    Alert.alert(
      "Alert", // "Alert Title"
      "Do you want to delete this skill?", // "My Alert Msg"
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Delete"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>  deleteSkillHandler(skillId),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }

  const deleteSkillHandler = async(skillId) => { 
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
    } catch (e) {
        console.warn(e);
    }
    axios.delete(`https://cop4331c.herokuapp.com/api/skills/${skillId}`,  
    {
        headers: {
          'Authorization': `Bearer ${userToken}`  
        }
      })
    .then(function(response) {
        let index = skillData.map((r)=> {return r._id}).indexOf(skillId) // get index of the delete item; map is creaeting an array of _id
        skillData.splice(index,1) // cut out the item (base on the previous index) from skillData array, 1 means delete one item
        setSkillData([...skillData]) // skillData is state variable, so we need to update it with setSkillData()
        Alert.alert("Skill Deleted!")
    })
    .catch(function(error) {
        // console.warn(error)
        Alert.alert("Fail to deleted!")
    });
  };

  function confirmDeleteReview (reviewId){
    Alert.alert(
      "Alert", // "Alert Title"
      "Do you want to delete this review?", // "My Alert Msg"
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel Delete"),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () =>  deleteReviewHandler(reviewId),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }

  async function deleteReviewHandler (reviewId) { 
     
    let userToken = null;
    try {
        userToken = await SecureStore.getItemAsync('userToken'); 
    } catch (e) {
        console.warn(e);
    };

    axios.delete(`https://cop4331c.herokuapp.com/api/review/delete-review/${reviewId}`, 
     {
        headers: {
          'Authorization': `Bearer ${userToken}`  
        } 
      })
    .then(function(response) {
        let index = reviewData.map((r)=> {return r._id}).indexOf(reviewId)
        reviewData.splice(index,1) 
        setReviewData([...reviewData])
        Alert.alert("Review Deleted")
    })
    .catch(function(error) {
        // console.warn(error)
        Alert.alert("You can only delete the review you created.")
    });
  }

  // const renderItem = ({ item }) => (
  //   <Item title={item.reviewerName} />
  // );

  const renderSkills = post => { 
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.skillContainer}>
          <View style={styles.skillBar}>
            <Text style={[styles.about, {fontWeight:"700"}]}>{post.title}</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('EditSkillScreen', {paramKey: post,})}} > 
              <AntDesign name="edit" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ confirmDeleteSkill(post._id) }} > 
              <AntDesign name="delete" size={18} color="black" />
            </TouchableOpacity>

          </View> 
          <Text style={[styles.about, {fontWeight:"600"}]}>Summary: </Text>
          <Text style={[styles.about, {fontWeight:"400"}, {paddingLeft:12}]}>{post.summary}</Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>description: </Text>
          <Text style={[styles.about, {fontWeight:"400"}, {paddingLeft:12}]}>{post.description}</Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>Price: <Text style={{fontWeight:"400"}}>{post.price}</Text></Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>Location: <Text style={{fontWeight:"400"}}>{post.city}</Text></Text>
          <View style={{marginTop:10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image source={{uri:post.imageURL}} style={styles.image} resizeMode="cover"></Image>
              </View>
            </ScrollView> 
          </View>
        </View>
      </View>
    );
  };

  const renderLearnSkills = post => { 
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.skillContainer}>
          <View style={styles.skillBar}>
            <Text style={[styles.about, {fontWeight:"700"}]}>{post.title}</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('EditSkillScreen', {paramKey: post,})}} > 
              <AntDesign name="edit" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ confirmDeleteSkill(post._id) }} > 
              <AntDesign name="delete" size={18} color="black" />
            </TouchableOpacity>

          </View> 
          <Text style={[styles.about, {fontWeight:"600"}]}>Summary: </Text>
          <Text style={[styles.about, {fontWeight:"400"}, {paddingLeft:12}]}>{post.summary}</Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>Description: </Text>
          <Text style={[styles.about, {fontWeight:"400"}, {paddingLeft:12}]}>{post.description}</Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>Would Like to Pay: <Text style={{fontWeight:"400"}}>{post.price}</Text></Text>
          <Text style={[styles.about, {fontWeight:"600"}]}>Location: <Text style={{fontWeight:"400"}}>{post.city}</Text></Text>
          <View style={{marginTop:10}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.imageContainer}>
                <Image source={{uri:post.imageURL}} style={styles.image} resizeMode="cover"></Image>
              </View>
            </ScrollView> 
          </View>
        </View>
      </View>
    );
  };


  // const renderLearnSkills = post => { 
  //   return (
  //     <View style={styles.sectionContainer}>
  //       <View style={{alignItems:"center"}}>
  //         <View style={styles.recentItem}>
  //             <View style={styles.recentItemIndicator}></View>
  //             <View style={{width:270}}>
  //               <Text style={[styles.text, {color:"#41444B", fontWeight:"700"}]}>{post.title} -  </Text>
  //               {/* <Text style={[styles.text, {fontWeight: "400"}]}>entry level / </Text> */}
  //               <Text style={[styles.text, {fontWeight: "600"}]}>Summary: </Text>
  //               <Text style={[styles.text, {fontWeight: "400"}, {paddingLeft:15}]}>{post.summary}</Text>
  //               <Text style={[styles.text, {fontWeight: "600"}]}>Description: </Text>
  //               <Text style={[styles.text, {fontWeight: "400"}, {paddingLeft:15}]}>{post.description}</Text>
  //               <Text style={[styles.text, {fontWeight: "500"}]}>Would like to pay {post.price} dollars</Text>
  //               <Text style={[styles.text, {fontWeight: "500"}]}>Location: {post.city}</Text>
  //             </View>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };

  const renderReviews = post => { 
    return (
        <View>
            <View style={styles.reviewContainer}>
              <View flexDirection="row" style={{paddingRight:40}}>
                <Image source={{uri:post.authorProfilePic}} style={styles.avatar} /> 
                <Text style={[styles.text, {fontWeight: "500"}]}>@{post.authorFullName}: 
                <Text style={{fontWeight:"400"}}> {post.content}</Text>
                </Text>
              </View>
              <View style={{paddingTop: 8}} flexDirection="row" justifyContent='space-around'>
                <Text style={styles.timestamp}>{moment(post.createdAt).fromNow()}</Text>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={post.rating}
                fullStarColor={'gold'}
                starSize={15}
                />
                <TouchableOpacity onPress={()=>{ navigation.navigate('EditReviewScreen', {paramKey: post,})}} >  
                  <AntDesign name="edit" size={18} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{ confirmDeleteReview(post._id) }} >                 
                  <AntDesign name="delete" size={18} color="black" />
                </TouchableOpacity>
              </View>
            </View>
        </View>
    );
  };

  const renderHeader = () => { 
    return (
      <SafeAreaView style={styles.container}>

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
          <View style={styles.active}></View>
          <View style={styles.dm}>
            <MaterialCommunityIcons name="heart-plus" size={38} color="black" />
          </View> 
          
          <View style={styles.add}>
            <AntDesign name="message1" size={38} color="black" style={{marginTop: 6, marginLeft: 2}}/>
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
        
      </SafeAreaView>
    );

  }
  
  const addButtonHandler = (title) => {
    if ( title == "MY SKILLS"){
      navigation.navigate('AddSkillScreen')
    } else if ( title == "WANT TO LEARN" ){
      navigation.navigate('AddSkillScreen')
    } else if ( title == "REVIEWS" ){
      navigation.navigate('AddReviewScreen')
    }

  }

  return (
    <SafeAreaView style={{flex: 1}}> 
      <SectionList
        // style={styles.container}
        sections={sections}
        renderSectionHeader={({ section }) => {
          return (
            <View style={styles.sectionContainer}>
              <View style={[{flexDirection: "row"},{justifyContent: 'space-between'}]}>
                <Text style={styles.sectionTitle}> {section.title} </Text>
                <TouchableOpacity onPress={()=>{ setIsEdit(!isEdit) }} > 
                  <Entypo name="email" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style = {{display:isEdit ? "flex" : 'none'}}
                  onPress={()=>{ addButtonHandler(section.title) }} > 
                  <Entypo name="add-to-list" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          renderHeader()
        }
      />
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
      backgroundColor: "white", // "#41444B"
      position: "absolute",

      bottom: 8,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      top: 20,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "white", // "#41444B"
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
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: "#FFF",
    // marginBottom: 8,
    // backgroundColor: 
  },
  reviewContainer: {
    paddingVertical: 8,
    paddingHorizontal: 40,
    backgroundColor: "#FFF"
    // marginBottom: 8,
    // backgroundColor: 
  },
  skillContainer: {
    // paddingVertical: 12,
    paddingLeft: 10,
    // marginBottom: 4,
    // backgroundColor: "#FFF",
    // backgroundColor: 
  },
  skillBar: {
    flexDirection: "row",
    justifyContent: 'space-between', // 'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
    // marginTop: 0,
    // marginHorizontal: 0
},
avatar: {
  width: 36,
  height: 36,
  borderRadius: 18,
  marginRight: 16
},
timestamp: {
  fontSize: 11,
  color: "#C4C6CE",
  marginTop: 4
},



row: {
  padding: 15,
  marginBottom: 5,
  backgroundColor: 'skyblue',
},
rowDark: {
  padding: 15,
  marginBottom: 5,
  backgroundColor: 'steelblue',
},
header: {
  padding: 15,
  marginBottom: 5,
  backgroundColor: 'darkblue',
  color: 'white',
  fontWeight: 'bold',
},
  
});