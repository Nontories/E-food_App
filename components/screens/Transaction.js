import React, { useContext } from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useToast } from "react-native-toast-notifications";

import { UserContext } from '../../context/UserContext';

import BackButton from "../BackButton";
import transactionImage from "../../assets/transaction.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const Transaction = ({ route }) => {

    const transaction = route.params.transaction
    const user = route.params.user
    const toast = useToast();

    console.log(user);

    const handleSubmit = () => {
        fetch(`http://efood.somee.com/api/Transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "paymentMethodId": 1,
                "accountId": user?.accountId,
                "value": transaction?.value,
            })
        }).then(response => {
            console.log(response.status);
            showToast("Xác nhận : " + response.status, "default")
        })
        .catch(error => {
            showToast("Xác nhận thất bại", "warning")
            console.error("Error checking transaction:", error);
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
            <BackButton />
            <LinearGradient
                colors={['#0C4A6E', '#a40061']}
                start={{
                    x: 0.5,
                    y: 0
                }}
                end={{
                    x: 0.5,
                    y: 1
                }}
                style={styles.transactionInfor}
            >
                <Text style={styles.transactionText}>
                    Nội dung : {user?.userId}
                </Text>
                <Text style={styles.transactionText}>
                    Số tiền : {transaction?.value} VND
                </Text>
            </LinearGradient>
            <View style={styles.transactionView}>
                <Image
                    style={styles.momoImage}
                    source={transactionImage}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    handleSubmit()
                }}
            >
                <Text style={styles.transactionButton}>Tôi đã chuyển khoản</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "#a40061"
    },
    transactionInfor: {

    },
    transactionText: {
        width: WIDTH,
        textAlign: "center",
        color: "white",
        fontSize: 25,
        fontWeight: 500,
        marginVertical: 15,
    },
    transactionView: {
        width: WIDTH,
        height: HEIGHT * 0.6,
    },
    momoImage: {
        width: WIDTH * 0.9,
        height: HEIGHT * 0.6,
        marginHorizontal: WIDTH * 0.05
    },
    transactionButton: {
        width: WIDTH * 0.8,
        fontSize: 30,
        padding: 5,
        borderRadius: 15,
        marginHorizontal: WIDTH * 0.1,
        marginVertical: HEIGHT * 0.05,
        color: "white",
        textAlign: "center",
        backgroundColor: "#61a400",
    }
});

export default Transaction