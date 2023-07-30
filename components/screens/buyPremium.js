import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { useToast } from "react-native-toast-notifications";

import PremiumIcon from "../../assets/premium/premium.png";
import EfoodIconIcon from "../../assets/PremiumIcon.png";
import BackIcon from "../../assets/premium/x.png";
import frame from "../../assets/premium/frame.png";
import check from "../../assets/premium/checkIcon.png";
import option from "../../assets/premium/option.png";
import SpinnerLoading from "../SpinnerLoading"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BuyPremium = () => {

    const navigation = useNavigation()

    const [data, setData] = useState(null);
    const [selectedButton, setSelectedButton] = useState(1);
    const [transactionData, setTransactionData] = useState(data ? data[0] : null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const toast = useToast();

    const handleButtonPress = (buttonIndex, data) => {
        setSelectedButton(buttonIndex);
        setTransactionData(data)
    };

    const handleSubmit = () => {
        console.log(user);
        if (user ? user.userId : false) {
            navigation.navigate("Transaction", { transaction: transactionData, user: user })
        } else {
            showToast("Đang lấy dữ liệu user, hãy thử lại sau", "warning");
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

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://efood.somee.com/api/Premium/value`)
            .then(response => response.json())
            .then(jsonData => {
                setTransactionData(jsonData[0])
                setData(jsonData.slice(0, 3))
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Home")
                    }}
                >
                    <Image
                        style={styles.backButton}
                        source={BackIcon}
                    />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Image
                        style={styles.efoodIcon}
                        source={EfoodIconIcon}
                    />
                    <Text style={styles.headerText}>
                        E-Food
                    </Text>
                    <Image
                        style={styles.premiumIcon}
                        source={PremiumIcon}
                    />
                </View>
            </View>
            <Text style={styles.title}>
                Let's become shapely
            </Text>
            <View style={styles.content}>
                <Image
                    style={styles.frame}
                    source={frame}
                />
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Tính chỉ số BMI
                    </Text>
                </View>
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Thực đơn hợp lý cho từng cơ thể bạn muốn
                    </Text>
                </View>
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Chatbot trả lời tối ưu
                    </Text>
                </View>
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Giao diện thân thiện, dễ sử dụng
                    </Text>
                </View>
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Phân loại thức ăn theo sở thích của bạn
                    </Text>
                </View>
                <View style={styles.frameContent}>
                    <Image
                        style={styles.check}
                        source={check}
                    />
                    <Text style={styles.contentText}>
                        Nhiều ưu đãi hấp dẫn
                    </Text>
                </View>
            </View>
            <View style={styles.option}>
                <Image
                    style={styles.optionIcon}
                    source={option}
                />
                <Text style={styles.optionText}>
                    Choose 1 option
                </Text>
            </View>
            <View style={styles.chooseOption}>
                <TouchableOpacity
                    onPress={() => handleButtonPress(1, data[0])}
                    style={selectedButton === 1 ? styles.selected : styles.button}
                >
                    <Text style={styles.buttonPeriob} >Loại {data ? data[0].period : null}</Text>
                    <Text style={styles.buttonText} >{data ? data[0].value.toLocaleString('en') : null} đ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleButtonPress(2, data[1])}
                    style={selectedButton === 2 ? styles.selected : styles.button}
                >
                    <Text style={styles.buttonPeriob} >Loại {data ? data[1].period : null}</Text>
                    <Text style={styles.buttonText} >{data ? data[1].value.toLocaleString('en') : null} đ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleButtonPress(3, data[2])}
                    style={selectedButton === 3 ? styles.selected : styles.button}
                >
                    <Text style={styles.buttonPeriob} >Loại {data ? data[2].period : null}</Text>
                    <Text style={styles.buttonText} >{data ? data[2].value.toLocaleString('en') : null} đ</Text>
                </TouchableOpacity>
            </View>
            {!data ?
                <SpinnerLoading />
                :
                <TouchableOpacity
                    onPress={() => { handleSubmit() }}
                >
                    <Text style={styles.buyButton}>Buy Now</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: "white"
    },
    header: {
        height: HEIGHT * 0.14,
        width: WIDTH,
        backgroundColor: "#F0CC10",
    },
    backButton: {
        position: "absolute",
        width: 20,
        height: 20,
        left: 10,
        top: 15,
    },
    headerContent: {
        position: "absolute",
        width: WIDTH,
        top: 30,
        justifyContent: "center",
        flexDirection: "row",
    },
    efoodIcon: {
        position: "absolute",
        top: -15,
        left: 50,
        width: 100,
        height: 100,
    },
    headerText: {
        position: "absolute",
        top: 20,
        left: 160,
        fontSize: 30,
        fontWeight: 700,
        fontStyle: "italic"
    },
    premiumIcon: {
        position: "absolute",
        top: -25,
        left: 240,
        width: 170,
        height: 170,
    },
    title: {
        width: WIDTH,
        marginVertical: 13,
        fontSize: 30,
        fontWeight: 700,
        textAlign: "center",
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 1,
    },
    content: {
        width: WIDTH,
        height: HEIGHT * 0.5,
        justifyContent: "center",
    },
    frame: {
        flex: 1,
        width: WIDTH,
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    frameContent: {
        marginLeft: 40,
        marginVertical: 8,
        alignItems: "center",
        flexDirection: "row",
        transform: [{ translateY: 20 }]
    },
    check: {
        marginHorizontal: 10
    },
    contentText: {
        fontWeight: 500,
        fontSize: 15,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15,
    },
    optionIcon: {

    },
    optionText: {
        fontSize: 25,
        fontWeight: 900,
        marginLeft: 20,
    },
    chooseOption: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    selected: {
        width: WIDTH * 0.25,
        height: HEIGHT * 0.12,
        backgroundColor: "#E9A000",
        borderRadius: 15,
        marginTop: 15,
    },
    button: {
        width: WIDTH * 0.25,
        height: HEIGHT * 0.12,
        backgroundColor: "#FFCC00",
        borderRadius: 15,
        marginTop: 15,
    },
    buttonText: {
        textAlign: "center",
        marginVertical: 10,
        fontWeight: 500,
        fontSize: 18,
    },
    buttonPeriob: {
        textAlign: "center",
        marginVertical: 10,
        fontWeight: 700,
        fontSize: 20,
    },
    buyButton: {
        width: WIDTH * 0.8,
        textAlign: "center",
        fontSize: 35,
        fontWeight: 700,
        borderRadius: 15,
        marginTop: 10,
        marginHorizontal: WIDTH * 0.1,
        backgroundColor: "#FFD600",
    }
});

export default BuyPremium