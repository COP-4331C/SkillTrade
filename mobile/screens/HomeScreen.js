import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import moment from "moment";
import { Entypo, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const Item = ({ title }) => (
  <View>
    <Text>{title}</Text>
  </View>
);

const HomeScreen = ({ navigation }) => {
  const [skillData, setSkillData] = React.useState([]);

  async function connectToGetSkillsApi() {
    axios
      .get(`https://cop4331c.herokuapp.com/api/skills?search=%20&page=1`, {})
      .then(function (response) {
        // console.warn("get")
        setSkillData(response.data.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  }

  useEffect(async () => {
    connectToGetSkillsApi();
  }, []);

  const renderItem = ({ item }) => <Item title={item.reviewerName} />;

  const renderPost = (post) => {
    // Image source=...; post.avatar  get user's picture; post.image  get skill picture;  FIXME
    return (
      <View style={styles.feedItem}>
        <Image source={{ uri: post.userProfilePic }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.userFullName}</Text>
              <Text style={styles.timestamp}>
                {moment(post.createdAt).fromNow()}
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Entypo name="star" size={18} color="black" />
              <Entypo name="star" size={18} color="black" />
              <Entypo name="star" size={18} color="black" />
              <Entypo name="star" size={18} color="black" />
              <Entypo name="star" size={18} color="black" />
              <Text> (25)</Text>
            </View>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <Text style={styles.postText}>{post.summary}</Text>
          <Text style={styles.postText}>{post.description}</Text>
          <Image
            source={{ uri: post.imageURL }}
            style={styles.postImage}
            resizeMode="cover"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <FontAwesome5
              name="comment-dollar"
              size={24}
              color="black"
              style={{ marginRight: 16 }}
            >
              <Text> {post.price} </Text>
            </FontAwesome5>
            <FontAwesome name="wechat" size={24} color="black" />
            <FontAwesome name="circle" size={18} color="black">
              <Text> {post.status} </Text>
            </FontAwesome>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recently posted skill</Text>
      </View>

      <FlatList
        style={styles.feed}
        data={skillData}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingTop: 18,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "800",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  titleText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
  postText: {
    marginTop: 5,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },
});
