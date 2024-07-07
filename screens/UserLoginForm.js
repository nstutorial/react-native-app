import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import InputBox from "../components/FormsComponents/InputBox";
import FormButton from "../components/FormsComponents/Button";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/logo.png");

const UserLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    // Replace with your actual login validation logic
    if (username && password) {
      console.log({ username, password });
      navigation.navigate("Tabs");
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>Login</Text>
        <InputBox
          placeholder="UserName Or Email"
          inputmode="email"
          value={username}
          onChangeText={(newEntry) => setUsername(newEntry)}
        />
        <InputBox
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(newEntry) => setPassword(newEntry)}
        />
        <FormButton onPress={handleLogin} text="LOGIN" />
        <Text style={styles.footerText}>
          Don't Have an Account?
          <Text
            style={styles.signup}
            onPress={() => {
              navigation.navigate("RegistrationForm");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default UserLoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  image: {
    height: 100,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 20,
    color: "red",
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
  signup: {
    color: "red",
    fontSize: 13,
    fontWeight: "bold",
  },
});
