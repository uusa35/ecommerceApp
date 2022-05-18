/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';
import {Store, PersistStore} from './Redux/store';
import MainNavigationContainer from './Navigation/MainNavigationContainer';
import {AppContextProvider} from './Context/AppContext';

export default function App() {
  return (
    <PersistGate loading={<ActivityIndicator />} persistor={PersistStore}>
      <Provider store={Store}>
        <Suspense fallback={<ActivityIndicator />}>
          <AppContextProvider>
            <MainNavigationContainer />
          </AppContextProvider>
        </Suspense>
      </Provider>
    </PersistGate>
  );
}
