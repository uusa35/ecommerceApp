import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';
import {isReadyRef, navigationRef} from '../RootNavigation';
import MainDrawer from './MainDrawer';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {startBootStrap} from '../Redux/actions';
import {I18nManager} from 'react-native';
import {AppContext} from '../Context/AppContext';
import tw from './../../tailwind';
import ToastWidget from '../Screens/Components/ToastWidget';
import LoadingView from '../Screens/Components/LoadingView';
import {useNetInfo} from '@react-native-community/netinfo';

export default function () {
  const {locale, bootStrapped} = useSelector(state => state);
  const {isDarkMode, contentBgColor, trans} = useContext(AppContext);
  const {isConnected} = useNetInfo();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!bootStrapped) {
      dispatch(startBootStrap());
    }
  }, []);

  useMemo(() => {
    I18nManager.forceRTL(locale.isRTL);
  }, [locale.lang]);

  const MyTheme = {
    dark: isDarkMode,
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
      // background: ,
      background: isDarkMode
        ? tw.style(`${contentBgColor}`).backgroundColor
        : tw.color(`bg-gray-100`),
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

  return (
    <>
      {isConnected ? (
        <NavigationContainer
          ref={navigationRef}
          // linking={linking}
          theme={MyTheme}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <MainDrawer />
          <ToastWidget />
        </NavigationContainer>
      ) : (
        <LoadingView title={trans('no_connection')} />
      )}
    </>
  );
}
