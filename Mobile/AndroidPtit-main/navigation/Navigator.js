import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "../screens/Chat";
import Icon2 from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesome5 } from "@expo/vector-icons";
import { isAuthenticated } from "../components/Shared/Routes/permissionChecker";
import userActions from "../redux/actions/user";
import userSelectors from "../redux/selectors/user";
const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  useEffect(() => {
    if (!currentUser && isAuthenticated()) {
      dispatch(userActions.getCurrentUser());
    }
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#f2404c",
        inactiveTintColor: "#000119",
        style: {
          height: 65,
          justifyContent: "center",
          paddingVertical: 15,
          backgroundColor: "#fff",
          elevation: 2,
        },
      }}
    >
     {/*  <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon name="ios-compass" color={color} size={30} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="chat" color={color} size={30} />
          ),
        }}
      />
     {/*  <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" color={color} size={30} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: false,
};

/* const ChatStackNavigator = () => {
  return <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Chat" component={BottomTabNavigator}></Stack.Screen>
  </Stack.Navigator>;
}; */

export default BottomTabNavigator;
