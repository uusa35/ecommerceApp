import tw from '../../../../../tailwind';
import {getUser} from '../../../../Redux/actions';
import FastImage from 'react-native-fast-image';
import {Pressable, Text} from 'react-native';
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {AppContext} from '../../../../Context/AppContext';

export default function ({u}) {
  const {getThumb, textColor, currentFont, getLocalized} =
    useContext(AppContext);
  const dispatch = useDispatch();
  return (
    <Pressable
      style={tw`flex flex-col  rounded-md p-2`}
      onPress={() => dispatch(getUser(u.id))}>
      <FastImage
        source={{uri: getThumb(u.image)}}
        style={tw`w-30 h-30 ml-2 rounded-full mb-3 shadow-lg border border-gray-200`}
        resizeMode={'cover'}
      />
      <Text style={tw`${textColor} ${currentFont} text-center`}>
        {u[getLocalized()]}
      </Text>
    </Pressable>
  );
}
