import tw from '../../../../../tailwind';
import {getSearchUsers} from '../../../../Redux/actions';
import FastImage from 'react-native-fast-image';
import {Pressable, Text} from 'react-native';
import React, {useContext} from 'react';
import {AppContext} from '../../../../Context/AppContext';
import {useDispatch} from 'react-redux';

export default function ({c, type = 'product'}) {
  const {getLocalized, getThumb, textColor} = useContext(AppContext);
  const dispatch = useDispatch();

  const handleClick = () => {
    switch (type) {
      case 'user':
        return dispatch(
          getSearchUsers({
            params: {category_id: c.id},
            title: c[getLocalized()],
          }),
        );
      case 'product':
        console.log('product');
      default:
        console.log('product');
    }
  };

  return (
    <Pressable
      style={tw`flex flex-col flex-1 justify-between items-center w-40`}
      key={c.id}
      onPress={() => handleClick()}>
      <FastImage
        source={{uri: getThumb(c.image)}}
        style={tw`w-40 h-25 ml-2 rounded-md mb-2 shadow-lg`}
        resizeMode={'cover'}
      />
      <Text style={tw`${textColor} text-center my-2`}>{c[getLocalized()]}</Text>
    </Pressable>
  );
}
