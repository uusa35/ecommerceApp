import React, {useContext, useMemo} from 'react';
import {Pressable, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';
import tw from './../../../tailwind';
import {useSelector} from 'react-redux';
import Animated, {
  AnimatedLayout,
  FadeInRight,
  FadeOutLeft,
  FadeIn,
} from 'react-native-reanimated';

const HeaderTitle = props => {
  const {trans, textColor} = useContext(AppContext);
  const navigation = useNavigation();
  const {pageTitle} = useSelector(state => state);

  // useMemo(() => {
  //     navigation.setOptions({title: pageTitle})
  // }, []);

  return (
    <Animated.View entering={FadeInRight} exiting={FadeOutLeft}>
      <Pressable onPress={() => navigation.navigate('home')}>
        <Text style={[tw`${textColor}`]}>
          {trans(props.title ? props.title : pageTitle)}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default HeaderTitle;
