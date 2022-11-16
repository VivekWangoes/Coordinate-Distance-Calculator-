import { Box, Button, Heading, NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import * as Location from "expo-location"


export const Screen1 = (props) => {

    const [errorMsg, setErrorMsg] = useState(null);

    const handleEnable = async () => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            props.navigation.navigate('Screen2')
        })();
    }

    return (
        <NativeBaseProvider>
            <Box marginTop="80%">
                <Heading alignSelf="center">Please Enable Location</Heading>
                <Box maxWidth="200px" marginTop="10%" marginLeft="24%">
                    <Button testID="enableButton"
                        onPress={() => handleEnable()}
                        backgroundColor="#14ae5c" size="lg">Enable</Button>
                </Box>
            </Box>

        </NativeBaseProvider>

    )
}

