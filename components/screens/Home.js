import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import SearchBar from "../SearchBar";
import SliderCard from "../SliderCard";
import DishCarosel from "../dishCarosel";

import TabNavigate from "../TabNavigate";

const RatingData = [
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        rating: 4.9,
        price: 20000,
        image: require("../../assets/slider_img.png"),
    },
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        rating: 4.6,
        price: 30000,
        image: require("../../assets/slider_img.png"),
    },
    {
        name: "Bánh mì Thịt nướng",
        locate: "Quận 9",
        rating: 4.5,
        price: 40000,
        image: require("../../assets/slider_img.png"),
    },
]

// konosuba2324@gmail.com

const Home = () => {

    const [topRatingData, setTopRatingData] = useState(RatingData)
    return (
        <View style={{
            flex: 1
        }}>
                <SearchBar value={""} />
                <View >
                    <SliderCard data={topRatingData} />
                </View>
                <View>
                    <DishCarosel />
                </View>
                <TabNavigate />
        </View>
    )
}

export default Home