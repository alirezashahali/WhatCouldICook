import React from 'react'
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native'
import {marginLR} from './../../../constants/miscelaneous'
import CustomButton from './../../components/Button'
import { MaterialIcons } from '@expo/vector-icons';
import Input from './../../components/Input'
import Colors from './../../../constants/colors'

const AddRecipeForm = ({title, list, onCreate, onDelete}) => {
    return(
        <View>
            <Text style={styles.header}>
                {title}
            </Text>
            <ScrollView>
                <FlatList horizontal data={list}
                    keyExtractor={item => item.id ? String(item.id) : String(item)}
                    renderItem={({item}) => {
                    return (
                    <View style={styles.container}>
                        <Text style={styles.subHeader}>
                            {
                                typeof item === "string" ?
                                    item :
                                    item.name
                            }
                        </Text>
                        <CustomButton
                            style={{ backgroundColor: "white", width: null,
                            paddingHorizontal: 0, paddingVertical: 0
                            }}
                            onPress={() => onDelete(item)}
                        >
                            <MaterialIcons name="delete" size={25} color="red" />
                        </CustomButton>
                    </View>
                )}} />
            </ScrollView>
            <Input onSubmit={onCreate}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontFamily: "OpenSansSemiBold",
        fontSize: 18,
        alignItems: "center",
        marginHorizontal: marginLR/2
    },
    subHeader:{
        fontFamily: "OpenSansSemiBold",
        fontSize: 16,
        alignItems: "center",
        textAlign: "center",
    },
    text:{
        fontFamily: "OpenSnasRegular",
        fontSize: 16,
        marginLeft: marginLR/2
    },
    container:{
        flexDirection:"row",
        alignItems: "center",
        marginLeft: marginLR/2,
        marginRight: marginLR
    }
})

export default AddRecipeForm