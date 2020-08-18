import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {marginLR} from './../../constants/miscelaneous'
import Colors from './../../constants/colors'

const Card = ({children}) => {
    return(
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: marginLR/2,
        padding: marginLR/2,
        backgroundColor: Colors.drawer,
        alignItems: "center",
        elevation: 5,
        borderRadius: 10,
        marginHorizontal: marginLR/2
    }
})

export default Card