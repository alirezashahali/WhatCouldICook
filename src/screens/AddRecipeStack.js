import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import AddRecipeScreen from './Add/AddRecipeScreen'
import Colors from './../../constants/colors'
import HeaderLeft from './../../utils/headerUtils/HeaderLeft'

const Stack = createStackNavigator()


const AddScreen = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.header },
            headerTitleAlign: "center"
        }}>
            <Stack.Screen name="AddRecipe" component={AddRecipeScreen} options={{
                title: "What-2-Cook",
                headerTitleStyle:{fontFamily: "Kaushan"},
                headerLeft: HeaderLeft({navigation}), 
            }}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
})

export default AddScreen