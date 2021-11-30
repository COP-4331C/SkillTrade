import React from 'react'; // , {useEffect}
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../components/context';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export function DrawerContent(props) {

    const [isDarkTheme, setIsDarkTheme] = React.useState(false) // useState() ??
    const { signOut } = React.useContext(AuthContext);

    const toggleTheme = () =>{
        setIsDarkTheme(!isDarkTheme)
    }

    const [profileData, setProfileData] = React.useState([]);

    connectToProfileApi();

    async function connectToProfileApi(){
        let userToken = null;
        try {
            userToken = await SecureStore.getItemAsync('userToken'); // need to add 'await' 
        } catch (e) {
            console.warn(e);
        }
        let hostId = null;
        try {
            hostId = await SecureStore.getItemAsync('userId'); 
        } catch (e) {
            console.warn(e);
        };
        // console.warn(hostId) // test issue ; FIXME
    await axios.get(`https://cop4331c.herokuapp.com/api/user/profile/${hostId}`,  {
            headers: {
                Authorization: `Bearer ${userToken}`  
            }
            })
        .then(function(response) {
            setProfileData(response.data)
        })
        .catch(function(error) {
            console.warn(error)
        });
    }

    // async function goToProfile() {
    //     let hostId = null;
    //     try {
    //         hostId = await SecureStore.getItemAsync('userId'); 
    //     } catch (e) {
    //         console.warn(e);
    //     };
    //     props.navigation.navigate('Profile', hostId)

    // } 
    
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row', marginTop:15}}>
                            <Avatar.Image
                                source={{
                                    uri:'https://img9.doubanio.com/icon/ul3580236-4.jpg'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{profileData.firstName} {profileData.lastName}</Title>
                                <Caption style={styles.caption}>@wwu</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Follower</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label = "Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                name="account-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label = "Profile"
                            onPress={() => { props.navigation.navigate('Profile')  }} //   goToProfile() 
                        />
                        <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                name="bookmark-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label = "Bookmarks"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-cog-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Change Pass word" 
                            onPress={() => {props.navigation.navigate('ChangePasswordScreen')}} // error: not handle by any navigator ??
                        />
                        <DrawerItem
                            icon = {({color, size}) => (
                                <Icon
                                name="account-check-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label = "Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon = {({color, size}) => (
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label = "Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
