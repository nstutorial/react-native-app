import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import InputBox from "../components/FormsComponents/InputBox";
import FormButton from "../components/FormsComponents/Button";
import { useNavigation } from "@react-navigation/native";


import { database } from "../firebaseConfig";
import { ref, set } from "firebase/database";
const logo = require("../assets/logo.png");

const data = [
  { label: "Admin", value: "admin" },
  { label: "BM/ABM", value: "bm" },
  { label: "Field Officer", value: "fo" },
  { label: "customer", value: "customer" },
 
];

const UserRegisterForm = () => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  //dropdown
  const [value, setValue] = useState(null);
  

  const handleRegistration = async () => {
    if (!name || !phone || !username || !password) {
      Alert.alert("Error", "All fields are required.");
      console.log("Error : All fields are required");
      return;
    }
    try {
      //console.log({ name, phone, username, password });
      await set(ref(database, "users/" + phone), {
        name: name,
        phone: phone,
        username: username,
        password: password,
      });
      console.log("New User Created Successfully");
      Alert.alert("Success", "User registration done");
      setName("");
      setPhone("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user: ", error);
      Alert.alert("Error", "There was an error during registration.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Registration</Text>
      <InputBox
        placeholder="Full name"
        inputmode="name"
        value={name}
        onChangeText={(newEntry) => setName(newEntry)}
      />
      <InputBox
        placeholder="Mobile No"
        inputmode="numeric"
        value={phone}
        onChangeText={(newEntry) => setPhone(newEntry)}
      />
      <Dropdown
        style={styles.dropdownView}
        data={data}
        search
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        searchPlaceholder="Search..."
      />
      <InputBox
        placeholder="UserName Or Email"
        inputmode="email"
        value={username}
        onChangeText={(newEntry) => setUsername(newEntry)}
      />
      <InputBox
        placeholder="Password"
        secureTextEntry
        onChangeText={(newEntry) => setPassword(newEntry)}
      />
      <FormButton onPress={handleRegistration} text="REGISTER" />
      <Text style={styles.footerText}>
        Already Have Account?
        <Text
          style={styles.signup}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          {" "}
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default UserRegisterForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
  },
  image: {
    height: 100, //160
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
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
  dropdownView : {
    height : 50,
    width:'90%',
    paddingHorizontal : 20,
    marginLeft:80,
    marginRight:80,
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7,
    marginBottom:5
  },
});
