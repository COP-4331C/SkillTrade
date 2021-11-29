import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {Feather} from '@expo/vector-icons';
import moment from "moment";

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from "react-native-responsive-dimensions";//

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";//

  const SkillDetailScreen = ({ navigation, route }) => {

  const data = route.params.item; // one skill info.
  const gallery = route.params.skillData; // all skills info; array

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "white", flex:1, marginTop:hp('2.5%')}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }} 
      >
        <ImageBackground source={{uri:data.imageURL}} style={styles.image} imageStyle={{borderBottomLeftRadius:30, borderBottomRightRadius:30}}>
          <Text style={styles.TagLine}>Learn {data.title}</Text>
          <Text style={styles.Placename}>
            {data.summary}
          </Text>
          <TouchableOpacity 
            onPress={goBack}
            style={{ position: "absolute", left: "5%", top: "5%", backgroundColor: "#ff6200", borderRadius: 40, padding: 10 }}
          >
            <Feather name='arrow-left' size={24} color='#fff' />
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ position: "absolute", right: "5%", top: "5%", backgroundColor: "#ff6200", borderRadius: 40, padding: 10 }}
          >
            <Feather name="bookmark" size={24} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>

        <TouchableOpacity style={styles.bookTicketBtn}>
          <Text style={styles.bookTicketText}>Chat Now</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>About the skill</Text>
        <Text style={styles.detailText}>
          {data.description}
        </Text>
        <Text style={{padding:14, fontWeight:'600', }}>Posted {moment(data.updatedAt).fromNow()}</Text>
        <Text style={styles.subSectionTitle}>Status: <Text style={{fontWeight:'400'}}>{data.status}</Text></Text>
        <Text style={styles.subSectionTitle}>Poster: <Text style={{fontWeight:'400'}}>{data.userFullName}</Text></Text>
        <Text style={styles.subSectionTitle}>Price: <Text style={{fontWeight:'400'}}>$ {data.price}</Text></Text>
        <Text style={styles.subSectionTitle}>Location: <Text style={{fontWeight:'400'}}>{data.city}, {data.state}</Text></Text>


        <View style={{ marginVertical: 10 }}>
          <Text style={styles.sectionTitle}>
            Suggested Skills
          </Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={gallery}
            keyExtractor={(item) => item._id}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingBottom: 20 }}>
                  <View>
                    <Image
                      source={{uri:item.imageURL}}
                      style={{ width: wp("40%"), height: hp("20%"), marginHorizontal: 10, borderRadius: 10 }}
                    />
                    <Text style={{ marginHorizontal:14, marginTop:4, position:"absolute", left:"5%", bottom:"20%", color:"white", fontSize: responsiveScreenFontSize(2) }}>
                      {item.title}
                    </Text>
                    <Feather name="map-pin" size={16} color="white" style={styles.imageLocationIcon}/>
                    <Text style={{ marginHorizontal:14, marginTop:4, position:"absolute", left:"20%", bottom:"2%", color:"white", fontSize: responsiveScreenFontSize(2) }}>
                      {item.city}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SkillDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: responsiveScreenHeight(40), //380
    justifyContent: "flex-end",
  },
  TagLine: {
    color: "white",
    fontSize: responsiveScreenFontSize(2), //16
    fontWeight: "bold",
    paddingHorizontal: 14,
    marginLeft: 6, //20
  },
  Placename: {
    color: "white",
    fontSize: responsiveScreenFontSize(2.5),
    paddingHorizontal: 14,
    marginBottom: 30, // 10
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 6, //20
  },
  bookTicketBtn: {
    position: "absolute",
    right: 10, //12
    top: hp("37%"), // 350
    backgroundColor: "#ff6200",
    padding: 10, //16
    borderRadius: 40,
    elevation: 5
  },
  bookTicketText:{
    color: 'white',
    fontSize: 14
  },
  detailText: {
    paddingHorizontal: 14,
    fontSize: responsiveScreenFontSize(1.7),
    fontWeight: "normal",
    opacity: 0.6, //0.3
    justifyContent: 'flex-start',
    textAlign: 'justify',
    lineHeight: 25,
  },
  imageLocationIcon: {
    marginHorizontal: 14,
    marginTop: 4,
    position: "absolute",
    left: "5%",
    bottom: "2%",
  },
  sectionTitle:{ 
    padding: 14, 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  subSectionTitle:{
    padding: 14, 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  subSectionText:{
    padding: 14, 
    fontSize: 16, 
    // fontWeight: "bold" 
  },
});
