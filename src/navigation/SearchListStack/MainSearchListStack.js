import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SearchListScreen from './../../screens/Search/SearchListScreen'
import RecipeDetailScreen from './../../screens/Recipe/RecipeDetailScreen'
import Colors from './../../../constants/colors'
import {size} from './../../../constants/miscelaneous'
import HeaderLeft from './../../../utils/headerUtils/HeaderLeft'
import {marginLR} from './../../../constants/miscelaneous'
import Touchanger from './../../../utils/Touchanger'

const Stack = createStackNavigator()

const MainSearchListStack = ({navigation}) => {
    const Touch = Touchanger()
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.header },
            headerTitleAlign: "center"
        }}>
        <Stack.Screen name="recipeList" component={SearchListScreen} options={{
            title: "What-2-Cook",
            headerTitleStyle:{fontFamily: "Kaushan"},
            headerLeft: HeaderLeft({navigation}),
        }} />
        <Stack.Screen name="recipeDetail" component={RecipeDetailScreen}
        options={({ route }) => ({ title: route.params.name,
            headerTitleStyle:{fontFamily: "Kaushan"},
        })}/>
        </Stack.Navigator>
    )
}

export default MainSearchListStack