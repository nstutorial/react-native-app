import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import InputBox from "../components/FormsComponents/InputBox";
import FormButton from "../components/FormsComponents/Button";
import { useNavigation } from "@react-navigation/native";
import { database, auth } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";

const logo = require("../assets/logo.png");

const data = [
  { label: "Admin", value: "admin" },
  { label: "BM/ABM", value: "bm" },
  { label: "Field Officer", value: "fo" },
  { label: "Customer", value: "customer" },
];

const UserRegisterForm = () => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(null);
  const navigation = useNavigation();

  const handleRegistration = async () => {
    if (!name || !phone || !username || !password || !role) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;

      await set(ref(database, "users/" + user.uid), {
        name: name,
        phone: phone,
        role: role,
        username: username,
      });

      Alert.alert("Success", "User registration successful");
      setName("");
      setPhone("");
      setUsername("");
      setPassword("");
      setRole(null);
    } catch (error) {
      console.error("Error creating user: ", error);
      Alert.alert("Error", "There was an error during registration.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
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
          value={role}
          onChange={(item) => setRole(item.value)}
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
          value={password}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserRegisterForm;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 20,
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
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
  dropdownView: {
    height: 50,
    width: "90%",
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 5,
  },
});
