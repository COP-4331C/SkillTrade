import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet, 
    StatusBar,
    ScrollView,
    Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

const ChangePasswordScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        oldPassword: '',
        newPassword: '',
        secureTextEntryOld: true,
        secureTextEntryNew: true,
        isValidPassword: true, 
    });


     // Validate old Password
     const handleOldPasswordChange = (val) => {
       if(val.length > 0 && val.length <= 50){
           setData({
               ...data,
               oldPassword: val,
           });
       } else {
           setData({
               ...data,
               oldPassword: val,
           });
       }
   }

    // Validate Password
    const handleNewPasswordChange = (val) => {
        // var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        // var strongRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        var strongRegex = /^(?=.{8,50}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
       if(val.match(strongRegex)){
           setData({
               ...data,
               newPassword: val,
               isValidPassword: true,
               // firstClickPassword: true,
           });
       } else {
           setData({
               ...data,
               newPassword: val,
               isValidPassword: false,
               // firstClickPassword: true,
           });
           
       }
   }

    const updateSecureTextEntryOld = () => {
        setData({
            ...data,
            secureTextEntryOld: !data.secureTextEntryOld
        })
    }

    const updateSecureTextEntryNew = () => {
        setData({
            ...data,
            secureTextEntryNew: !data.secureTextEntryNew
        })
    }

    function connectToChangePasswordApi(userToken, oldPassword, newPassword){
        axios.put('https://cop4331c.herokuapp.com/api/user/change-password', { 
                oldPassword: oldPassword,
                newPassword: newPassword 
            }, {
                headers: {
                  'Authorization': `Bearer ${userToken}`  
                }
              })
            .then(function(response) {
                // console.warn("password changed")
                Alert.alert(
                    "Password changed!", // Alert Title
                    " ", // My Alert Msg
                    [ // an array of objects (each object is a button)
                        { 
                            text: "OK", 
                            onPress: () => console.log("OK Pressed") 
                        },
                    ], 
                )
                navigation.goBack()
            })
            .catch(function(error) {
                // console.warn("fail to changed password")
                Alert.alert(
                    "Fail to changed password!",
                    "Please input your correct old password.",
                    [
                        { 
                            text: "OK", 
                            onPress: () => console.log("OK Pressed") 
                        }, 
                    ],
                )
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.container}>
                <Text style={styles.text_header}>Change your password</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView> 

                <Text style={[styles.text_footer, {marginTop:25}]}>Old Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Old Password"
                            secureTextEntry={data.secureTextEntryOld ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleOldPasswordChange(val)} 
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntryOld}
                        >
                            {data.secureTextEntryOld ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    

                    <Text style={[styles.text_footer, {marginTop:25}]}>New Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your New Password"
                            secureTextEntry={data.secureTextEntryNew ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleNewPasswordChange(val)} 
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntryNew}
                        >
                            {data.secureTextEntryNew ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                            }
                        </TouchableOpacity>
                    </View>
                    { data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Password must contain atleast 8 characters and a max of 50 characters, have a lowercase letter, uppercase letter, a number, and a special character, for example Xxxxxx1#</Text>
                    </Animatable.View>
                    }

                    


                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={async () => { // need to add async, if want to add 'await' in coming command
                                if (data.isValidPassword == true && data.newPassword.length > 0 ){ 
                                    let userToken = null;
                                    try {
                                        userToken =  await SecureStore.getItemAsync('userToken'); // need to add 'await' 
                                    } catch (e) {
                                        console.warn('SecureStore error');
                                    }
                                    connectToChangePasswordApi(userToken, data.oldPassword, data.newPassword) 
                                }
                                else {
                                    Alert.alert(
                                        "Invalid new password!",
                                        "Please check your input.",
                                        [ // an array of objects (each object is a button)
                                            { 
                                                text: "OK", 
                                                onPress: () => console.log("OK Pressed") 
                                            },
                                        ], 
                                    )
                                } 
                            }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color:'#fff'
                                }]}>Change Password</Text>
                            </LinearGradient>
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> 
            </Animatable.View>
        </View>
    )
}

export default ChangePasswordScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

