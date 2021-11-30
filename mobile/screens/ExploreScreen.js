import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";// 

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  // Image, 
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator ,//
} from "react-native";
import { Feather } from "@expo/vector-icons";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";// 
import { Image, withBadge } from 'react-native-elements'; //
import { SafeAreaView } from "react-native-safe-area-context";

const ExploreScreen = ({ navigation }) => {

  const [skillData, setSkillData] = React.useState([]);

  async function connectToGetSkillsApi(){
    // console.warn("test",skillData) // test
    let search = "";
    let page = 1;
    let limit = 8;
    await axios.get(`https://cop4331c.herokuapp.com/api/skills?search=${search}&page=${page}&limit=${limit}`, // can not connect? FIXME
          ) 
        .then(function(response) {
            // console.warn("test0",response.data.data) // test
            setSkillData(response.data.data)
        })
        .catch(function(error) {
            console.warn(error)
            // console.warn("test00",response.data.data) // test

        });
  }

  useEffect(async() => { connectToGetSkillsApi() }, []) // renew everything when any compontent renew??
  // console.warn("test1",skillData) // test

  const image = {uri:"https://m.media-amazon.com/images/I/817mtl1sqhL._AC_SL1500_.jpg"};// how to import from asset document??
  // uri:"https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

  const recentImage = {uri:"https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"};
  
  const venice ="Venice the capital  of the northern Italy's Veneto Region in the Adriatic Sea"; //

  // const [gallery, setgallery] = useState([
  //   {
  //     image: {uri:"https://im0-tub-tr.yandex.net/i?id=0372e7559ea4bb9b277926921e8ca1fd&n=13",},
  //     title: "Switzerland",
  //     key: "1",
  //   },
  //   {
  //     image: {uri:"https://portal.andina.pe/EDPfotografia3/Thumbnail/2017/11/09/000462113W.jpg",},
  //     title: "New Zeland",
  //     key: "2",
  //   },
  //   {
  //     image: {uri:"https://im0-tub-tr.yandex.net/i?id=4c667d83715020671fb6bae379bafd1b&n=13",},
  //     title: "Rome",
  //     key: "3",
  //   },
  //   {
  //     image: {uri:"https://blog.educaistanbul.com/wp-content/uploads/2018/03/tahiti-1.jpg",},
  //     title: "Tahiti",
  //     key: "4",
  //   },
  // ]);

  // const gpToPost = () => {
  //   navigation.navigate('Post');
  // }

  // const [counter, setCounter] = useState(1); //

  // const BadgedIcon = withBadge(counter)(Icon) //

  return (
    <SafeAreaView>
      <View style={{flexGrow:1, height: '100%'}}>
        <View>
          <ImageBackground 
            source={image} 
            style={styles.image}
            imageStyle = {{borderBottomRightRadius:65}}
            >
              <View style={styles.darkOverlay}></View> 
              <View style={styles.searchContainer}>
                <Text style={styles.userGreet}>Hi Weiyuan,</Text>
                <Text style={styles.userText}>What would you like to learn today?</Text>
              </View>

              <View>
                <TextInput
                  style={styles.searchBox}
                  placeholder="search skill"
                  placeholderTextColor="#666" 
                ></TextInput>
                <Feather name='search' size={22} color='#666' style={{ position:'absolute', top: hp("3.5%"), right: wp("30%"), opacity: 0.6,}}/> 
              </View> 
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ position: "absolute", top: hp("1.5%"), left: "5%", }}>
                <Feather name="menu" size={hp("4%")} color="#fff" />
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setCounter(counter+1)} style={{ position: "absolute", top: hp("2%"), right: "5%", }}> 
                <Feather  type="ionicon"  name="bell" size={hp("3%")}  color="#fff" /> 
              </TouchableOpacity>  */}
          </ImageBackground>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} // 
        > 
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: hp("3%"), fontWeight: "bold" }}>Top Trending</Text>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false} //
              data={skillData}
              horizontal={true} 
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                // console.warn(item) //test
                return (
                  <View style={{paddingVertical: hp("1%"), paddingHorizontal: wp("0.5%"), }}> 
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SkillDetailScreen", { item, skillData } )} // onPress={goToPost} 
                      style={{ shadowColor:"#000", shadowOffset: {width:0, height:20}, shadowOpacity:0.34, shadowRadius:6.27, levation:10}} //
                      > 
                          <Image
                            source={{uri:item.imageURL}} // item.image //
                            style={{width:responsiveScreenWidth(40), marginRight:wp("2%"), height:responsiveScreenHeight(30), borderRadius:10}}
                            // image={{uri:item.imageURL}} // item.image
                            PlaceholderContent={<ActivityIndicator size="small" color="#0000ff" />} //
                          />
                          <View style={styles.imageOverlay}></View>
                          <Feather name='map-pin' size={hp("2.5%")} color='white' style={styles.imageLocationIcon}/>
                          <Text style={styles.imageText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View> 

          <View style={{ marginBottom: hp("5%"), }}> 
            <View style={{ padding: hp("2%"), flexDirection: "row", justifyContent: "space-between", }}>
              <Text style={{ fontSize: hp("3%"), fontWeight: "bold" }}>Recently Viewed</Text> 
                <Text style={{ fontSize: hp("2.5%"), fontWeight: "bold", color: "#ff6200", }}>View All</Text>
            </View>
        
          <Image
            source={recentImage}
            style={{ width: "95%", height: hp("30%"), borderRadius: 10, alignSelf: 'center'}} //, marginLeft: wp('2%')
          /> 

            <View style={{ position: "absolute", bottom: 0, padding: hp("1%") }}>
              <View style={{ flexDirection: "row" }}>  
                <Feather name="map-pin" size={22} color="white" style={{ marginLeft: 10, position: "relative", top: 4 }}/>
                <Text style={{fontSize: 22, color: "white", fontWeight: "normal", marginBottom: "2%", marginHorizontal: 10}}>Venice</Text>
              </View>
              <Text
                style={{fontSize: 14, color: "white", fontWeight: "normal", marginBottom: 6, opacity: 0.9, marginLeft: 16}}> 
                {venice}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ExploreScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: wp("100%"),
    height: responsiveScreenHeight(25),
    // height: 270,
  },
  darkOverlay:{
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: responsiveScreenHeight(25),
    backgroundColor: '#000',
    opacity: 0.2,
    borderBottomRightRadius:65
  },
  searchContainer: {
    paddingTop: hp("7%"), //100
    paddingLeft: wp("5%"), // 16
  },
  userGreet: {
    fontSize: responsiveScreenFontSize(3), // 38
    fontWeight: "bold",
    color: "white",
  },
  userText: {
    fontSize: responsiveScreenFontSize(2.2), // 16
    fontWeight: "normal",
    color: "white",
  },
  searchBox: {
    marginTop: hp("2%"), // 16
    backgroundColor: "#fff",
    paddingLeft: hp("2%"), // 24
    padding: hp("1%"), // 12
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: wp("75%"), // '90%'
    height: hp('6%')
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: hp("0.5%"), // 4
    left: hp("1%"), // 10
    bottom: hp("1%"), // 10
  },
  imageText: {
    position: "absolute",
    color: "white",
    marginTop: hp("0.5%"), // 4
    fontSize: hp("2.5%"), // 14
    left: "20%", // 30
    bottom: "2%", // 10
  },
  imageOverlay:{
    width: 150,
    height: 250,
    marginRight: 8,
    borderRadius:10,
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5
  },

});

