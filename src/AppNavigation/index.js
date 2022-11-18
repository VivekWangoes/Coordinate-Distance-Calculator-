import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Screen1 } from "../Screens/Screen1";
import { Screen2 } from "../Screens/Screen2";
import * as Location from "expo-location"


const Stack = createNativeStackNavigator();
function AppNavigation() {

    const [permission, setPermission] = useState(false)
    useEffect(() => {
        const unsubscribe = getPermission()
        return () => unsubscribe
    }, [])


    const getPermission = async () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                setPermission(true)
            }
        })();
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Screen1" component={Screen1} />
                <Stack.Screen name="Screen2" component={Screen2} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;