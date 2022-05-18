import React, {useContext} from 'react';
import {Pressable, Text, View, FlatList, RefreshControl} from 'react-native';
import AppContainer from '../../AppContainer';
import {AppContext} from '../../Context/AppContext';
import tw from './../../../tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {take} from 'lodash';
import FastImage from 'react-native-fast-image';
import {getProducts} from '../../Redux/actions';

const ProductIndexScreen = () => {
  const {trans, textColor, currentFont, getThumb, getLocalized} =
    useContext(AppContext);
  const {pageTitle, products} = useSelector(state => state);
  const dispatch = useDispatch();

  const fetchMore = () => console.log('fetchMore');

  const handleRefresh = () => dispatch(getProducts());

  return (
    <AppContainer>
      <View style={tw`w-full p-2 rounded-md mb-2`}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              tintColor={'white'}
              title={``}
              titleColor="#fff"
            />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={products.data}
          numColumns={3}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.1}
          columnWrapperStyle={tw`justify-between mb-4`}
          ListHeaderComponent={
            <Text style={tw`${textColor} ${currentFont} mb-3 text-lg`}>
              {trans(pageTitle)}
            </Text>
          }
          renderItem={({item}) => (
            <Pressable
              style={tw`justify-start`}
              onPress={() => dispatch(getProduct(item.id))}>
              <FastImage
                source={{uri: getThumb(item.image)}}
                style={tw`w-30 h-35 ml-2 rounded-md mb-3`}
                resizeMode={'cover'}
              />
              <Text style={tw`${textColor} ${currentFont} text-center`}>
                {item[getLocalized()]}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </AppContainer>
  );
};

export default ProductIndexScreen;
