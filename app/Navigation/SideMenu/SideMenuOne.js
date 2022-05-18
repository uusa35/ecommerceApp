import React, {useContext} from 'react';
import {View, ScrollView, Text, Pressable} from 'react-native';
import {logout, toggleLang} from '../../Redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import tw from './../../../tailwind';
import {navigate} from '../../RootNavigation';
import {AppContext} from '../../Context/AppContext';

const SideMenuOne = () => {
  const {locale, auth} = useSelector(state => state);
  const {trans, currentFont, contentBgColor, textColor} =
    useContext(AppContext);
  const dispatch = useDispatch();

  const handleChangeLang = () => dispatch(toggleLang());

  return (
    <ScrollView style={[tw`border-2 h-full pt-30 ${contentBgColor}`]}>
      <View style={tw`px-2`}>
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('home')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('home')}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleChangeLang()}
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans(locale.otherLang)}
          </Text>
        </Pressable>
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('cart_index')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('cart')}
          </Text>
        </Pressable>
        {!(auth && auth.id) ? (
          <>
            <Pressable
              style={[
                tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
              ]}
              onPress={() => navigate('login')}>
              <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
                {trans('login')}
              </Text>
            </Pressable>
            <Pressable
              style={[
                tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
              ]}
              onPress={() => navigate('register')}>
              <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
                {trans('new_user')}
              </Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[
              tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
            ]}
            onPress={() => dispatch(logout())}>
            <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
              {trans('register')} {trans('logout')}
            </Text>
          </Pressable>
        )}
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('terms')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('terms')}
          </Text>
        </Pressable>
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('policies')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('policies')}
          </Text>
        </Pressable>
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('contactus')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('contactus')}
          </Text>
        </Pressable>
        <Pressable
          style={[
            tw`h-10 justify-center border-b border-gray-300 dark:border-white px-3 shadow-md rounded-md`,
          ]}
          onPress={() => navigate('faq')}>
          <Text style={[tw`${textColor} ${currentFont} capitalize`]}>
            {trans('faqs')}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default React.memo(SideMenuOne);
