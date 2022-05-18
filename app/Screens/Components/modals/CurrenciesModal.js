import React, {useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {hideCurrenciesModal, setCurrency} from '../../../Redux/actions';
import tw from './../../../../tailwind';
import {AppContext} from '../../../Context/AppContext';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';

export default function () {
  const {currenciesModal, currencies} = useSelector(state => state);
  const {trans, getThumb} = useContext(AppContext);
  const dispatch = useDispatch();

  const handleCurrency = c => {
    dispatch(setCurrency(c));
    dispatch(hideCurrenciesModal());
  };

  return (
    <Modal
      isVisible={currenciesModal}
      style={tw`min-h-screen bg-modal-bg justify-center items-center`}>
      <View style={tw`bg-white w-full h-1/3 p-10`}>
        <View style={tw`flex-row flex-wrap justify-center items-center`}>
          {map(currencies, c => (
            <Pressable
              key={c.id}
              style={tw`w-1/3 items-center mb-3 rounded-full `}
              onPress={() => handleCurrency(c)}>
              <FastImage
                source={{uri: getThumb(c.image)}}
                style={tw`w-10 h-10 rounded-full`}
              />
            </Pressable>
          ))}
        </View>
        <Pressable
          style={tw`h-10 bg-gray-100`}
          onPress={() => dispatch(hideCurrenciesModal())}>
          <Text>{trans('close')} </Text>
        </Pressable>
      </View>
    </Modal>
  );
}
