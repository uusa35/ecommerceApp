import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideMenuOne from './SideMenu/SideMenuOne';
import HomeStack from './HomeStack';
import BottomTabStack from './BottomTabStack';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const {locale} = useSelector(state => state);
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      drawerPosition={locale.isRTL ? 'right' : 'left'}
      drawerContent={props => <SideMenuOne {...props} showLogo={true} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeStack" component={HomeStack} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
