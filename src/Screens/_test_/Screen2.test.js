import React from "react"
import { Screen2 } from "../Screen2";
import { fireEvent, render, screen } from "@testing-library/react-native"
import { getDistance } from "geolib";
import { Audio } from 'expo-av';

describe("<Screen2 />", () => {

    var distance;

    it('Render default elements', () => {
        const { getByTestId, getByPlaceholderText } = render(<Screen2 />);

        getByTestId('getDistance')
        getByPlaceholderText('Enter latitude');
        getByPlaceholderText('Enter Longitude');

    });

    it('Show empty field message', async () => {
        const { getByPlaceholderText } = render(<Screen2 />);

        expect(getByPlaceholderText('Enter latitude')).not.toBeNull()
        expect(getByPlaceholderText('Enter Longitude')).not.toBeNull()

    })

    it('Show invalid inputs messages', async () => {
        const { findByPlaceholderText } = render(<Screen2 />);

        const validInput = new RegExp(/^\d*\.?\d*$/)

        const letitude = await findByPlaceholderText("Enter latitude")
        const longitude = await findByPlaceholderText("Enter Longitude")
        const lat = letitude.props.value
        const long = longitude.props.value

        expect(lat).toMatch(validInput)
        expect(long).toMatch(validInput)

    });

    it('Show valid distance', async () => {
        const { getByTestId, getByPlaceholderText } = render(<Screen2 />);

        const lat = 37.4220936
        const long = -122.083922
        fireEvent.changeText(getByPlaceholderText('Enter latitude'), "22.245678")
        fireEvent.changeText(getByPlaceholderText('Enter Longitude'), "75.245678")
        fireEvent.press(getByTestId('getDistance'))

        const test = await screen.findByPlaceholderText("Enter latitude")
        const test1 = await screen.findByPlaceholderText("Enter Longitude")
        const loc1 = test.props.value
        const long1 = test1.props.value

        const dis = getDistance(
            { latitude: lat, longitude: long },
            { latitude: loc1, longitude: long1 }
        );
        distance = dis;
        expect(dis).not.toBeNaN();

    });

})





