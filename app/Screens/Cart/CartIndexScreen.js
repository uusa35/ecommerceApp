import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import AppContainer from '../../AppContainer';
import tw from '../../../tailwind';
import {AppContext} from '../../Context/AppContext';
import {map, isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {removeFromCart} from '../../Redux/actions';

export default function () {
  const {textColor, trans, getLocalized, getThumb} = useContext(AppContext);
  const {cart} = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <AppContainer>
      <View style={tw.style`min-h-screen p-5 pb-60`}>
        <Text style={tw`${textColor}`}>{trans('cart')}</Text>
        <View>
          {map(cart.items, element => (
            <View
              key={element.id}
              style={tw`flex flex-row justify-between items-center mb-3 py-3`}>
              {element.image && !isEmpty(element.image) && (
                <FastImage
                  source={{uri: getThumb(element.image)}}
                  style={tw`w-20 h-16 ml-2 rounded-md mb-2 shadow-lg`}
                  resizeMode={'cover'}
                />
              )}
              <Text style={tw`${textColor}`}>{element[getLocalized()]}</Text>
              <Pressable
                onPress={() => dispatch(removeFromCart(element.cart_id))}
                style={tw`w-auto bg-red-600 text-white p-4`}>
                <Text style={tw`${textColor} text-center text-white`}>
                  {trans('remove')}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>
    </AppContainer>
  );
}
