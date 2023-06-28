import * as React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

import PremiumIcon from "../../assets/premium/premium.png";
import EfoodIconIcon from "../../assets/PremiumIcon.png";
import BackIcon from "../../assets/premium/x.png";
import frame from "../../assets/premium/frame.png";
import check from "../../assets/premium/checkIcon.png";
import option from "../../assets/premium/option.png";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const BuyPremium = () => {

    const navigation = useNavigation()

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
    }
});

export default BuyPremium