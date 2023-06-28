import React from "react";
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import SearchBar from "../SearchBar";
import SliderCard from "../SliderCard";
import DishCarosel from "../dishCarosel";

import TabNavigate from "../TabNavigate";



// konosuba2324@gmail.com

const Home = () => {
    return (
        <View style={{
            flex: 1
        }}>
                <SearchBar value={""} />
                <View >
                    <SliderCard/>
                </View>
                <View>
                    <DishCarosel />
                </View>
                <TabNavigate />
        </View>
    )
}

export default Home