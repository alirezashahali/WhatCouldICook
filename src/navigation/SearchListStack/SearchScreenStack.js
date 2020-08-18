import React from 'react'
import {StyleSheet} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../../screens/Search/SearchScreen'
import Colors from '../../../constants/colors'
import HeaderLeft from '../../../utils/headerUtils/HeaderLeft'

const Stack = createStackNavigator()

const SearchScreenStack = ({navigation}) => {
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: Colors.header },
            headerTitleAlign: "center"
        }}>
            <Stack.Screen name="searchBy" component={SearchScreen} options={{
            title: "What-2-Cook",
            headerTitleStyle:{fontFamily: "Kaushan"},
            headerLeft: HeaderLeft({navigation})
        }} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
})

export default SearchScreenStack