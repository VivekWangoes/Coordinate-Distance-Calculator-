import React, { useEffect } from "react"
import { Screen2 } from "../Screen2";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native"
import { getDistance } from "geolib";
import * as Location from "expo-location"
import currentDistance from "../../component/getLocation";
import { check } from "react-native-permissions";


describe("<Screen2 />", async () => {

    it('Render default elements', () => {
        const { getByTestId, getByPlaceholderText } = render(<Screen2 />);

        getByTestId('getDistance')
        getByPlaceholderText('Enter latitude');
        getByPlaceholderText('Enter Longitude');

        expect(getByPlaceholderText('Enter latitude')).not.toBeNull()
        expect(getByPlaceholderText('Enter Longitude')).not.toBeNull()
    });

    it('Show invalid inputs messages', async () => {


        const { getByTestId, getByPlaceholderText } = render(<Screen2 />);
        // const loc = await currentDistance()
        // console.log('===================================================================', loc);

        const lat = 37.4220936
        const long = -122.083922
        fireEvent.changeText(getByPlaceholderText('Enter latitude'), "22.245678")
        fireEvent.changeText(getByPlaceholderText('Enter Longitude'), "75.245678")
        fireEvent.press(getByTestId('getDistance'))

        const test = await screen.findByPlaceholderText("Enter latitude")
        const test1 = await screen.findByPlaceholderText("Enter Longitude")
        const loc1 = test.props.value
        const long1 = test1.props.value

        // const dis = getDistance(
        //     { latitude: lat, longitude: long },
        //     { latitude: loc1, longitude: long1 }
        // );
        // const loc = Location.getCurrentPositionAsync({})
        // expect((await loc)).toHaveBeenCalledTimes(1)

        // console.log("Diffrence----------", (await loc));

        // await waitFor(() => {
        // expect(check).toHaveBeenCalledTimes(1)
        // expect(Location.getCurrentPositionAsync({})).toHaveBeenCalledTimes(1)
        // })

    })
})





