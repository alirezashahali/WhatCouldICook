import React from 'react'
import {StyleSheet} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/Search/SearchScreen'
import Colors from '../../../constants/colors'
import HeaderLeft from '../../../utils/headerUtils/HeaderLeft'
import SearchListScreen from './../../screens/Search/SearchListScreen'

const Stack = createStackNavigator()

const SearchScreenStack = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.header },
            headerTitleAlign: "center"
        }}>
            <Stack.Screen name="searchBy" component={SearchScreen} options={{
                title: "Suitable-Recipe",
                headerTitleStyle:{fontFamily: "Kaushan"},
                headerLeft: HeaderLeft({navigation})
            }} />
            <Stack.Screen name="searchByList" component={SearchListScreen} options={{
                title: "Possible Recipes",
                headerTitleStyle:{fontFamily: "Kaushan"},
            }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
})

export default SearchScreenStack