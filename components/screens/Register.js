import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";

import { UserContext } from '../../context/UserContext';

import icon from "../../assets/E-food-icon.png"
import locker from "../../assets/login/locker.png"

const Register = ({ navigation, route }) => {

    const [account, onChangeAccount] = useState("");
    const [password, onChangePassword] = useState("");
    const [rePassword, onChangeRePassword] = useState("");
    const [phone, onChangePhone] = useState("");
    const [mail, onChangeMail] = useState(route.params.mail);
    const { updateUser } = useContext(UserContext);

    const handleRegister = () => {

        if (password === rePassword) {
            fetch(`http://efood.somee.com/api/Login/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": mail,
                    "name": account,
                    "phone": phone,
                    "password": password,
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        fetch(`http://efood.somee.com/api/Login`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                "email": mail,
                                "password": password,
                            })
                        })
                            .then(response => {
                                if (response.status === 200) {
                                    updateUser(response.json());
                                    navigation.navigate("Home");
                                } else {
                                    console.log("Sign in faile " + response.status);
                                }
                            })
                            .catch(error => {
                                // Handle any error that occurred during the API call
                                console.error("Error checking OTP:", error);
                            });
                    } else {
                        console.log("Register faile" + response.status);
                    }
                })
                .catch(error => {
                    // Handle any error that occurred during the API call
                    console.error("Error checking OTP:", error);
                });
        } else {
            console.log("didn't match password")
        }
    }

    return (
        <View style={styles.login}>
            <Image
                style={styles.tinyLogo}
                source={icon}
            >
            </Image>
            <Text
                style={styles.text}
            >Register in to your account</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeAccount}
                value={account}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeRePassword}
                value={rePassword}
                placeholder="Password again"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePhone}
                value={phone}
                placeholder="Phone"
                keyboardType='numeric'
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeMail}
                value={mail}
                placeholder="Mail"
                editable={false}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
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
                        marginLeft: 140,
                        fontWeight: 700,
                        color: "white",
                    }}
                >Register</Text>
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

export default Register