import React, {useContext} from 'react';
import HomeOneScreen from '../Screens/Home/HomeOneScreen';
import ProductIndexScreen from '../Screens/Product/ProductIndexScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainDrawer from './MainDrawer';
import BottomTabStack from './BottomTabStack';
import TermsAndConditionScreen from '../Screens/Pages/TermsAndConditionScreen';
import PoliciesScreen from '../Screens/Pages/PoliciesScreen';
import {Text, View} from 'react-native';
import {AppContext} from '../Context/AppContext';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HeaderLeft from '../Screens/Headers/HeaderLeft';
import HeaderRight from '../Screens/Headers/HeaderRight';
import HeaderTitle from '../Screens/Headers/HeaderTitle';
import CartIndexScreen from '../Screens/Cart/CartIndexScreen';
import {HeaderBackground} from '@react-navigation/elements';
import tw from './../../tailwind';
import ContactusScreen from '../Screens/Pages/ContactusScreen';
import FaqScreen from '../Screens/Pages/FaqScreen';
import ProductShowScreen from '../Screens/Product/ProductShowScreen';
import UserIndexScreen from '../Screens/User/UserIndexScreen';
import UserShowScreen from '../Screens/User/UserShowScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import CategoryIndexScreen from '../Screens/Category/CategoryIndexScreen';
import UserSearchIndexScreen from '../Screens/User/UserSearchIndexScreen';
import ForgetPasswordScreen from '../Screens/Auth/ForgetPasswordScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {textColor, contentBgColor} = useContext(AppContext);

  return (
    <Stack.Navigator
      initialRouteName={'BottomTabStack'}
      // screenOptions={{headerShown: false}}
      screenOptions={({navigation, route}) => ({
        // headerTitle: props => <HeaderTitle {...props} />,
        headerLeft: props => <HeaderLeft {...props} />,
        headerRight: props => <HeaderRight {...props} />,
        headerBackground: () => (
          <HeaderBackground style={tw`${contentBgColor} ${textColor}`} />
        ),
      })}>
      <Stack.Screen
        name="BottomTabStack"
        component={BottomTabStack}
        options={({route}) => ({headerTitle: () => <HeaderTitle />})}
      />
      <Stack.Screen
        name="product_index"
        component={ProductIndexScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="product_show"
        component={ProductShowScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="user_search"
        component={UserSearchIndexScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="user_index"
        component={UserIndexScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="user_show"
        component={UserShowScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="category_index"
        component={CategoryIndexScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="terms"
        component={TermsAndConditionScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="policies"
        component={PoliciesScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="cart_index"
        component={CartIndexScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="contactus"
        component={ContactusScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="faq"
        component={FaqScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
      <Stack.Screen
        name="forget_password"
        component={ForgetPasswordScreen}
        options={({route}) => ({
          headerTitle: () => <HeaderTitle />,
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
