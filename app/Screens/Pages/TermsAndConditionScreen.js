import React, {useContext} from 'react';
import {Text} from 'react-native';
import AppContainer from '../../AppContainer';
import {AppContext} from '../../Context/AppContext';
import tw from './../../../tailwind';
import {useSelector} from 'react-redux';

export default function () {
  const {titleOneClass, trans, currentFont, textColor} = useContext(AppContext);
  const {pageTitle} = useSelector(state => state);
  return (
    <AppContainer>
      <Text style={tw`${textColor}`}>{trans(pageTitle)}</Text>
    </AppContainer>
  );
}
