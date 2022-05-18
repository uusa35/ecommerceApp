import React, {useContext} from 'react';
import {Text, Pressable, FlatList, View, RefreshControl} from 'react-native';
import tw from '../../../tailwind';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../Context/AppContext';
import AppContainer from '../../AppContainer';
import Swiper from 'react-native-swiper';
import {map, take} from 'lodash';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {getProduct, startBootStrap, toggleBootStrap} from '../../Redux/actions';

export default function () {
  const {homeSlides, categories, homeProducts, bootStrapped, locale} =
    useSelector(state => state);
  const {
    trans,
    mainBgColor,
    currentFont,
    getLarge,
    getThumb,
    titleOneClass,
    mainColor,
  } = useContext(AppContext);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(startBootStrap());

  return (
    <AppContainer>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={!bootStrapped}
            onRefresh={handleRefresh}
            tintColor={'white'}
            title={``}
            titleColor="#fff"
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={tw`w-full h-45 rounded-lg mb-3`}>
              <Swiper
                autoplay={true}
                dotColor={tw.color(`text-${mainBgColor}-400`)}
                activeDotColor={tw.color(`text-${mainBgColor}-900`)}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                bounces={true}>
                {map(homeSlides, s => (
                  <Pressable>
                    <FastImage
                      source={{uri: getLarge(s.image)}}
                      style={tw`w-full h-45 rounded-lg`}
                    />
                  </Pressable>
                ))}
              </Swiper>
            </View>
            <View
              style={tw`w-full ltr:bg-black rtl:bg-pink-400 dark:bg-transparent p-2 rounded-md mb-2`}>
              <View style={tw`flex-row justify-between my-3 ltr:bg-gray-400`}>
                <View>
                  <Text style={tw`${titleOneClass + currentFont} text-md`}>
                    {trans('categories')}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigate('category_index', {title: trans('categories')})
                  }
                  style={tw`flex-row`}>
                  <Text
                    style={tw`${titleOneClass + currentFont} ${
                      !locale.isRTL && 'mt-1'
                    } text-xs ltr:mt-2`}>
                    {trans('show_all')}
                  </Text>
                  <Icon
                    name={
                      locale.isRTL ? 'chevron-thin-left' : 'chevron-thin-right'
                    }
                    style={tw`text-black dark:text-white`}
                    size={15}
                  />
                </Pressable>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={categories}
                renderItem={({item}) => (
                  <FastImage
                    source={{uri: getThumb(item.image)}}
                    style={tw`w-25 h-25 ml-2 rounded-md`}
                    resizeMode={'cover'}
                  />
                )}
              />
            </View>
          </>
        }
        data={categories}
        horizontal={false}
        ListFooterComponent={
          <>
            <View
              style={tw`w-full bg-white dark:bg-transparent p-2 rounded-md mb-2`}>
              <View style={tw`flex-row justify-between my-3`}>
                <View>
                  <Text style={tw`${titleOneClass + currentFont} text-md`}>
                    {trans('products')}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    navigate('product_index', {title: trans('products')})
                  }
                  style={tw`flex-row`}>
                  <Text
                    style={tw`${titleOneClass + currentFont} ${
                      !locale.isRTL && 'mt-1'
                    } text-xs ltr:mt-2`}>
                    {trans('show_all')}
                  </Text>
                  <Icon
                    name={
                      locale.isRTL ? 'chevron-thin-left' : 'chevron-thin-right'
                    }
                    style={tw`text-black dark:text-white`}
                    size={15}
                  />
                </Pressable>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={take(homeProducts.data, 10)}
                renderItem={({item, index}) => (
                  <Pressable
                    key={index}
                    onPress={() => dispatch(getProduct(item.id))}>
                    <FastImage
                      source={{uri: getThumb(item.image)}}
                      style={tw`w-20 h-25 ml-2 rounded-md`}
                      resizeMode={'cover'}
                    />
                  </Pressable>
                )}
              />
            </View>
            <View
              style={tw`w-full bg-white dark:bg-transparent p-2 rounded-md mb-2`}>
              <Text style={tw`${titleOneClass + currentFont} my-3 text-lg`}>
                {trans('categories')}
              </Text>
              <FlatList
                columnWrapperStyle={tw`justify-between mb-2`}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={false}
                numColumns={3}
                data={categories}
                renderItem={({item}) => (
                  <FastImage
                    source={{uri: getThumb(item.image)}}
                    style={tw`w-25 h-25 ml-2 rounded-md`}
                    resizeMode={'cover'}
                  />
                )}
              />
            </View>
          </>
        }
      />
    </AppContainer>
  );
}
