import React, {createContext, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {appUrl} from '../env';
import tw from '../../tailwind';
import {useDeviceContext, useAppColorScheme} from 'twrnc';

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
  const {locale, settings, translations} = useSelector(state => state);
  const {lang} = locale;
  useDeviceContext(tw, {withDeviceColorScheme: false});
  const [colorScheme, toggleColorScheme, setColorScheme] =
    useAppColorScheme(tw);

  useMemo(() => {
    setColorScheme(settings.theme === 'none' ? 'light' : settings.theme);
  }, []);

  const context = {
    trans: name => (translations[name] ? translations[name][lang] : name),
    getLocalized: (element = 'name') =>
      lang === 'ar' ? `${element}_ar` : `${element}_en`,
    getAsset: (element, type = 'png') => `${appUrl}/images/${element}.${type}`,
    getThumb: element =>
      `${appUrl}/storage/uploads/images/thumbnail/${element}`,
    getMedium: element => `${appUrl}/storage/uploads/images/medium/${element}`,
    getLarge: element => `${appUrl}/storage/uploads/images/large/${element}`,
    getFileUrl: element => `${appUrl}/storage/uploads/files/${element}`,
    changeTheme: () => toggleColorScheme(),
    isDarkMode: colorScheme === 'dark',
    appUrl: appUrl,
    classNames: (...classes) => classes.filter(Boolean).join(' '),
    currentFont: locale.isRTL ? settings.app_font_ar : settings.app_font_en,
    textColor: `text-${
      settings.main_theme_color
    }-900 dark:text-white font-extrabold text-shadow dark:text-shadow-none  capitalize ${
      locale.isRTL ? settings.app_font_ar : settings.app_font_en
    } text-left`,
    mainBgColor: `bg-transparent`,
    contentBgColor: `bg-white dark:bg-${settings.main_theme_bg_color}-900`,
    mainColor: settings.main_theme_color,
    bgColor: `bg-${settings.main_theme_bg_color}-100 dark:bg-${settings.main_theme_bg_color}-600`,
    btnClass: `my-2 p-3 rounded-sm text-${settings.main_theme_color}-900 dark:text-white bg-${settings.main_theme_bg_color}-300 dark:bg-${settings.main_theme_bg_color}-600 hover:bg-${settings.main_theme_bg_color}-400 dark:hover:bg-${settings.main_theme_bg_color}-400 dark:hover:text-white  hover:text-white font-extrabold capitalize`,
    btnTextColor: `text-${
      settings.main_theme_color
    }-900 dark:text-white font-extrabold text-shadow dark:text-shadow-none  capitalize ${
      locale.isRTL ? settings.app_font_ar : settings.app_font_en
    } text-center`,
    headerColor: settings.header_theme_color,
    menuTextColor: `text-${settings.header_theme_color}-900 dark:text-white hover:text-${settings.header_theme_color}-800 dark:hover:text-${settings.header_theme_color}-600 capitalize font-extrabold text-shadow-md dark:text-shadow-lg`,
    footerTextColor: `text-${settings.footer_theme_color}-800 dark:text-white hover:text-${settings.footer_theme_color}-400 capitalize font-extrabold text-shadow-md dark:text-shadow-lg`,
    headerBgColor: settings.header_theme_bg,
    footerColor: settings.footer_theme_color,
    footerBgColor: settings.footer_bg_theme_color,
    inputClass: `appearance-none block w-full px-3 py-2 mb-3 border border-${settings.main_theme_color}-300 h-10 rounded-sm shadow-sm text-${settings.main_theme_color}-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`,
  };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export {AppContext, AppContextProvider};
