import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { useToast } from "react-native-toast-notifications";

import icon from "../../assets/E-food-icon.png"
import locker from "../../assets/login/locker.png"
import BackButton from "../BackButton";

const Login = ({ navigation }) => {
    const [mail, onChangeMail] = useState("");
    const toast = useToast();

    const fetchData = (mail) => {
        fetch(`http://efood.somee.com/api/Login/sendOTP?email=${mail}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(() => {
            showToast("Đã gửi OTP", "success")
        })
    };

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    const handleSignIn = async () => {
        if (validateEmail(mail)) {
            fetchData(mail)
            navigation.navigate("Otp", { mail: mail });
        } else {
            // Handle invalid email case, show a message, or take appropriate action
        }
    };

    const showToast = (message, type) => {
        toast.show(message, {
            type: type,
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
          });
    };

    return (
        <View style={styles.login}>
            {/* <BackButton /> */}
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