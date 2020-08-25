import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider} from 'react-redux'
import store from './redux/store'
import MainNavigator from './src/navigation/MainNavigation'
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import {init} from './src/helpers/db'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('recipe.db')
init(db)
  .then(console.log("ingredients table is created"))
  .catch((e)=>{console.log(e)})

export default function App() {
  let [fontsLoaded] = useFonts({
    'Satisfy_400Regular': require('./assets/fonts/Satisfy-Regular.ttf'),
    'Kaushan': require('./assets/fonts/KaushanScript-Regular.ttf'),
    'OpenSnasRegular': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSansSemiBold': require('./assets/fonts/OpenSans-SemiBold.ttf')
  });

  if(!fontsLoaded){
    return(
      <AppLoading />
    )
  }

  return (
    <Provider store={store} >
      <MainNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
