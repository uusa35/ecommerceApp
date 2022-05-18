import React, {useContext, useEffect} from 'react';
import {Text, Pressable, FlatList, View, RefreshControl} from 'react-native';
import tw from '../../../tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';
import AppContainer from '../../AppContainer';
import Swiper from 'react-native-swiper';
import {map, filter} from 'lodash';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {
  getProduct,
  startBootStrap,
  toggleBootStrap,
  getProducts,
  getUsers,
  disableBootStrapped,
  getSearchUsers,
} from '../../Redux/actions';
import CategoryWidget from '../Components/widgets/category/CategoryWidget';

export default function () {
  const {
    homeSlides,
    categories,
    homeProducts,
    isLoading,
    bootStrapped,
    locale,
  } = useSelector(state => state);
  const {
    trans,
    mainBgColor,
    currentFont,
    getLarge,
    getThumb,
    titleOneClass,
    getLocalized,
    textColor,
    mainColor,
  } = useContext(AppContext);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(startBootStrap());

  return (
    <AppContainer>
      <FlatList
        // contentInset={{top: 0, bottom: 50, left: 0, right: 0}}
        // contentInsetAdjustmentBehavior="automatic"
        // keyboardDismissMode="none"
        // keyboardShouldPersistTaps="never"
        // horizontal={false}
        // automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // stickyHeaderIndices={[0]}
        // contentContainerStyle={tw.style(`min-h-screen`)}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={tw.color(`text-${mainColor}-800`)}
            title={trans('loading')}
            titleColor={tw.color(`text-${mainColor}-800`)}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={tw`w-full h-40 rounded-lg mb-1`}>
              <Swiper
                autoplay={true}
                dotColor={tw.color(`text-${mainColor}-400`)}
                activeDotColor={tw.color(`text-${mainColor}-900`)}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                bounces={true}>
                {map(homeSlides, s => (
                  <Pressable key={s.id}>
                    <FastImage
                      source={{uri: getLarge(s.image)}}
                      style={tw`w-full h-40 rounded-lg`}
                    />
                  </Pressable>
                ))}
              </Swiper>
            </View>
          </>
        }
        data={categories}
        horizontal={false}
        ListFooterComponent={
          <>
            <View style={tw`w-full rounded-md mb-2`}>
              <Text
                style={tw`${textColor} my-3 text-lg text-center ${currentFont}`}>
                {trans('merchants')}
              </Text>
              <FlatList
                columnWrapperStyle={tw`w-full justify-start items-center my-1`}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                numColumns={2}
                data={filter(categories, c => c.is_parent && c.on_home)}
                renderItem={({item}) => (
                  <CategoryWidget c={item} type={`user`} />
                )}
              />
            </View>
          </>
        }
      />
    </AppContainer>
  );
}
