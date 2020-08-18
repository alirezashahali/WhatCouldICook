import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import MainSearchListStack from './../navigation/SearchListStack/MainSearchListStack'
import AddRecipeStack from '../screens/AddRecipeStack'
import SearchScreenStack from './SearchListStack/SearchScreenStack'
import Colors from './../../constants/colors'
import {iconDrawerSizeActive, iconDrawerSizeInactive,
    drawerSizeInactive, drawerSizeActive, marginLR} from './../../constants/miscelaneous'

const Drawer = createDrawerNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="search" drawerStyle={{
                backgroundColor: Colors.drawer,
            }} drawerContentOptions={{
                activeBackgroundColor: Colors.drawer,
                activeTintColor: Colors.header
            }} >
                <Drawer.Screen name="search" component={MainSearchListStack} options={{
                    title:"",
                    drawerIcon: ({color, focused}) => {
                        const TextStyle = focused ? {fontSize: drawerSizeActive} : {fontSize: drawerSizeInactive}
                        return (
                            <View style={styles.container} >
                                <MaterialCommunityIcons name="food"
                                    size={focused ? iconDrawerSizeActive : iconDrawerSizeInactive}
                                    color={color} style={{marginHorizontal: marginLR}}
                                />
                                <Text style={{...styles.text, ...TextStyle, color}}>
                                    Recipe List
                                </Text>
                            </View>
                        )
                    }
                }} />
                <Drawer.Screen name="add recipe" component={AddRecipeStack} options={{
                    title:"",
                    drawerIcon: ({color, focused}) => {
                        const TextStyle = focused ? {fontSize: drawerSizeActive} : {fontSize: drawerSizeInactive}
                        return (
                            <View style={styles.container} >
                                <MaterialIcons name="playlist-add"
                                    size={focused ? iconDrawerSizeActive : iconDrawerSizeInactive}
                                    color={color} style={{marginHorizontal: marginLR}}
                                />
                                <Text style={{...styles.text, ...TextStyle, color}}>
                                    Add Recipe
                                </Text>
                            </View>
                        )
                    }
                }} />
                <Drawer.Screen name="searchBasedOnIngredient" component={SearchScreenStack} options={{
                    title:"",
                    drawerIcon: ({color, focused}) => {
                        const TextStyle = focused ? {fontSize: drawerSizeActive} : {fontSize: drawerSizeInactive}
                        return (
                            <View style={styles.container} >
                                <MaterialCommunityIcons name="shopping-search"
                                    size={focused ? iconDrawerSizeActive : iconDrawerSizeInactive}
                                    color={color} style={{marginHorizontal: marginLR}}
                                />
                                <Text style={{...styles.text, ...TextStyle, color}}>
                                    Search For Recipe
                                </Text>
                            </View>
                        )
                    }
                }}/>
            </Drawer.Navigator>
            <StatusBar style="inverted" />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily: "Kaushan"
    },
    container: {
        flexDirection: "row",
        alignItems: "center"
    }
})

export default MainNavigator