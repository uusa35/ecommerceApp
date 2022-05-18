import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import {Pressable, Text, View, FlatList, RefreshControl} from 'react-native';
import AppContainer from '../../AppContainer';
import {AppContext} from '../../Context/AppContext';
import tw from './../../../tailwind';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {getUsers, getUser, getSearchUsers} from '../../Redux/actions';
import RoundedUserWidget from '../Components/widgets/user/RoundedUserWidget';

export default function ({route}) {
  const {trans, textColor, currentFont, getThumb, getLocalized, mainColor} =
    useContext(AppContext);
  const {pageTitle, isLoading} = useSelector(state => state);
  const dispatch = useDispatch();
  const {elements, params} = route.params;

  const fetchMore = () => console.log('fetchMore');

  const handleRefresh = () =>
    dispatch(getSearchUsers({params: params ? params : {}}));

  return (
    <AppContainer>
      <FlatList
        style={tw.style`min-h-screen pb-60 m-3`}
        contentContainerStyle={tw.style``}
        columnWrapperStyle={tw`justify-between mb-4 w-full`}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={handleRefresh}
            tintColor={tw.color(`text-${mainColor}-900`)}
            title={trans('loading')}
            titleColor={tw.color(`text-${mainColor}-900`)}
          />
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={elements.data}
        numColumns={2}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <Text style={tw`${textColor} ${currentFont} mb-3 text-lg`}>
            {trans(pageTitle)}
          </Text>
        }
        renderItem={({item}) => <RoundedUserWidget u={item} key={item.id} />}
      />
    </AppContainer>
  );
}
