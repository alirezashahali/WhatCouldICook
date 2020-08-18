import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {size, marginLR} from './../../constants/miscelaneous'
import Colors from './../../constants/colors'
import Touchanger from './../Touchanger'

const HeaderLeft = ({navigation}) => {
    const Touch = Touchanger()
    return(
        () =>(
            <View style={styles.container}>
                <Touch onPress={ () => {
                    navigation.openDrawer()
                } }>
                    <Ionicons name="ios-menu" size={size} color={Colors.headerFont} />
                </Touch>
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