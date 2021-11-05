import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingScreen from './screens/SettingScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { AuthContext } from './components/context';
import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Drawer = createDrawerNavigator(); 

const App = () => {
  // Part of verification
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
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

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  const authContext = React.useMemo(() => ({
    signIn: async(userName, password) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      let userToken;
      userToken = null
      await axios.post('https://cop4331c.herokuapp.com/api/auth/login', { // need to be await
              email: userName, // 'test@example.com'
              password: password // 'fooBarBaz'
          }) 
          .then(function(response) { 
              userToken = response.data.accessToken
              // console.warn(userToken) // for test
          })
          .catch(function(error) {
              console.log(error)
          });
      if( userToken !== null ){ // not sure how to prevent undefined variable
        try {
          await AsyncStorage.setItem('userToken', userToken) // store the token in AsyncStorage
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({type: 'LOGIN', id: userName, token: userToken})
    },
    signOut: async() => {
      // setUserToken('null');
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'})
    },
    signUp: () => { // need to conect to register API 
      // setUserToken('fgkj');
      // setIsLoading(false);
      // console.warn('rigister')
      // axios.post('https://cop4331c.herokuapp.com/api/user/register', {
      //         email: userName,
      //         password: password
      //     })
      //     .then(function(response) {
      //         navigation.goBack()
      //         console.warn('rigister success')
      //     })
      //     .catch(function(error) {
      //         console.log(error)
      //     }); 
    },
  }),[]);

  useEffect(() => { // what is function for ?
    setTimeout(async() => {
     // setIsLoading(false); 
     let userToken;
     userToken = null;
     try {
      userToken = await AsyncStorage.getItem('userToken')
    } catch (e) {
      console.log(e);
    }
     // console.log('user token: ', userToken);
     dispatch({type: 'REGISTER', token: userToken})
    }, 1000);
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
    { loginState.userToken !== null ? ( // ## !loginState.userToken ? not working properly here
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
        <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
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
