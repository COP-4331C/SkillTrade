import React, { useContext, useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { io } from "socket.io-client";
import { LinearGradient } from "expo-linear-gradient";

const ChatScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [loggedUserAvatar, setLoggedUserAvatar] = useState("");
  const [userId, setUserId] = useState(null);

  const socket = useRef();
  const scrollRef = useRef();

  let token = null;

  useEffect(() => {
    socket.current = io("https://cop4331c.herokuapp.com/");
    socket.current.on("getMessage", (data) => {
      console.log("Get message!");
      console.log(data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [isLoading]);

  useEffect(() => {
    async function fetchUserId() {
      token = await SecureStore.getItemAsync("userToken");
      let res = await axios.get("https://cop4331c.herokuapp.com/api/user/id", {
        headers: { Authorization: `Bearer ${token}` },
      });

      let profileRes = await axios.get(
        "https://cop4331c.herokuapp.com/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoggedUserAvatar(profileRes.data["profilePic"]);
      setUserId(res.data.userId);
      setIsLoading(false);
    }
    fetchUserId();
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "https://cop4331c.herokuapp.com/api/conversations/" + userId
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "https://cop4331c.herokuapp.com/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
    });

    try {
      console.log(message);
      const res = await axios.post(
        "https://cop4331c.herokuapp.com/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={[styles.container, { flexDirection: "row" }]}>
        <View style={{ width: "20%" }}>
          <View
            style={[
              styles.container,
              {
                flexDirection: "column",
                paddingTop: 40,
                // backgroundColor: "#232323",
              },
            ]}
          >
            <LinearGradient
              // Button Linear Gradient
              colors={["#e8e8e8", "#e0e0e0", "#dfdfdf"]}
            >
              <ScrollView
                style={{
                  // backgroundColor: "#eee12a",
                  width: "100%",
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {conversations.map((c) => (
                  <TouchableOpacity
                    key={c._id}
                    onPress={() => setCurrentChat(c)}
                  >
                    <Conversation conversation={c} currentUser={userId} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </LinearGradient>
          </View>
        </View>
        <View style={{ width: "80%" }}>
          <View
            style={[
              styles.container,
              {
                flexDirection: "column",
                paddingTop: 40,
                // backgroundColor: "#d367ff",
              },
            ]}
          >
            <ScrollView
              ref={scrollRef}
              style={{
                // backgroundColor: "#a367ff",
                width: "100%",
              }}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {messages.map((m) => (
                <Message key={m._id} message={m} self={m.senderId === userId} />
              ))}
            </ScrollView>
            <View
              style={[
                styles.container,
                {
                  flex: 0,
                  flexDirection: "row",
                  // backgroundColor: "#1cf1af",
                  alignItems: "center",
                },
              ]}
            >
              <TextInput
                placeholder="Chat here..."
                onChangeText={(val) => setNewMessage(val)}
                value={newMessage}
                style={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: 50,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  fontSize: 16,
                  width: "80%",
                }}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  marginHorizontal: 5,
                  backgroundColor: "#1195ff",
                  borderRadius: 50,
                  padding: 8,
                }}
              >
                <Icon name="paper-plane" color="#fff" size={26} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
