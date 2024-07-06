import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";

import { database } from "../firebaseConfig";
import { ref, set, onValue } from "firebase/database";
const InstallmentCollection = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("Member_Name"); // Default filter by Member Name

  useEffect(() => {
    const dataRef = ref(database, "disbursement_data"); // Path to your data in Firebase
    onValue(dataRef, (snapshot) => {
      const fetchedData = [];
      snapshot.forEach((childSnapshot) => {
        fetchedData.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setData(fetchedData);
    });
  }, []);

  const handleCollectEMI = (item) => {
    // Implement EMI collection logic here
    alert(`Collecting EMI for ${item.Member_Name}`);
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Branch:</Text> {item.Branch_Name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Center:</Text> {item.Center_Name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Name:</Text> {item.Member_Name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Phone No:</Text> {item.Phone_No}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Product:</Text> {item.Product_Name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Total Disbursement:</Text>{" "}
        {item.Total_Disbursement_Amount}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Processing Fee:</Text>{" "}
        {item.Processing_Fee}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Advance Amount:</Text>{" "}
        {item.Advance_Amount}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Loan Amount:</Text> {item.Loan_Amount}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>No of EMI:</Text> {item.No_of_EMI}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>EMI Amount:</Text>{" "}
        {item.Actual_EMI_Amount}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>EMI Start Date:</Text>{" "}
        {item.EMI_Start_Date}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardLabel}>Center Day:</Text> {item.Center_Day}
      </Text>
      <Pressable style={styles.button} onPress={() => handleCollectEMI(item)}>
        <Text style={styles.buttonText}>Collect EMI</Text>
      </Pressable>
    </View>
  );
  const filterData = (data) => {
    return data.filter((item) => {
      if (filterBy === "Member_Name") {
        return item.Member_Name.toLowerCase().includes(search.toLowerCase());
      } else if (filterBy === "Center_Name") {
        return item.Center_Name.toLowerCase().includes(search.toLowerCase());
      } else if (filterBy === "Phone_No") {
        return item.Phone_No.includes(search);
      }
      return true;
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search customer"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            filterBy === "Member_Name" && styles.activeFilterButton,
          ]}
          onPress={() => setFilterBy("Member_Name")}
        >
          <Text style={styles.filterButtonText}>By Name</Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filterBy === "Center_Name" && styles.activeFilterButton,
          ]}
          onPress={() => setFilterBy("Center_Name")}
        >
          <Text style={styles.filterButtonText}>By Center</Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filterBy === "Phone_No" && styles.activeFilterButton,
          ]}
          onPress={() => setFilterBy("Phone_No")}
        >
          <Text style={styles.filterButtonText}>By Phone</Text>
        </Pressable>
      </View>
      {/* <Button
        title="Search"
        onPress={() => setFilterBy('Member_Name')}
        // onPress={() => {
        //   // Implement search functionality here
        // }}
        
      />
      {/* <FlatList
        data={data.filter(item => item.Member_Name.includes(search))}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        style={styles.cardContainer}
      /> */}
      <FlatList
        data={filterData(data)}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        style={styles.cardContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: "#ed34ac",
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    marginTop: 20,
  },
  card: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  cardLabel: {
    fontWeight: "bold",
    color: "#555",
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InstallmentCollection;
