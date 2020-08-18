import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native'
import { marginLR, iconDrawerSizeActive } from '../../../constants/miscelaneous'
import CustomButton from './../../components/Button'
import { MaterialIcons } from '@expo/vector-icons';
import Colors from './../../../constants/colors'
import {connect} from "react-redux"
import {removeRecipe} from './../../../redux/recipe/recipe.actions'


const RecipeDetailScreen = ({route, RemoveRecipe, navigation}) => {
    const item = route.params
    return(
        <SafeAreaView>
            {
                item.imageUrl ?
                <Image source={{uri: item.imageUrl}} /> :
                null
            }
            <Text style={styles.headingTitle}>
                Ingredients:
            </Text>
            <View style={styles.vertical}>
                {
                    item.ingredients.map(el => <Text style={styles.ingredient} key={String(el.id)} >{el.name}  </Text>)
                }
            </View>
            <Text style={styles.headingTitle}>
                recipe:
            </Text>
            <Text style={styles.text}>
                {item.recipe}
            </Text>
            <View style={styles.buttonContainer}>
                <CustomButton>
                    <MaterialIcons name="edit" size={23} color={"white"} />
                </CustomButton>
                <CustomButton style={{ backgroundColor: Colors.delete }} onPress={() => {
                    navigation.navigate("recipeList")
                    RemoveRecipe(item.id)
                }}>
                    <MaterialIcons name="delete" size={23} color={"white"} />
                </CustomButton>
            </View>
        </SafeAreaView>
    )
}

const MapDispatchToProps = dispatch => ({
    RemoveRecipe: (id) => dispatch(removeRecipe(id))
})

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headingTitle: {
        fontSize: 18,
        fontFamily: "OpenSansSemiBold",
        marginVertical: marginLR/2,
        textAlign: "center"
    },
    text: {
        fontFamily: "OpenSnasRegular",
        fontSize: 16,
        marginLeft: marginLR/2,
    },
    ingredient:{
        fontFamily: "OpenSnasRegular",
        fontSize: 16,
    },
    vertical:{
        flexDirection: "row",
        flexWrap:"wrap",
        marginLeft: marginLR/2,
        marginBottom: marginLR/2,
    },
    buttonContainer:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
})

export default connect(null, MapDispatchToProps)(RecipeDetailScreen)