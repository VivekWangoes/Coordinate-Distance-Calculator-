import React, { useEffect, useState } from "react";
import { View, Alert, TextInput } from "react-native";
import { NativeBaseProvider, Text, Box, FormControl, Stack, Input, WarningOutlineIcon, Button } from "native-base";
import { getDistance } from "geolib";
import { Audio } from 'expo-av';
import * as Location from "expo-location"

import currentDistance from "../../component/getLocation";

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const Screen2 = ({ route }) => {

    const [location, setLocation] = useState(null);
    const [currentLoc, setCurrentLoc] = useState(null)
    const [sound, setSound] = useState();
    const [distance, setDistance] = useState();
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    const RefreshInterval = 5000;

    const getLocation = async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        setCurrentLoc(currentLocation.coords)


    }

    useEffect(() => {
        getLocation();
    }, [])

    async function playSound() {

        try {
            await Audio.setIsEnabledAsync(true);
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: true,
                allowsRecordingIOS: true,
                // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
            });
            const { sound } = await Audio.Sound.createAsync(require('../../Assets/mp3/beep.mp3'));
            await sound.pauseAsync()
            setTimeout(async () => {
                await sound.playAsync()
                sound.setStatusAsync({ isLooping: true })
            }, 5000)

        } catch (e) {
            console.log('error----', e);
        }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            if (distance >= 1000) {
                console.log('Playing Sound');
                playSound()
            } else {
                const { sound } = await Audio.Sound.createAsync(require('../../Assets/mp3/beep.mp3'));
                await sound.pauseAsync();
            }
        }, RefreshInterval);

        return () => clearInterval(interval);
    }, [distance]);

    const handleSubmit = async () => {
        console.log('handle');
        var dis = getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            // { latitude: 22.7196, longitude: 75.8577 },
            { latitude: lat, longitude: long }
        );
        alert('Distance between source to destination' + ('test', dis))
        // dispatch(getRootDistance(dis))
        setDistance(dis)
    }

    return (
        <NativeBaseProvider initialWindowMetrics={inset}>
            {/* <Text testID="dis">distance</Text> */}
            <Box alignItems="center" marginTop="50%">
                <Box w="100%" maxWidth="340px">
                    <FormControl>
                        <Stack mx="4">
                            <FormControl.Label>Latitude</FormControl.Label>
                            <Input type="text"
                                placeholder="Enter latitude"
                                value={lat}
                                testID='latitude'
                                onChangeText={(t) => setLat(t)}
                                backgroundColor="#fff" />
                        </Stack>
                    </FormControl>
                </Box>
                <Box w="100%" maxWidth="340px" marginTop="6%">
                    <FormControl>
                        <Stack mx="4">
                            <FormControl.Label>Longitude</FormControl.Label>
                            <Input type="text"
                                placeholder="Enter Longitude"
                                value={long}
                                onChangeText={(t) => setLong(t)}
                                backgroundColor="#fff" />
                        </Stack>
                    </FormControl>
                </Box>

            </Box>
            <Box maxWidth="200px" marginTop="10%" marginLeft="24%">
                <Button testID="getDistance"
                    onPress={() => handleSubmit()}
                    backgroundColor="#14ae5c" size="lg">Submit</Button>
            </Box>

        </NativeBaseProvider>
    )
}