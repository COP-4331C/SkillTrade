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
    ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

const SignInScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        confirm_password: '',
        check_email_InputChange: false,
        check_firstnameInputChange: false,
        check_lastnameInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true
    });

    const textInputChange = (val) => { // check email input changes
        if(val.length !== 0){
            setData({
                ...data,
                email:val,
                check_email_InputChange:true
            })
        } else {
            setData({
                ...data,
                email:val,
                check_email_InputChange:false
            })
        }
    }

    const firstNameInputChange = (val) => { // check firstNameInputChange 
        if(val.length !== 0){
            setData({
                ...data,
                firstname:val,
                check_firstnameInputChange:true
            })
        } else {
            setData({
                ...data,
                firstname:val,
                check_firstnameInputChange:false
            })
        }
    }

    const lastNameInputChange = (val) => { // check lastNameInputChange 
        if(val.length !== 0){
            setData({
                ...data,
                lastname:val,
                check_lastnameInputChange:true
            })
        } else {
            setData({
                ...data,
                lastname:val,
                check_lastnameInputChange:false
            })
        }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            password: val
        })
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    function connectToSignUpApi(email, firstname, lastname, password){
        axios.post('https://cop4331c.herokuapp.com/api/user/register', {
                email: email, // "test1234567@example.com",
                firstName: firstname, // "wei",
                lastName: lastname, // "wu",
                password: password // "123456"
            })
            .then(function(response) {
                // console.warn('test good') // for test 
                navigation.goBack()
            })
            .catch(function(error) {
                console.log(error)
            });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.container}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View 
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView> 
                    <Text style={styles.text_footer}>Email</Text>  
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Email" // place holder
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)} 
                        />
                        {data.check_email_InputChange ? 
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                        </Animatable.View>
                        : null}
                    </View>

                    <Text style={[styles.text_footer, {marginTop:25}]}>First Name</Text> 
                    <View style={styles.action}> 
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your First Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => firstNameInputChange(val)} 
                        />
                        {data.check_firstnameInputChange ? 
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                        </Animatable.View>
                        : null}
                    </View>

                    <Text style={[styles.text_footer, {marginTop:25}]}>Last Name</Text> 
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Last Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => lastNameInputChange(val)} 
                        />
                        {data.check_lastnameInputChange ? 
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                        </Animatable.View>
                        
                        : null}
                    </View>

                    <Text style={[styles.text_footer, {marginTop:25}]}>Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Your Password"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)} 
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
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

                    <Text style={[styles.text_footer, {marginTop:25}]}>Confirm Password</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color="#05375a"
                            size={20}
                        />
                        <TextInput
                            placeholder="Confirm Your Password"
                            secureTextEntry={data.confirm_secureTextEntry ? true : false}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => handleConfirmPasswordChange(val)} 
                        />
                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.secureTextEntry ?
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

                    <View style={styles.button}>

                        <TouchableOpacity
                            onPress={() => connectToSignUpApi(
                                data.email, data.firstname, 
                                data.lastname, data.password) } 
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                // marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign Up</Text>
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
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView> 
            </Animatable.View>
        </View>
    )
}

export default SignInScreen;

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
        fontSize: 30
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

