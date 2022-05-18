import React, {useContext} from 'react';
import {View, Text, ScrollView, Pressable, TextInput} from 'react-native';
import AppContainer from '../../AppContainer';
import tw from '../../../tailwind';
import {AppContext} from '../../Context/AppContext';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from '../../Redux/actions';

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
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      mobile: '',
    },
  });

  return (
    <AppContainer>
      <ScrollView
        style={tw.style`min-h-screen`}
        contentContainerStyle={tw`h-full flex justify-start`}>
        <View style={tw`${contentBgColor} flex flex-col justify-start`}>
          <View style={tw`flex items-center w-full`}>
            <FastImage
              style={tw`h-20 w-20 shadow-md rounded-sm`}
              source={{uri: getThumb(settings.image)}}
              resizeMode={'cover'}
            />
            <View
              style={tw`mt-6 text-center text-3xl font-extrabold ${textColor}`}>
              <Text style={tw`${textColor} text-lg`}>{trans('register')}</Text>
            </View>
          </View>

          <View style="tt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <View
              style={tw`${mainBgColor}  py-8 px-4 shadow-lg sm:rounded-lg sm:px-10`}>
              <View style={tw`space-y-6`}>
                {/* name */}
                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('name')}*
                    </Text>
                    {errors.name && (
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
                          keyboardType={`default`}
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="name"
                    />
                  </View>
                </View>

                {/* email */}
                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('email')}*
                    </Text>
                    {errors.email && (
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
                          keyboardType={`default`}
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

                {/* password */}
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
                          keyboardType={`default`}
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="password"
                    />
                  </View>
                </View>

                {/* password_confirmation */}
                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('password_confirmation')}*
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
                          keyboardType={`default`}
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="password_confirmation"
                    />
                  </View>
                </View>

                {/* mobile */}
                <View>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`block text-sm font-medium ${textColor}`}>
                      {trans('mobile')}*
                    </Text>
                    {errors.mobile && (
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
                          keyboardType={`default`}
                          style={tw`${inputClass}`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                      name="mobile"
                    />
                  </View>
                </View>

                <View style={tw`mt-4`}>
                  <Pressable
                    onPress={handleSubmit(data => dispatch(getAuth(data)))}
                    style={tw`${btnClass}`}>
                    <Text style={tw`${btnTextColor}`}>{trans('register')}</Text>
                  </Pressable>
                  {settings.enable_register ? (
                    <View>
                      <Pressable
                        onPress={() => navigate('login')}
                        style={tw`${btnClass}`}>
                        <Text style={tw`${btnTextColor}`}>
                          {trans('already_a_user_login_to_ur_account')}
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
