import React,{ useEffect }  from 'react';
import { View, Text, Button, StyleSheet, Image, FlatList, TouchableOpacity , StatusBar,  SafeAreaView} from 'react-native';

import moment from "moment";
import { Entypo, Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import axios from 'axios';


// DATA = [
//   {
//       _id: "619295150075e9a46db8ddf3",
//       userId: "6189698db9e8c8287e27ab7a",
//       reviewerId: "618c175054276ea05b6cd722",
//       reviewerName: "Victor",
//       rating: 5,
//       content:
//           "ww--Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       __v: 0,
//   },
//   {
//       _id: "619b69f9e0478231a2ff5981",
//       userId: "6189698db9e8c8287e27ab7a",
//       reviewerId: "61887889e62859a35bc0de9c",
//       reviewerName: "John",
//       rating: 4,
//       content:
//           "ww--Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       __v: 0,
//   },
// ];


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const HomeScreen = ({navigation}) => {

  const [reviewData, setReviewData] = React.useState([]);

  // {
    // _id: " ",
    // userId: " ",
    // reviewerId: " ",
    // reviewerName: " ",
    // rating: 0,
    // content:" ",
    // __v: 0,
  // }

  useEffect(async() => {
    let userId = '6189698db9e8c8287e27ab7a';
    // try {
    //     userId = await SecureStore.getItemAsync('userId'); // need to add 'await' 
    // } catch (e) {
    //     console.warn(e);
    // }
    connectToGetReviewApi(userId)
  }, [])

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


  const renderItem = ({ item }) => (
    <Item title={item.reviewerName} />
  );

  const renderPost = post => { // const???
      return (
          <View style={styles.feedItem}>
              <View style={styles.sectionContainer}>
                <Text style={[styles.text, {fontWeight: "500"}]}>@{post.reviewerName}: 
                <Text style={{fontWeight:"400"}}> {post.content}</Text>
                </Text>
              <View flexDirection="row" justifyContent='flex-end'>
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
      <FlatList
        data={reviewData}
        renderItem={({item}) => renderPost(item)}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
}


//   render() {
//       return (
//           <View style={styles.container}>
//               <View style={styles.header}>
//                   <Text style={styles.headerTitle}>Feed</Text>
//               </View>
//               <FlatList
//                   style={styles.feed}
//                   data={posts}
//                   renderItem={({ item }) => this.renderPost(item)}
//                   keyExtractor={item => item._id}
//                   showsVerticalScrollIndicator={false}
//               ></FlatList>
//           </View>
//       );
//   }
// }






const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
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
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
},
});

export default HomeScreen;





