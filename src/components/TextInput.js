import React, {useState} from 'react'
import {View, TextInput, StyleSheet, Text} from 'react-native'
import Colors from './../../constants/colors'
import {marginLR} from './../../constants/miscelaneous'

const CustomTextInput = ({title, onSubmit, error, keyboardType}) => {
    const [input, setInput] = useState('')
    const [erMsg, setErMsg] = useState('')
    const handleChange = (text) => {
        const In = text
        setInput(In)
        setErMsg("")
    }

    return(
        <View>
            <Text style={styles.header}>
                {title}
            </Text>
            <TextInput keyboardType={keyboardType} style={styles.input} value={input} onChangeText={
                (text) => handleChange(text)
            } onBlur= {
                () => {
                    if(input===""){
                        setErMsg(error)
                    }else{
                        onSubmit(input.trim())
                    }
                }
            } />
            {
                erMsg ? <Text style={{margin: marginLR/2, color: "red"}}>{erMsg}</Text> :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        fontFamily: "OpenSansSemiBold",
        fontSize: 18,
        margin: marginLR/2
    },
    input:{
        padding: 10,
        height: 40,
        width: "60%",
        backgroundColor: Colors.drawer,
        borderRadius: 5,
        margin: marginLR/2
    }
})

export default CustomTextInput