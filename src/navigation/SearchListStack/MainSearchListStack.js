import React from 'react'
// import {} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SearchListScreen from './../../screens/Search/SearchListScreen'
import SearchScreen from './../../screens/Search/SearchScreen'
import Colors from './../../../constants/colors'
import HeaderLeft from './../../../utils/headerUtils/HeaderLeft'

const Stack = createStackNavigator()

const MainSearchListStack = () => {
    const headerFont='Kaushan'
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.header },
            headerTitleAlign: "center"
        }}>
            <Stack.Screen name="recipeList" component={SearchListScreen} options={{
                title: "What-2-Cook",
                headerTitleStyle:{fontFamily: headerFont},
                headerLeft: HeaderLeft()
            }} />
            <Stack.Screen name="searchRecipe" component={SearchScreen} />
        </Stack.Navigator>
    )
}

export default MainSearchListStack