import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as SecureStore from "expo-secure-store";

export default function Conversation({ conversation, currentUser }) {
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const otherUserId = conversation.members.find((m) => m !== currentUser);
    const getUser = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        const res = await axios(
          `https://cop4331c.herokuapp.com/api/user/profile/${otherUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOtherUser({
          ...res.data,
          userId: otherUserId,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <View
      style={{
        alignItems: "center",
        padding: 10,
        marginTop: 20,
        // backgroundColor: "#f1f1f1",
      }}
    >
      {otherUser?.profilePic && (
        <Image
          style={{
            width: 55,
            height: 55,
            borderRadius: 50,
          }}
          source={{ uri: otherUser.profilePic }}
        />
      )}
    </View>
  );
}
