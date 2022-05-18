import React, {useContext} from 'react';
import tw from '../../../tailwind';
import {ActivityIndicator, View, Text, Pressable} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {AppContext} from '../../Context/AppContext';
import RNRestart from 'react-native-restart';

export default function ({title = ''}) {
  const {isConnected} = useNetInfo();
  const {trans, textColor, btnClass} = useContext(AppContext);

  const handleClick = () => RNRestart.Restart();

  return (
    <View
      style={tw.style(`h-screen flex justify-center items-center flex-col`)}>
      <View>
        <ActivityIndicator />
      </View>
      {title && (
        <View style={tw.style`my-5`}>
          <Text style={tw.style(`${textColor}`)}>{title}</Text>
        </View>
      )}
      {!isConnected && (
        <View style={tw.style`flex flex-col`}>
          <View style={tw.style`my-5`}>
            {/*<Text style={tw.style(`${textColor}`)}>{title}</Text>*/}
          </View>
          <Pressable
            style={tw.style`${btnClass} p-3 rounded-md shadow-md`}
            onPress={() => handleClick()}>
            <Text style={tw.style(`capitalize`)}>{trans('reconnect')}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
