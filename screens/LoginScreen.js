import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Image, SafeAreaView, ActivityIndicator, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { TouchableOpacity } from 'react-native'
import HomeScreen from './HomeScreen';
// import { TextInput } from 'react-native-web'


const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

  const navigation = useNavigation()

//   let users = 'patrick.thibault@codeboxx.biz'

    const Login = async () => {
        try {
        const response = await fetch(`https://glacial-tor-25108.herokuapp.com/api/user/isEmployee/${email}`);
        const json = await response.json();
        setData(json);
        console.log("response", json.user.email)
        if (json.user.email == `${email}`) {
            console.log("success");
            navigation.navigate('Home');
        } else {
        console.log("error"); 
        }
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

  useEffect(() => {
    Login();
  }, []);

  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
        <Image style={styles.tinyLogo}
        source={{
        uri: 'https://i.postimg.cc/Y0K7Rm3p/logo_Rocket.png',
        
        }}
        />
        </View>
        
        <View style={styles.inputContainer}>
            <TextInput
            placeholder="email"
            value={email}
            onChangeText={text =>setEmail(text)}
            //onChangeText={text => console.log(text)}
            style={styles.input}
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={Login} style={styles.button}>
                <Text
                     style={styles.buttonText}
                    //  onPress={() => navigation.navigate(HomeScreen)}
                >
                    Login
                </Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "dodgerblue",
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 220,
        height: 75,
    },

    inputContainer:{
        width: "80%"
    },
    input:{
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,

    },
    buttonContainer:{
        width: "60%",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    button:{
        backgroundColor: "red",
        borderColor: "white",
        borderWidth: 5,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',

    },

    buttonText:{
        fontWeight: "700",
        fontSize: 16,

    }
})