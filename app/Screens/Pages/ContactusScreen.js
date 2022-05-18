import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import AppContainer from '../../AppContainer';
import tw from '../../../tailwind';

export default function () {
  return (
    <AppContainer>
      <ScrollView style={tw.style`min-h-screen p-2 pb-60`}>
        <Text>ContactusScreen</Text>
      </ScrollView>
    </AppContainer>
  );
}
