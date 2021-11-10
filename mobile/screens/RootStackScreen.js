import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgetPasswordScreen from './ForgetPasswordScreen';
import TermsScreen from './TermsScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen}/>
        <RootStack.Screen name="TermsScreen" component={TermsScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;