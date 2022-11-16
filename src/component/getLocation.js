import * as Location from 'expo-location'

async function currentDistance() {
    const loc = await Location.getCurrentPositionAsync({});
    // console.log('=====compo==========================================', loc);
    return loc
}
export default currentDistance;