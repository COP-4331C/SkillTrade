import React from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Text, TextInput } from "react-native-paper";
import Constants from "expo-constants";

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        <View style={[styles.textWrapper]}>
          <Text style={[styles.heading, styles.textCenter]}>SkillTrade</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.formInput}
            autoFocus={true}
            placeholder="Email"
            placeholderTextColor="#909090"
          />

          <TextInput
            style={styles.formInput}
            keyboardType="numeric"
            secureTextEntry={true}
            autoFocus={true}
            placeholder="Password"
            placeholderTextColor="#909090"
          />

          <Button mode="contained">
            <Text style={styles.buttonLoginText}>Login</Text>
          </Button>
        </View>

        <View style={styles.action}>
          <TouchableOpacity>
            <Text style={styles.userText}>Left</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.userText}>Right</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    paddingHorizontal: 30,
  },
  textWrapper: {
    marginTop: 60,
    marginBottom: 30,
  },
  heading: {
    fontSize: 36,
    lineHeight: 50,
    fontWeight: "bold",
  },
  textWhite: {
    color: "#fff",
  },
  textCenter: {
    textAlign: "center",
  },
  form: {
    marginBottom: 30,
  },
  formInput: {
    height: 60,
    paddingHorizontal: 30,
    fontSize: 20,
    marginBottom: 10,
    color: "#000",
    backgroundColor: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonLoginText: {
    color: "#fff",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
