import React, {useState} from 'react'
import {View, TextInput, StyleSheet} from 'react-native'
import CustomButton from './../components/Button'
import Colors from './../../constants/colors'
import { Entypo } from '@expo/vector-icons';
import { marginLR } from '../../constants/miscelaneous';

const Input = ({onSubmit}) => {
    const [name, setName] = useState('')

    const handleChange = (text) => {
        const input = text.toLowerCase()
        setName(input)
    }

    return(
        <View style={styles.container} >
            <TextInput numberOfLines={1} multiline={false} keyboardAppearance="dark"
                onKeyPress={({nativeEvent:{key}}) => {
                if( key==='Enter' && name.trim() !== ""){
                    onSubmit(name.trim())
                    setName("")
                }
            }}
                style={styles.input} multiline={true} value={name} onChangeText={text => {
                handleChange(text)
            }} returnKeyType={"done"} />
            <CustomButton style={{backgroundColor: "blue", paddingHorizontal: 5, paddingVertical: 5,
            width: null, backgroundColor: Colors.buttonsPrimary}} onPress={() => {
                if(name.trim() !== ""){
                    onSubmit(name.trim())
                    setName("")
                }
            }} >
                <Entypo name="plus" size={30} color="white" />
            </CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: marginLR/2
    },
    input:{
        padding: 10,
        height: 40,
        width: "60%",
        backgroundColor: Colors.drawer,
        borderRadius: 5
    }
})

export default Input