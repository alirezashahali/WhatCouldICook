import React, {useCallback, useEffect, useLayoutEffect} from 'react'
import {View, Text, StyleSheet, KeyboardAvoidingView,
    TouchableWithoutFeedback, Keyboard, ScrollView} from 'react-native'
import AddRecipeForm from './../Add/AddRecipeForm'
import ErrorDisplayer from './../../components/ErrorDisplayer'
import {SpacerHalf, SpacerFull} from './../../components/Spacer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {marginLR, size} from './../../../constants/miscelaneous'
import Touchanger from './../../../utils/Touchanger'
import {connect} from 'react-redux'
import {addIngredientAvailable, removeIngredientAvailable} from './../../../redux/ingredients/ingredients.actions'
import {addChosenCats, removeChosenCats} from './../../../redux/categories/categories.actions'
import CustomButton from './../../components/Button'

const SearchScreen = ({navigation, AddIngredient, RemoveIngredient,
    AddChosenCats, RemoveChosenCats, chosenCats, availableIngredients}) => {
    const Touch = Touchanger()
    const headerRight = useCallback(
        () => {
            navigation.setOptions({
                headerRight: () => (
                    <View style={{ marginRight: marginLR }}>
                        <Touch onPress={() => {
                            navigation.navigate('searchByList', {searchScreen: true})
                        }}>
                            <MaterialCommunityIcons name='check-circle' size={size} color="white" />
                        </Touch>
                    </View>
                )
            })
        }, [navigation])

    useEffect(headerRight, [navigation])
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={styles.marginer}>
                    <SpacerHalf />
                    <View>
                        <AddRecipeForm title="Add ingredient you have at your disposal" list={availableIngredients}
                            onCreate={(name) => {
                                AddIngredient(name)
                                // console.log('works', name)
                            }}
                            onDelete={(item) => {
                                RemoveIngredient(item.id)
                            }}
                        />
                    </View>
                    <SpacerFull />
                    <View>
                        <AddRecipeForm title="Add craved categories" list={chosenCats}
                            onCreate={(name) => {
                                AddChosenCats(name)
                            }}
                            onDelete={(item) => {
                                RemoveChosenCats(item.id)
                            }}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const MapDispatchToProps = dispatch => ({
    AddIngredient: ingred => dispatch(addIngredientAvailable(ingred)),
    AddChosenCats: cat => dispatch(addChosenCats(cat)),
    RemoveIngredient: id => dispatch(removeIngredientAvailable(id)),
    RemoveChosenCats: id => dispatch(removeChosenCats(id))
})

const MapStateToProps = state => ({
    chosenCats : state.categories.chosenCats,
    availableIngredients : state.ingredients.availableIngredient
})

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems: "center"
    },
    marginer:{
        paddingBottom: 100
    },
})

export default connect(MapStateToProps, MapDispatchToProps)(SearchScreen)