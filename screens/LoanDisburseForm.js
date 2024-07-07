import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
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

  //dropdown
  const [value, setValue] = useState(null);
  

  const handleRegistration = async () => {

    if (!branch || !center || !name || !product ||!totaldisburseamount ||!processingFee ||!advance ||!lamount ||!emino ||!actualemi ||!emistartdate ||!centerday) {
      Alert.alert("Error", "All fields are required.");
      console.log("Error : All fields are required");
      return;
    }
    
      // console.log({ branch, center, name, phone,product,totaldisburseamount,processingFee,advance,lamount,emino,actualemi,emistartdate,centerday });

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
        Center_Day:centerday,
      });
      console.log("New User Created Successfully");
      Alert.alert("Success", "User registration done");
      setName("");
       setPhone("");
      // setUsername("");
      // setPassword("");
    } catch (error) {
      console.error("Error creating user: ", error);
      Alert.alert("Error", "There was an error during registration.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
        onChange={item=>{setBranch(item.value)}}
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
        onChange={item=>{setCenter(item.value)}}
      />
        <InputBox
        placeholder="Member Name"
        inputmode="name"
        value={name}
        onChangeText={(newEntry) => setName(newEntry)}
      />
      <InputBox
        placeholder="Phone No"
        //maxLength='10'
        //inputmode="numeric"
         //keyboardType="phone-pad"
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
        //inputmode="numeric"
         keyboardType="numeric"
        value={totaldisburseamount}
        onChangeText={(newEntry) => setTotaldisburseamount(newEntry)}
      />
       <InputBox
        placeholder="Processing Fee"
        //inputmode="email"
        value={processingFee}
        onChangeText={(newEntry) => setProccessingFee(newEntry)}
      />
       <InputBox
        placeholder="Advance Amount"
        //inputmode="email"
         keyboardType="numeric"
        value={advance}
        onChangeText={(newEntry) => setAdvance(newEntry)}
      />
       <InputBox
        placeholder="Loan Amount"
        //inputmode="email"
         keyboardType="numeric"
        value={lamount}
        onChangeText={(newEntry) => setLamount(newEntry)}
      />
       <InputBox
        placeholder="No. of EMI"
       // inputmode="email"
        keyboardType="numeric"
        value={emino}
        onChangeText={(newEntry) => setEmino(newEntry)}
      />
      <InputBox
        placeholder="Actuual EMI Amount"
        inputmode="number"
        keyboardType="numeric"
        value={actualemi}
        onChangeText={(newEntry) => setActualemi(newEntry)}
        //formula Loan Amount/No of EMI
      />
      <InputBox
        placeholder="EMI Start Date"
        //inputmode="email"
        value={emistartdate}
        onChangeText={(newEntry) => setEmistartdate(newEntry)}
        //formula Loan Amount/No of EMI
      />
      <InputBox
        placeholder="Center Day"
        //inputmode="email"
        value={centerday}
        onChangeText={(newEntry) => setCenterday(newEntry)}
        //auto from date
      />
      <Text>Loan Balance :</Text>
      <FormButton onPress={handleRegistration} text="SUBMIT" />
      
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default LoanDisburseForm;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 0,
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
     width:'100%',
    paddingHorizontal : 40,    
    borderColor : "red",
    borderWidth : 1,
    borderRadius: 7,
    marginBottom:5
  },
});
