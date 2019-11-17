import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Amplify from "aws-amplify"
import config from "./aws-exports"

import { withAuthenticator } from "aws-amplify-react-native"
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'
import HomeScreen from './screens/HomeScreen'

Amplify.configure(config)

const AppStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

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