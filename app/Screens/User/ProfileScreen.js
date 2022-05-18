import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import AppContainer from '../../AppContainer';
import tw from '../../../tailwind';
import {AppContext} from '../../Context/AppContext';

export default function () {
  const {textColor, trans} = useContext(AppContext);
  return (
    <AppContainer>
      <View style={tw.style`min-h-screen p-5 pb-60`}>
        <Text style={tw`${textColor}`}>{trans('profile')}</Text>
      </View>
    </AppContainer>
  );
}
