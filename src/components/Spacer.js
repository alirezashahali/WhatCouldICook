import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {marginLR} from './../../constants/miscelaneous'

export const SpacerHalf = () => {
    return(
        <View style={{marginBottom: marginLR/2}}>
        </View>
    )
}

export const SpacerFull = () => {
    return(
        <View style={{marginBottom: marginLR}}>
        </View>
    )
}

export const SpacerTwice = () => {
    return(
        <View style={{marginBottom: 2*marginLR}}>
        </View>
    )
}