import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Touchanger from './../../utils/Touchanger'
import Colors from './../../constants/colors'
import {marginLR} from './../../constants/miscelaneous'

const CustomButton = ({onPress, children, style}) => {
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
    }
})

export default CustomButton