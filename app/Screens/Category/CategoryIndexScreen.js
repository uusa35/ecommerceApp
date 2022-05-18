import React, {useContext} from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import AppContainer from '../../AppContainer';
import FastImage from 'react-native-fast-image';
import tw from '../../../tailwind';
import {useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';

export default function () {
  const {getThumb, textColor, currentFont, trans, getLocalized} =
    useContext(AppContext);
  const {categories} = useSelector(state => state);

  return (
    <AppContainer>
      <View style={tw`w-full bg-white dark:bg-transparent p-2 rounded-md mb-2`}>
        <Text style={tw`${textColor} my-3 text-lg`}>{trans('categories')}</Text>
        <FlatList
          columnWrapperStyle={tw`justify-between mb-6`}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          numColumns={3}
          data={categories}
          renderItem={({item}) => (
            <Pressable style={tw``}>
              <FastImage
                source={{uri: getThumb(item.image)}}
                style={tw`w-25 h-25 ml-2 rounded-md shadow-md`}
                resizeMode={'cover'}
              />
              <Text style={tw`${textColor} my-3 text-sm text-center shadow-lg`}>
                {item[getLocalized()]}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </AppContainer>
  );
}
