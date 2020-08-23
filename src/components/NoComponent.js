import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {marginLR} from './../../constants/miscelaneous'

const NoContent = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                No Recipe is found with such a name
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: "100%",
        justifyContent: "center",
        alignContent: 'center',
    },
    text:{
        fontFamily: "OpenSansSemiBold",
        fontSize: 18,
        textAlign: "center"
    }
})

export default NoContent