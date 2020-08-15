import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainSearchListStack from './../navigation/SearchListStack/MainSearchListStack'
import AddRecipeScreen from './../screens/AddRecipeScreen'

const Drawer = createDrawerNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="search">
                <Drawer.Screen name="search" component={MainSearchListStack} />
                <Drawer.Screen name="add recipe" component={AddRecipeScreen} />
            </Drawer.Navigator>
            <StatusBar style="inverted" />
        </NavigationContainer>
    )
}

export default MainNavigator