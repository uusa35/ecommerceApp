import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import AppContainer from '../../AppContainer';
import tw from '../../../tailwind';
import {AppContext} from '../../Context/AppContext';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from '../../Redux/actions';
import {isIOS} from '../../Constants';

export default function () {
  const {
    getThumb,
    contentBgColor,
    textColor,
    trans,
    mainBgColor,
    mainColor,
    btnClass,
    btnTextColor,
    inputClass,
  } = useContext(AppContext);
  const {settings} = useSelector(state => state);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <AppContainer>
      <ScrollView
        style={tw.style`min-h-screen`}
        contentContainerStyle={tw`h-full flex justify-center`}>
        <View style={tw`${contentBgColor} flex flex-col justify-center`}>
          <View style={tw`flex items-center w-full`}>
            <FastImage
              style={tw`h-20 w-20 shadow-md rounded-sm`}
              source={{uri: getThumb(settings.image)}}
              resizeMode={'cover'}
            />
            <View
              style={tw`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              <Text style={tw`${textColor} text-lg`}>
                {trans('sign_in_to_ur_account')}
              </Text>
            </View>
          </View>

          <View style="tt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <View
              style={tw`${mainBgColor}  py-8 px-4 shadow-lg sm:rounded-lg sm:px-10`}>
              <View style={tw`space-y-6`}>
                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('email')}*
                    </Text>
                    {errors.password && (
                      <Text
                        style={tw`${textColor} text-red-800 text-sm font-medium`}>
                        {trans('required')}
                      </Text>
                    )}
                  </View>
                  <View style={tw`mt-1`}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          keyboardType={`email-address`}
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="email"
                    />
                  </View>
                </View>

                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('password')}*
                    </Text>
                    {errors.password && (
                      <Text
                        style={tw`${textColor} text-red-800 text-sm font-medium`}>
                        {trans('required')}
                      </Text>
                    )}
                  </View>
                  <View style={tw`mt-1`}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          autoCapitalize="none"
                        />
                      )}
                      name="password"
                    />
                  </View>
                </View>

                <View style={tw`mt-4`}>
                  <Pressable
                    onPress={handleSubmit(data => dispatch(getAuth(data)))}
                    style={tw`${btnClass}`}>
                    <Text style={tw`${btnTextColor}`}>{trans('login')}</Text>
                  </Pressable>
                  {settings.enable_register ? (
                    <View>
                      <Pressable
                        onPress={() => navigate('register')}
                        style={tw`${btnClass}`}>
                        <Text style={tw`${btnTextColor}`}>
                          {trans('register_new_user')}
                        </Text>
                      </Pressable>
                    </View>
                  ) : null}

                  <Pressable onPress={() => navigate('forget_password')}>
                    <Text style={tw`${textColor} text-right mt-3`}>
                      {trans('forget_ur_password')}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}
