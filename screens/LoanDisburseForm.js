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

import { database } from "../firebaseConfig";
import { ref, set } from "firebase/database";
const logo = require("../assets/logo.png");

const data = [
  { label: "Kumargram", value: "Kumargram" },
  { label: "Boxirhat", value: "Boxirhat" },
  { label: "Tufanganj", value: "Tufanganj" },
  { label: "Nigamnagar", value: "Nigamnagar" },
];

const data1 = [
  { label: "Anadaranfulbari-A", value: "Kumargram" },
  { label: "Boxirhat", value: "Boxirhat" },
  { label: "Tufanganj", value: "Tufanganj" },
  { label: "Nigamnagar", value: "Nigamnagar" },
];

const LoanDisburseForm = () => {
  const [click, setClick] = useState(false);
  const [branch, setBranch] = useState("");
  const [center, setCenter] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [totaldisburseamount, setTotaldisburseamount] = useState("");
  const [processingFee, setProccessingFee] = useState("");
  const [advance, setAdvance] = useState("");
  const [lamount, setLamount] = useState("");
  const [emino, setEmino] = useState("");
  const [actualemi, setActualemi] = useState("");
  const [emistartdate, setEmistartdate] = useState("");
  const [centerday, setCenterday] = useState("");

  const navigation = useNavigation();

  const handleRegistration = async () => {
    if (
      !branch ||
      !center ||
      !name ||
      !product ||
      !totaldisburseamount ||
      !processingFee ||
      !advance ||
      !lamount ||
      !emino ||
      !actualemi ||
      !emistartdate ||
      !centerday
    ) {
      Alert.alert("Error", "All fields are required.");
      console.log("Error : All fields are required");
      return;
    }

    try {
      await set(ref(database, "disbursement_data/" + phone), {
        Branch_Name: branch,
        Center_Name: center,
        Member_Name: name,
        Phone_No: phone,
        Product_Name: product,
        Total_Disbursement_Amount: totaldisburseamount,
        Processing_Fee: processingFee,
        Advance_Amount: advance,
        Loan_Amount: lamount,
        No_of_EMI: emino,
        Actual_EMI_Amount: actualemi,
        EMI_Start_Date: emistartdate,
        Center_Day: centerday,
      });
      console.log("New User Created Successfully");
      Alert.alert("Success", "User registration done");
      setBranch("");
      setCenter("");
      setName("");
      setPhone("");
      setProduct("");
      setTotaldisburseamount("");
      setProccessingFee("");
      setAdvance("");
      setLamount("");
      setEmino("");
      setActualemi("");
      setEmistartdate("");
      setCenterday("");
    } catch (error) {
      console.error("Error creating user: ", error);
      Alert.alert("Error", "There was an error during registration.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Image source={logo} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Disbursement Form</Text>

          <Dropdown
            style={styles.dropdownView}
            data={data}
            search
            labelField="label"
            valueField="value"
            placeholder="Branch Name"
            searchPlaceholder="Search..."
            value={branch}
            onChange={(item) => {
              setBranch(item.value);
            }}
          />

          <Dropdown
            style={styles.dropdownView}
            data={data1}
            search
            labelField="label"
            valueField="value"
            placeholder="Center Name"
            searchPlaceholder="Search..."
            value={center}
            onChange={(item) => {
              setCenter(item.value);
            }}
          />

          <InputBox
            placeholder="Member Name"
            inputmode="name"
            value={name}
            onChangeText={(newEntry) => setName(newEntry)}
          />
          <InputBox
            placeholder="Phone No"
            inputMode="phone-pad"
            value={phone}
            onChangeText={(newEntry) => setPhone(newEntry)}
          />
          <InputBox
            placeholder="Product Name"
            value={product}
            onChangeText={(newEntry) => setProduct(newEntry)}
          />
          <InputBox
            placeholder="Total Disbursement Amount"
            inputMode="numeric"
            // keyboardType="numeric"
            value={totaldisburseamount}
            onChangeText={(newEntry) => setTotaldisburseamount(newEntry)}
          />
          <InputBox
            placeholder="Processing Fee"
            inputMode="numeric"
            value={processingFee}
            onChangeText={(newEntry) => setProccessingFee(newEntry)}
          />
          <InputBox
            placeholder="Advance Amount"
            inputMode="numeric"
            // keyboardType="numeric"
            value={advance}
            onChangeText={(newEntry) => setAdvance(newEntry)}
          />
          <InputBox
            placeholder="Loan Amount"
            //keyboardType="numeric"
            inputMode="numeric"
            value={lamount}
            onChangeText={(newEntry) => setLamount(newEntry)}
          />
          <InputBox
            placeholder="No. of EMI"
            inputMode="numeric"
            //keyboardType="numeric"
            value={emino}
            onChangeText={(newEntry) => setEmino(newEntry)}
          />
          <InputBox
            placeholder="Actual EMI Amount"
            inputMode="numeric"
            //keyboardType="numeric"
            value={actualemi}
            onChangeText={(newEntry) => setActualemi(newEntry)}
          />
          <InputBox
            placeholder="EMI Start Date"
            value={emistartdate}
            onChangeText={(newEntry) => setEmistartdate(newEntry)}
          />
          <InputBox
            placeholder="Center Day"
            value={centerday}
            onChangeText={(newEntry) => setCenterday(newEntry)}
          />
          <Text>Loan Balance :</Text>
          <FormButton onPress={handleRegistration} text="SUBMIT" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoanDisburseForm;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    width: "90%",
    alignItems: "center",
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
    width: "100%",
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 5,
  },
});
