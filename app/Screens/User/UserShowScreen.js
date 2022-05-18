import React, {useContext} from 'react';
import {View, Text, FlatList, RefreshControl, Pressable} from 'react-native';
import AppContainer from '../../AppContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';
import tw from '../../../tailwind';
import FastImage from 'react-native-fast-image';
import {getProduct} from '../../Redux/actions';

export default function () {
  const {user, pageTitle} = useSelector(state => state);
  const {trans, getLocalized, textColor, getThumb} = useContext(AppContext);
  const dispatch = useDispatch();
  const {element, products, categories} = user;

  const fetchMore = () => console.log('fetchMore');

  return (
    <AppContainer>
      <View style={tw.style`min-h-screen p-5 pb-60`}>
        <Text>UserShow - {element[getLocalized()]}</Text>

        <View style={tw`w-full p-2 rounded-md mb-2`}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={products}
            numColumns={3}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.1}
            columnWrapperStyle={tw`justify-between mb-4`}
            ListHeaderComponent={
              <Text style={tw`${textColor} mb-3 text-lg`}>
                {trans(pageTitle)}
              </Text>
            }
            renderItem={({item}) => (
              <Pressable
                style={tw`justify-start items-center mb-2`}
                onPress={() => dispatch(getProduct(item.id))}>
                <FastImage
                  source={{uri: getThumb(item.image)}}
                  style={tw`w-25 h-30 ml-2 rounded-md mb-3 items-center`}
                  resizeMode={'cover'}
                />
                <Text style={tw`${textColor} text-center`}>
                  {item[getLocalized()]}
                </Text>
              </Pressable>
            )}
          />
        </View>
      </View>
    </AppContainer>
  );
}
