import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingScreen from './screens/SettingScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import * as SecureStore from 'expo-secure-store';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import AddSkillScreen from './screens/AddSkillScreen';
import EditSkillScreen from './screens/EditSkillScreen';
import AddReviewScreen from './screens/AddReviewScreen';
import EditReviewScreen from './screens/EditReviewScreen';

const Drawer = createDrawerNavigator(); 

const App = () => {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => { // React.useReducer() ??
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState, // reserve prevState's value ?
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  // create a loginState variable and assign value, ?
  // in the meanwhile, create a dispatch method use for changing the value of loginState. ?
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState); 
  const authContext = React.useMemo(() => ({ // React.useMemo() ??
    signIn: async(userName, password) => {
      let userToken;
      userToken = null
      await axios.post('https://cop4331c.herokuapp.com/api/auth/login', { //connect API, need to be await
              email: userName, // 'test@example.com'
              password: password // 'fooBarBaz'
          }) 
          .then(function(response) { 
              userToken = response.data.accessToken
              // console.warn(userToken) // for test
          })
          .catch(function(error) {
              // console.log(error)
              Alert.alert(
                'Invalid User!', 
                'Email or password is incorrect.', 
                [ // an array of objects (each object is a button)
                  { 
                      text: "OK", 
                      onPress: () => console.log("OK Pressed") 
                  },
                ], 
              );
          });
      if( userToken !== null ){
        try {
          await SecureStore.setItemAsync('userToken', userToken);
          // await AsyncStorage.setItem('userToken', userToken) //store the token in AsyncStorage
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken})
    },
    signOut: async() => {
      try {
        await SecureStore.deleteItemAsync('userToken');
        // await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'})
    },
    signUp: () => { 

    },
  }),[]); //pass a empty array [] so that this doesn't run every time when render screen

  useEffect(() => { // check whether the user is logined or not
    setTimeout(async() => { // setTimeout(), inside function will execute after certain milliseconds
     let userToken;
     userToken = null;
     try {
      userToken = await SecureStore.getItemAsync('userToken');
      // userToken = await AsyncStorage.getItem('userToken')
    } catch (e) {
      console.log(e);
    }
     // console.log('user token: ', userToken);
     dispatch({type: 'REGISTER', token: userToken})
    }, 1000); // execute after 1000 milliseconds, that is 1 second.
  }, []);

  if( loginState.isLoading ){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    { loginState.userToken !== null ? ( 
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingScreen" component={SettingScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
        <Drawer.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Drawer.Screen name="AddSkillScreen" component={AddSkillScreen} />
        <Drawer.Screen name="EditSkillScreen" component={EditSkillScreen} />
        <Drawer.Screen name="AddReviewScreen" component={AddReviewScreen} />
        <Drawer.Screen name="EditReviewScreen" component={EditReviewScreen} />
      </Drawer.Navigator>
    )
    :
      <RootStackScreen/>
    }
      </NavigationContainer>
      </AuthContext.Provider>
  );
}

export default App;
