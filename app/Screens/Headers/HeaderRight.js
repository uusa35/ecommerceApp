import React, {useContext} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';
import {useSelector} from 'react-redux';
import tw from './../../../tailwind';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CurrenciesModal from '../Components/modals/CurrenciesModal';

const HeaderRight = props => {
  const {isDarkMode, changeTheme, textColor} = useContext(AppContext);
  const {navigate} = useNavigation();
  const {settings} = useSelector(state => state);

  return (
    <View style={tw`flex flex-row justify-between items-center w-16`}>
      {settings.enable_cart && (
        <MaterialIcons
          name={`shopping-bag`}
          size={30}
          color="#900"
          style={tw`${textColor}`}
          onPress={() => navigate('cart')}
        />
      )}
      {/*{settings.theme == 'none' && (*/}
      <MaterialIcons
        name={`${isDarkMode ? `lightbulb` : `lightbulb-outline`}`}
        size={25}
        style={tw`${textColor}`}
        onPress={() => changeTheme()}
      />
      {/*)}*/}
    </View>
  );
};

export default HeaderRight;
