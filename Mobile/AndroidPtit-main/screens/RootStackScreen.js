import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import DiscussionScreen from "./Discussion";
import CreateGroupScreen from "./CreateGroup";
import BottomTabNavigator from "../navigation/Navigator";
const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="Discussion" component={DiscussionScreen} />
    <RootStack.Screen name="CreateGroup" component={CreateGroupScreen} />
    <RootStack.Screen
      name="MainScreen"
      component={BottomTabNavigator}
    ></RootStack.Screen>
  </RootStack.Navigator>
);

export default RootStackScreen;
