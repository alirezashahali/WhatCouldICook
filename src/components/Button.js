import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Touchanger from './../../utils/Touchanger'
import Colors from './../../constants/colors'
import {marginLR} from './../../constants/miscelaneous'

const CustomButton = ({onPress, children, style, title, textStyle}) => {
    const Touch = Touchanger()
    if(children){
        return(
            <Touch onPress={onPress}>
                <View style={{...styles.container, ...style}}>
                    {children}
                </View>
            </Touch>
        )
    }
    return(
        <Touch onPress={onPress}>
            <View style={{...styles.container, ...style}} >
                <Text style={{...textStyle, ...styles.text}}>{title}</Text>
            </View>
        </Touch>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.header,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: marginLR/2,
        marginHorizontal: marginLR/2,
        borderRadius: 10,
        paddingVertical: marginLR/2,
        paddingHorizontal: marginLR
    },
    text:{
        fontSize: 16,
        fontFamily:'OpenSansSemiBold',
        color: "white",
        textAlign: "center"
    }
})

export default CustomButton