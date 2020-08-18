import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {marginLR} from './../../constants/miscelaneous'

const ErrorDisplayer = ({err}) => {
    if(err !== ""){
        return(
            <View>
                <Text style={styles.error}>
                    {err}
                </Text>
            </View>
        )
    }else{
        return null
    }
}

const styles = StyleSheet.create({
    error: {
        color: "red",
        margin: marginLR/2
    }
})

export default ErrorDisplayer