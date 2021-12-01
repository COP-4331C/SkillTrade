import React, { Component } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Message({ message, self }) {
  return (
    <View style={self ? [styles.message, styles.messageSelf] : styles.message}>
      <View style={styles.messageHeader}>
        <Text
          style={
            self
              ? [styles.messageText, styles.messageSelfText]
              : styles.messageText
          }
        >
          {message.text}
        </Text>
      </View>
      {/* <div className="messageBottom">{message.createdAt}</div> */}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "flex-start",
  },

  messageHeader: {},

  messageText: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e7e6eb",
    color: "#000",
    maxWidth: 300,
  },

  messageFooter: {
    fontSize: 12,
    marginTop: 10,
  },

  messageSelf: {
    alignItems: "flex-end",
  },

  messageSelfText: {
    backgroundColor: "#1877f2",
    color: "#fff",
  },
});
