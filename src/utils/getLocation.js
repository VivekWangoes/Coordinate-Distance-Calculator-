import * as Location from 'expo-location'

async function currentDistance() {
    const loc = await Location.getCurrentPositionAsync({});
    return loc
}
export default currentDistance;