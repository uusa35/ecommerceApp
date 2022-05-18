/**
 * @format
 */

import {AppRegistry, I18nManager} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
I18nManager.allowRTL(true);

AppRegistry.registerComponent(appName, () => App);

// yarn add  @react-navigation/bottom-tabs @react-navigation/drawer @react-navigation/elements @react-navigation/native @react-navigation/native-stack twrnc react-native-swiper react-native-vector-icons yup validate.js react-redux redux-logger redux-saga redux-thunk react-native-share react-native-maps react-native-onesignal react-native-code-push react-native-async-storage react-native-fast-image react-native-toaster react-native-webview react-native-youtube react-native-spinkit react-native-reanimated moment lottie-ios lottie-react-native axios @react-navigation/native
