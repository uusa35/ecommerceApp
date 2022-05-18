import React, {useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';
import tw from '../../../tailwind';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import CurrenciesModal from '../Components/modals/CurrenciesModal';
import {showCurrenciesModal} from '../../Redux/actions';

const HeaderLeft = props => {
  const {textColor} = useContext(AppContext);
  const {locale} = useSelector(state => state);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBack = () =>
    props.canGoBack
      ? navigation.goBack()
      : navigation.dispatch(DrawerActions.openDrawer());

  return (
    <View style={tw`flex flex-row justify-between items-center w-16`}>
      {props.canGoBack ? (
        <Icon
          name={
            locale.isRTL ? `chevron-forward-outline` : `chevron-back-outline`
          }
          size={34}
          style={tw`${textColor}`}
          onPress={() => handleBack()}
        />
      ) : (
        <>
          <Icon
            name={`md-menu-outline`}
            size={34}
            style={tw`${textColor}`}
            onPress={() => handleBack()}
          />
          <Icon
            name={`md-language`}
            size={25}
            style={tw`${textColor}`}
            onPress={() => dispatch(showCurrenciesModal())}
          />
        </>
      )}
      <CurrenciesModal />
    </View>
  );
};

export default HeaderLeft;
