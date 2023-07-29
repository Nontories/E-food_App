import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import TabNavigate from "../TabNavigate";
import PremiumBack from "../PremiumBack";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Premium = () => {

    const navigation = useNavigation()
    const [height, onChangeHeight] = useState("");
    const [weight, onChangeWeight] = useState("");
    const toast = useToast();

    const showToast = (message, type) => {
        toast.show(message, {
            type: type,
            placement: "top",
            duration: 3000,
            animationType: "slide-in",
        });
    };

    const submit = () => {
        if (height && weight) {
            fetch(`http://efood.somee.com/api/BMI`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "height": parseInt(height),
                    "weight": parseInt(weight),
                })
            })
                .then(response => {
                    if (response.status === 200) {
                        // The API call was successful
                        return response.json(); // Parse the JSON response
                    } else {
                        showToast(response.status, "warning");
                        return null;
                    }
                })
                .then(data => {
                    if (data) {
                        navigation.navigate("PremiumResult", result = { data });
                    }
                })
                .catch(error => {
                    showToast("Hệ thống đang lỗi, hãy thử lại sau", "warning")
                    console.error("Error checking OTP:", error);
                });
        } else {
            showToast("Nhập hết các thông tin", "warning")
        }
    }



    return (
        <View style={styles.container}>
            {/* <PremiumBack /> */}
            {/* <Text style={styles.comingSoon}>
                Coming Soon
            </Text> */}
            <View style={styles.form}>
                <Text style={styles.title}>
                    Automatic Diet Recommendation
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeHeight}
                    value={height}
                    placeholder="Height"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeWeight}
                    value={weight}
                    placeholder="Weight"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    onPress={() => submit()}
                >
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
            </View>
            <TabNavigate />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        // justifyContent: "center",
        alignItems: "center",
    },
    comingSoon: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: 700,
    },
    title: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: 700,
        marginVertical: 15,
    },
    form: {
        width: WIDTH,
        height: HEIGHT * 0.9,
        alignItems: "center",
    },
    input: {
        width: WIDTH * 0.9,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 15,
        opacity: 0.5,
    },
    submitButton: {
        width: WIDTH * 0.9,
        padding: HEIGHT * 0.01,
        backgroundColor: "rgb(73,144,226)",
        textAlign: "center",
        color: "white",
        fontSize: 25,
        fontWeight: 700,
        borderRadius: 15,
    }
});

export default Premium