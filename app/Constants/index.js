import React from 'react';
import {Platform, Dimensions} from 'react-native';
export const {height, width} = Dimensions.get('window');
export const isIOS = Platform.OS === 'ios' ? true : false;
export const appName = 'ecommerce';
