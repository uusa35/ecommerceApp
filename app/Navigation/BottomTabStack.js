import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductIndexScreen from '../Screens/Product/ProductIndexScreen';
import {AppContext} from '../Context/AppContext';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {HeaderBackground} from '@react-navigation/elements';
import tw from '../../tailwind';
import CartIndexScreen from '../Screens/Cart/CartIndexScreen';
import ProfileScreen from '../Screens/User/ProfileScreen';
import {appName} from '../Constants';
import istores from '../Screens/Home/istores';
import demo from '../Screens/Home/demo';
import UserIndexScreen from '../Screens/User/UserIndexScreen';
const Tab = createBottomTabNavigator();

export default function () {
  const {trans, mainBgColor, mainColor, textColor, contentBgColor} =
    useContext(AppContext);
  return (
    <Tab.Navigator
      initialRouteName={'home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <HeaderBackground style={tw`${contentBgColor} ${textColor}`} />
        ),
      }}>
      <Tab.Screen
        name="home"
        component={appName == 'istores' ? istores : demo}
        initialParams={{name: `home`}}
        options={({route}) => ({
          // tabBarLabel: () => <HeaderTitle title={trans(route.name)} />,
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? `home` : `home-outline`}
              size={30}
              style={focused ? tw`${textColor}` : tw`${textColor}`}
            />
          ),
        })}
      />
      <Tab.Screen
        name="users"
        component={UserIndexScreen}
        initialParams={{name: 'merchants', params: {active: 1}}}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <EntypoIcon
              name={focused ? `shop` : 'shop'}
              size={30}
              style={
                focused
                  ? tw`text-${mainColor}-900 dark:text-${mainColor}-100`
                  : tw`text-${mainColor}-600 dark:text-${mainColor}-100`
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="cart"
        component={CartIndexScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? `cart-sharp` : 'md-cart-outline'}
              size={34}
              style={
                focused
                  ? tw`text-${mainColor}-900 dark:text-${mainColor}-100`
                  : tw`text-${mainColor}-600 dark:text-${mainColor}-100`
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={({route}) => ({
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? `md-person` : 'md-person-outline'}
              size={30}
              style={
                focused
                  ? tw`text-${mainColor}-900 dark:text-${mainColor}-100`
                  : tw`text-${mainColor}-600 dark:text-${mainColor}-100`
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
