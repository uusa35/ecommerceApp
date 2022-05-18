import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AppContainer from '../../AppContainer';

export default function () {
  const route = useRoute();
  console.log('the route', route);
  return (
    <AppContainer>
      <Text>PoliciesScreen</Text>
    </AppContainer>
  );
}
