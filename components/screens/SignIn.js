import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { UserContext } from '../../context/UserContext';
import { useToast } from "react-native-toast-notifications";

import icon from "../../assets/E-food-icon.png"
import locker from "../../assets/login/locker.png"

const SignIn = ({ navigation }) => {
    const [account, onChangeAccount] = useState("");
    const [password, onChangePassword] = useState("");
    const { updateUser } = useContext(UserContext);
    const toast = useToast();

    const handleSignIn = async () => {
        try {
            const response = await fetch(`http://efood.somee.com/api/Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": account,
                    "password": password,
                }),
            });
    
            if (response.status === 200) {
                const data = await response.json();
                if (data) {
                    updateUser(data);
                    showToast("Đăng nhập thành công", "success");
                    navigation.navigate("Home");
                } else {
                    showToast("Sai tên đăng nhập hoặc mật khẩu", "warning");
                }
            } else {
                showToast("Sai tên đăng nhập hoặc mật khẩu", "warning");
            }
        } catch (error) {
            // Handle any error that occurred during the API call
            console.error("Error checking OTP:", error);
        }
    }

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
            <Image
                style={styles.tinyLogo}
                source={icon}
            >
            </Image>
            <Text
                style={styles.text}
            >Sign in to your account </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeAccount}
                value={account}
                placeholder="Email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignIn}
            >
                <Image
                    style={{
                        width: 10,
                        height: 15,
                        marginVertical: "auto",
                        transform: [{ translateX: 10 }]
                    }}
                    source={locker}
                />
                <Text
                    style={{
                        width: 150,
                        marginLeft: 150,
                        fontWeight: 500,
                        color: "white",
                    }}
                >Sign in</Text>
            </TouchableOpacity >
            <Text>
                Don't Have An Account not send OTP ?
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Login") }}
                >
                    <Text style={styles.resend}>Sign Up</Text>
                </TouchableOpacity>
            </Text>
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
        marginVertical: 20,
        marginHorizontal: 60,
        borderRadius: 5,
        textAlign: "center",
        backgroundColor: "#0C4A6E",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    resend: {
        color: "#0C4A6E",
        fontWeight: 700,
        transform: [{ translateX: 10 }, { translateY: 3 }]
    },
});


export default SignIn
