import { View, Text } from "react-native";
import React from "react";
import { Dropdown } from "react-native-element-dropdown";
const FormDropdown = ({search, data, onChange, searchPlaceholder,labelField,valueField,placeholder }) => {
   
    return (
    <View style={styles.inputView}>
      <Dropdown
        style={styles.input}
        search={search}
        data={data}
        onChange={onChange}
        value={value}
        searchPlaceholder={searchPlaceholder}
        labelField={labelField}
        valueField={valueField}
        placeholder={placeholder}
      />
    </View>
  );
};

export default FormDropdown;

const styles = StyleSheet.create({
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
  },
  

});
