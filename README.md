# Coordinate-Distance-Calculator-
## Project Description
        -  The app developed using Expo SDK 46.
        -  Native base used for UI components.
        -  When app is opened/foregrounded it will ask for Location permission if not granted already.
        -  When pressing submit on Screen 2 an Alert will show with the distance in Meters between your current position and the set of coordinates entered.
        -  Distance will calculated as a straight line to the coordinates.
        -  Added some unit tests using Jest. (We used @testing-library/react-native for rendering).
        -  If distance is greater than 1000 mts a sound (any sound you like) will be play in every 5 seconds even if app is in background mode.
        -  Sound will stop if distance calculated is less than 1000 mts.

## Installation
### For Android
        - yarn install
        - npm install
        - expo start --android
### For IOS
    - npm install
    - cd ios
    - pod install
    - npx expo start --ios
## APK link
    - https://drive.google.com/file/d/1cvzxjdTDJIoMEVZNMnIG1GqvwXQAP828/view?usp=share_link