import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../screens/Profile";
import LoanDisburseForm from "../screens/LoanDisburseForm";
import InstallmentCollection from "../screens/InstallmentCollection";
import UserRegisterForm from "../screens/UserRegisterForm";
import useUserRole from "../hooks/useUserRole"; // Import the custom hook

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const role = useUserRole(); // Fetch the user role

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={LoanDisburseForm}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Collection"
        component={InstallmentCollection}
        options={{
          tabBarLabel: "Collection",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      {role === "admin" && (
        <Tab.Screen
          name="Register"
          component={UserRegisterForm}
          options={{
            tabBarLabel: "Register",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-plus"
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default Tabs;
