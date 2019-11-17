import React, { Component } from 'react';
import { Text, View, Image,TouchableHighlight } from 'react-native';
import Amplify from "aws-amplify"
import config from "./aws-exports"

import { withAuthenticator } from "aws-amplify-react-native"
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator,DrawerActions} from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignUpScreen from './screens/SignUpScreen'
import SignInScreen from './screens/SignInScreen'
import ConfirmSignUpScreen from './screens/ConfirmSignUpScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import ChatScreen from './screens/ChatScreen'

Amplify.configure(config)

const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Chat: ChatScreen,
},
{
      initialRouteName: 'Home',
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      title: 'Libravos',
      headerLeft: <TouchableHighlight style={{paddingLeft: 10}}onPress={() =>{navigation.openDrawer()}}><Image
                                  style={{width: 40, height: 40}}
                                  source={require('./assets/icons/menu.png')}
                  /></TouchableHighlight>
})
});

const AppStack = createStackNavigator({
                   Drawer: { screen: AppDrawerNavigator }
                 });
const AuthStack = createStackNavigator({ SignUp:SignUpScreen, ConfirmSignUp: ConfirmSignUpScreen, SignIn: SignInScreen, });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);