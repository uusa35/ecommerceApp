import React, {useContext, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import tw from '../../../tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';

export default function () {
  const {contentBgColor, textColor, currentFont} = useContext(AppContext);
  const {toastMessage} = useSelector(state => state);
  const dispatch = useDispatch();
  const toastConfig = {
    /*
              Overwrite 'success' type,
              by modifying the existing `BaseToast` component
            */
    success: props => (
      <BaseToast
        {...props}
        style={tw.style(
          `bg-gray-100/90  shadow-lg rounded-md border-r-8 border-green-600 h-20 z-50`,
        )}
        contentContainerStyle={tw.style(
          `opacity-80 border border-gray-100 z-50`,
        )}
        text1Style={tw.style(
          `text-red-800 ${currentFont} text-left mb-1 text-lg`,
        )}
        text2Style={tw.style(
          `text-red-600 ${currentFont} text-left mb-1 text-md`,
        )}
      />
    ),
    /*
              Overwrite 'error' type,
              by modifying the existing `ErrorToast` component
            */
    error: props => (
      <ErrorToast
        {...props}
        style={tw.style(
          `bg-gray-100/90  shadow-lg rounded-md border-r-8 border-red-600 h-20`,
        )}
        contentContainerStyle={tw.style(`border border-gray-50 rounded-md`)}
        text1Style={tw.style(
          `text-red-800 ${currentFont} text-left mb-1 text-lg`,
        )}
        text2Style={tw.style(
          `text-red-600 ${currentFont} text-left mb-1 text-md`,
        )}
      />
    ),

    info: props => (
      <ErrorToast
        {...props}
        style={tw.style(
          `bg-gray-100/90  shadow-lg rounded-md border-r-8 border-orange-600 h-20`,
        )}
        contentContainerStyle={tw.style(`boårder border-gray-50 rounded-md`)}
        text1Style={tw.style(
          `text-red-800 ${currentFont} text-left mb-1 text-lg`,
        )}
        text2Style={tw.style(
          `text-red-600 ${currentFont} text-left mb-1 text-md`,
        )}
      />
    ),
    /*
              Or create a completely new type - `tomatoToast`,
              building the layout from scratch.

              I can consume any custom `props` I want.
              They will be passed when calling the `show` method (see below)
            */
    tomatoToast: ({text1, text2, props}) => (
      <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
        <Text>{text1}</Text>
        <Text>{text2}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <Toast
      config={toastConfig}
      position={`top`}
      topOffset={120}
      // bottomOffset={150}
      onHide={() => dispatch({type: 'HIDE_TOAST_MESSAGE'})}
      onPress={() => Toast.hide()}
      useNativeDriver={true}
      visibilityTime={2000}
    />
  );
}
