import React from 'react'
import {View, Text, StyleSheet} from 'react-native'


const SearchListScreen = () =>{
    const font = 'OpenSnasRegular'
    return(
        <View>
            <Text style={{...styles.center, fontFamily:font }} >
                SearchListScreen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center:{
        textAlign: "center",
    }
})

export default SearchListScreen