import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import React, {useState} from "react";

import icon from "../../assets/E-food-icon.png"
import locker from "../../assets/login/locker.png"

const Login = ({ navigation }) => {
    const [mail, onChangeMail] = useState("");

    const fetchData = (mail) => {
        fetch(`http://efood.somee.com/api/Login/sendOTP?email=${mail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
    };


    const handleSignIn = async () => {
        // const isValidEmail = await checkValidEmail(number);
        const isValidEmail = true
        if (isValidEmail) {
            fetchData(mail)
            navigation.navigate("Otp", { mail: mail });
        } else {
            // Handle invalid email case, show a message, or take appropriate action
        }
    };

    return (
        <View style={styles.login}>
            <Image
                style={styles.tinyLogo}
                source={icon}
            >
            </Image>
            <Text
                style={styles.text}
            >Verify your email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeMail}
                value={mail}
                placeholder="Enter you mail"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
            >
                <Image
                    style={{
                        width: 10,
                        height: 15,
                        transform: [{ translateX: 10 }]
                    }}
                    source={locker}
                />
                <Text
                    style={{
                        marginLeft: 120,
                        width: 150,
                        color: "white",
                    }}
                >Sign in with OTP</Text>
            </TouchableOpacity >
        </View >
    )
}

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tinyLogo: {
        width: 50,
        height: 50,
        marginHorizontal: "auto",
    },
    text: {
        width: 350,
        textAlign: "center",
        fontSize: 28,
        fontWeight: 700,
        marginVertical: 15,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        marginHorizontal: "auto",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        opacity: 0.5,
    },
    button: {
        width: 350,
        paddingVertical: 8,
        marginTop: 20,
        marginHorizontal: "auto",
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#0C4A6E",
        flexDirection: "row",
        flexWrap: "wrap",
    }
});

export default Login