import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserLoginForm from './screens/UserLoginForm';
import UserRegisterForm from './screens/UserRegisterForm';
import Tabs from './navigation/Tabs';
//import Tabs from './navigation/tabs'; // Adjust the import path as needed

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={UserLoginForm} />
        <Stack.Screen name="RegistrationForm" component={UserRegisterForm} />
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
