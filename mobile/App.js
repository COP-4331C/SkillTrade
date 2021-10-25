import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  View,
  Text,
  Button,
} from 'react-native';

const HomeScreen = ({navigation}) => { // with ({navigation}) => ... instead of (navigation) => ...
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title = "Go to details screen"
        onPress = {() => navigation.navigate("Details")}
      />
    </View>
  )
}

const DetailsScreen = ({navigation}) => {
  return (
    <View style={{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title = "Go to details screen...again"
        onPress = {() => navigation.push("Details")}
      />
      <Button
        title = "Go to home"
        onPress = {() => navigation.navigate("Home")}
      />
      <Button
        title = "Go back"
        onPress = {() => navigation.goBack()}
      />
      <Button
        title = "Go to the first screen"
        onPress = {() => navigation.popToTop()}
      />
    </View>
  )
}

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        headerStyle: {
          backgroundColor:'#009387',
        },
        headerTintColor:'#fff',
        headerTitleStyle: {
          fontWeight:'bold'
        }
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Overview'
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
} 

export default App
