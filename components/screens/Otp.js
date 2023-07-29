import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import OTPTextInput from "react-native-otp-textinput"
import { useToast } from "react-native-toast-notifications";

import locker from "../../assets/login/locker.png"
import BackButton from "../BackButton";

const Otp = ({ route, navigation }) => {

    const mail = route.params.mail
    const [otp, onChangeOtp] = useState("");
    const toast = useToast();

    sendOtp = (mail) => {
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

    handleOTPChange = (otp) => {
        onChangeOtp(otp)
    }

    checkOtp = (mail, otp) => {
        fetch(`http://efood.somee.com/api/Login/tryOTP?email=${mail}&otp=${otp}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.status === 200) {
                    navigation.navigate("Register", { mail: mail });
                } else if (response.status === 401) {
                    showToast("OTP không đúng", "warning")
                } else {
                    console.log("Unexpected response status:", response.status);
                }
            })
            .catch(error => {
                // Handle any error that occurred during the API call
                console.error("Error checking OTP:", error);
            });
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
        <View style={styles.container}>
            <View style={styles.backButton}>
                <BackButton />
            </View>
            <Text style={styles.title}>OTP Verification</Text>

            <Text style={styles.text}>
                We Will send you a one time password on this
                <Text
                    style={{
                        fontWeight: 600,
                    }}
                > Email Address
                </Text>
            </Text>

            <Text style={styles.number}>+ {mail}</Text>


            <OTPTextInput
                inputCount={6}
                handleTextChange={handleOTPChange}
            ></OTPTextInput>

            <TouchableOpacity
                style={styles.button}
                onPress={() => { this.checkOtp(mail, otp) }}
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
                        marginLeft: 120,
                        color: "white",
                    }}
                >Sign in with OTP</Text>
            </TouchableOpacity >

            <Text>
                Do not send OTP  ?
                <TouchableOpacity
                    onPress={() => {
                        sendOtp(mail)
                    }}
                >
                    <Text style={styles.resend}> Send OTP</Text>
                </TouchableOpacity>
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    backButton:{
        position:"absolute",
        top: 0,
    },
    title: {
        marginBottom: 15,
        fontSize: 25,
        fontWeight: 700,
    },
    text: {
        width: 300,
        textAlign: "center",
        marginVertical: 10,
    },
    number: {
        opacity: 0.7,
        marginBottom: 10,
    },
    otpInput: {
        borderColor: "black",
        borderWidth: 1
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
        marginBottom: 20,
    },
    resend: {
        color: "#0C4A6E",
        fontWeight: 700,
    },
});

export default Otp