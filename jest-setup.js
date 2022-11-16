import { jest } from "@jest/globals"

jest.mock("expo-location");

jest.mock("react-native-permissions", () =>
    require("react-native-permissions/mock")
)

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = ({ children }) => children;
    return { KeyboardAwareScrollView };
});