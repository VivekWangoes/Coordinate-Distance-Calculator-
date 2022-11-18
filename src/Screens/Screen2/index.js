import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Text, Box, FormControl, Stack, Input, Button } from "native-base";
import { getDistance } from "geolib";
import { Audio } from 'expo-av';
import * as Location from "expo-location"

const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const Screen2 = () => {

    const [location, setLocation] = useState(null);

    const [distance, setDistance] = useState();
    const [lat, setLat] = useState('22.245678')
    const [long, setLong] = useState('75.245678')

    const RefreshInterval = 5000;
    const getLocation = async () => {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
    }

    useEffect(() => {
        getLocation();
    }, [])

    async function playSound() {
        try {
            await Audio.setIsEnabledAsync(true);
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                shouldDuckAndroid: true,
                playThroughEarpieceAndroid: true,
                allowsRecordingIOS: true,
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
                playSound()
            } else {
                const { sound } = await Audio.Sound.createAsync(require('../../Assets/mp3/beep.mp3'));
                await sound.pauseAsync();
            }
        }, RefreshInterval);

        return () => clearInterval(interval);
    }, [distance]);

    const handleSubmit = async () => {
        var dis = getDistance(
            { latitude: location.latitude, longitude: location.longitude },
            { latitude: lat, longitude: long }
        );
        alert('Distance between source to destination' + ('test', dis))
        setDistance(dis)
    }

    return (
        <NativeBaseProvider initialWindowMetrics={inset}>
            <Box alignItems="center" marginTop="30%">
                <Text fontSize="2xl">Destination</Text>
            </Box>
            <Box alignItems="center" marginTop="20%">
                <Box w="100%" maxWidth="340px">
                    <FormControl>
                        <Stack mx="4">
                            <FormControl.Label>Latitude</FormControl.Label>
                            <Input type="text"
                                placeholder="Enter latitude"
                                value={lat}
                                testID='latitude'
                                onChangeText={(t) => setLat(t)}
                                keyboardType="decimal-pad"
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
                                keyboardType="decimal-pad"
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