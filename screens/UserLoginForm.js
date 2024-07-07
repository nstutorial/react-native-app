import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, database } from "../firebaseConfig";
import InputBox from "../components/FormsComponents/InputBox";
import FormButton from "../components/FormsComponents/Button";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/logo.png");

const UserLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // Function to fetch user role from the database
  const fetchUserRole = async (uid) => {
    const userRef = ref(database, "users/" + uid);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val().role;
    } else {
      return null;
    }
  };

  const handleLogin = async () => {
    if (username && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          username,
          password
        );
        const user = userCredential.user;

        // Fetch user role
        const role = await fetchUserRole(user.uid);

        // Store user role in AsyncStorage
        await AsyncStorage.setItem("userRole", role);

        console.log("User signed in successfully");
        navigation.navigate("Tabs");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  return (
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
