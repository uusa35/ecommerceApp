import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {View, StatusBar, Text, KeyboardAvoidingView} from 'react-native';
import tw from '../tailwind';
import {AppContext} from './Context/AppContext';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {disableBootStrapped, setPageTitle} from './Redux/actions';
import {has} from 'lodash';
import Animated, {
  AnimatedLayout,
  SlideInRight,
  SlideInLeft,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import {isIOS} from './Constants';

const AppContainer = ({children}) => {
  const {theme, isDarkMode, contentBgColor} = useContext(AppContext);
  const {locale} = useSelector(state => state);
  const route = useRoute();
  const dispatch = useDispatch();
  const appContainerRender = useRef(1);
  const {bootStrapped, toastMessage} = useSelector(state => state);
  const pageTitle =
    route.params && has(route.params, 'title')
      ? route.params.title
      : route.name;

  useFocusEffect(
    useCallback(() => {
      dispatch(setPageTitle(pageTitle));
      if (!bootStrapped) {
        setTimeout(() => dispatch(disableBootStrapped()), 2000);
      }
    }, []),
  );

  // console.log('renderAppContainer =>', appContainerRender.current);

  return (
    <Animated.View
      entering={locale.isRTL ? FadeInLeft : FadeInRight}
      style={tw`${theme} h-full ${contentBgColor} m-4 rounded-md`}>
      <StatusBar barStyle={isDarkMode ? `light-content` : `dark-content`} />
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={isIOS === 'ios' ? 10 : 0}
        contentContainerStyle={{marginBottom: 30}}
        style={tw`flex`}>
        {children}
      </KeyboardAvoidingView>
    </Animated.View>
  );
};

export default React.memo(AppContainer);
