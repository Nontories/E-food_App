import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacityn, Dimensions, ScrollView } from "react-native";

import star from "../assets/home/Star.png"
import sliderImage from "../assets/slider_img.png"

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const RatingData = [
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        voteRating: 4.9,
        price: 20000,
        image: require("../assets/slider_img.png"),
    },
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        voteRating: 4.6,
        price: 30000,
        image: require("../assets/slider_img.png"),
    },
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        voteRating: 4.5,
        price: 40000,
        image: require("../assets/slider_img.png"),
    },
]

const SliderCard = (route) => {
    const [data, setData] = useState(RatingData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        fetch("http://efood.somee.com/api/Home")
        .then((response) => response.json())
        .then((jsonData) => { setData(jsonData.slider) })
        .catch((error) => {
            console.error(error);
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate the index of the next item
            const nextIndex = currentIndex === data.length ? 0 : currentIndex + 1;
            setCurrentIndex(nextIndex);

            // Scroll to the next item
            scrollViewRef.current.scrollTo({ x: nextIndex * WIDTH, animated: true });
        }, 3000); // Change the duration (in milliseconds) to adjust the auto slide speed

        return () => {
            // Clean up the interval on component unmount
            clearInterval(interval);
        };
    }, [currentIndex, data.length, styles.card.width]);

    const onchange = (event) => {
        // Calculate the index of the currently visible item based on scroll position
        const contentOffset = event.contentOffset.x;
        const index = Math.round(contentOffset / styles.card.width);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.wrap}>
            <ScrollView
                ref={scrollViewRef}
                onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
            >
                {
                    data.map((item, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                <View style={styles.detail}>
                                    <Text style={styles.name} >{item.name}</Text>
                                    <View style={styles.rating}>
                                        <Image
                                            style={styles.star}
                                            source={star}
                                        />
                                        <Text >{item.voteRating}</Text>
                                    </View>
                                    <Text style={styles.price} >{item.price} VND</Text>
                                </View>

                                <Image
                                    resizeMode="stretch"
                                    style={styles.image}
                                    source={sliderImage}
                                />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.25,
    },
    card: {
        flex: 1,
        backgroundColor: "#075985",
        width: WIDTH * 0.8,
        height: HEIGHT * 0.2,
        marginHorizontal: WIDTH * 0.1,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    detail: {
        marginLeft: 10,
        width: 190,
    },
    image: {
        width: 100,
        height: 150,
        transform: [{ translateX: -5 }],
    },
    name: {
        width: 160,
        fontSize: 20,
        transform: [{ translateX: 20 }],
        fontWeight: 700,
        color: "white"
    },
    locate: {
        transform: [{ translateX: 20 }],
        color: "white"
    },
    rating: {
        width: 76,
        height: 30,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        marginTop: 12,
        backgroundColor: "white",
        borderRadius: 5,
    },
    star: {
        width: 15,
        height: 18,
        marginRight: 10,
    },
    price: {
        width: 76,
        height: 30,
        fontSize: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginTop: 1,
        backgroundColor: "white",
        borderRadius: 5,
        textAlign: "center",
        lineHeight: 20,
    }
});

export default SliderCard