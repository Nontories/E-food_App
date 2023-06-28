import { SafeAreaView } from 'react-native-safe-area-context';

import Intro from "./components/screens/Intro";
import SignIn from "./components/screens/SignIn";
import Login from "./components/screens/Login";
import Otp from "./components/screens/Otp";
import Register from "./components/screens/Register";

import Home from "./components/screens/Home";
import Settings from "./components/screens/Settings";
import Chat from "./components/screens/Chat";
import BuyPremium from "./components/screens/buyPremium";
import Premium from "./components/screens/Premium";

import Eatery from "./components/screens/Eatery"
import Review from "./components/screens/Review";
import SearchResult from "./components/screens/SearchResult";

import { UserProvider } from "./context/UserContext"

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      < UserProvider >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Intro"
              component={Intro}
              options={{
                title: "Intro",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                title: "SignIn",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                title: "Login",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{
                title: "otp",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: "Register",
                headerShown: false,
              }}
            />

            {/* 4 main page */}

            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                title: "Settings",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={{
                title: "Chat",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BuyPremium"
              component={BuyPremium}
              options={{
                title: "BuyPremium",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Premium"
              component={Premium}
              options={{
                title: "Premium",
                headerShown: false,
              }}
            />

            {/* home child pages */}

            <Stack.Screen
              name="Eatery"
              component={Eatery}
              options={{
                title: "Eatery",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Review"
              component={Review}
              options={{
                title: "Review",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResult}
              options={{
                title: "SearchResult",
                headerShown: false,
              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider >
    </SafeAreaView>

  );
}
