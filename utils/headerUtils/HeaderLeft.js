import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {size, marginLR} from './../../constants/miscelaneous'
import Colors from './../../constants/colors'

const HeaderLeft = () => {
    return(
        () =>(
            <View>
                <Ionicons name="ios-menu" size={size} color={Colors.headerFont} />
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: marginLR
    }
})

export default HeaderLeft