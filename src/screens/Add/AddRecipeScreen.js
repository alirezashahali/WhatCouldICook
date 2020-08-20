import React, {useReducer, useEffect} from 'react'
import {View, Text, StyleSheet, Platform, Keyboard,
    TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView} from 'react-native'
import AddRecipeForm from './../../../src/screens/Add/AddRecipeForm'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {SpacerFull} from './../../components/Spacer'
import {marginLR, size} from './../../../constants/miscelaneous'
import CustomTextInput from './../../components/TextInput'
import Touchanger from './../../../utils/Touchanger'
import ErrorDisplayer from './../../components/ErrorDisplayer'
import {connect} from 'react-redux'
import {addAllCats} from './../../../redux/categories/categories.actions'
import {addIngredient} from './../../../redux/ingredients/ingredients.actions'
import {initialState, reducer, errorChecker} from './Constants'


const AddRecipeScreen = ({navigation, AddAllCats, AddIngredient}) => {
    const [state, inDispatch] = useReducer(reducer, initialState)
    const Touch = Touchanger()

    useEffect(() => {
        inDispatch({type: 'moreVisit'})
    }, [state.firstVisit])

    navigation.setOptions({headerRight:() => (
            <View style={{marginRight: marginLR}}>
                <Touch onPress={() => {
                    // inDispatch('reset')
                    inDispatch({type:"changeSavingClicked"})
                    let errors = errorChecker(state)
                    if(Math.max(...errors)>0){
                        return inDispatch({type: "errorOccurance", payload: errors})
                    }
                    for(i in state.ingredients){
                        AddIngredient(state.ingredients[i])
                    }
                    for(j in state.categories){
                        AddAllCats(state.categories[j])
                    }
                    let copyState = {...state}
                    navigation.navigate("recipeList", {state: copyState})
                    inDispatch({type: 'reset'})
                }}>
                    <MaterialCommunityIcons name="file-document-box-check" size={size} color="white" />
                </Touch>
            </View>
        )
    })
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.marginer}>
            <CustomTextInput firstVisit={state.firstVisit} title="Recipe's Name" onSubmit = {
                (name) => inDispatch({
                    type: "changeName", payload: name
                })
            } error="the name is required" />
            <ErrorDisplayer err={state.nameError} />
            <SpacerFull />
            <View>
                <AddRecipeForm title="Add needed ingredient" list={state.ingredients}
                    onCreate={async (name) => {
                        await inDispatch({
                            type: "addIngredient", payload: name
                        })
                        let errors = errorChecker(state)
                        inDispatch({type: "errorOccurance", payload: errors})
                        }}
                    onDelete={(name) => inDispatch({
                        type: "removeIngredient", payload: name
                    })}
                />
            </View>
            <ErrorDisplayer err={state.ingredientsError} />
            <SpacerFull />
            <View>
                <AddRecipeForm title="Add recipe categories(helpful for future search)"
                    list={state.categories}
                    onCreate={async (name) => {
                        await inDispatch({
                            type: "addCategory", payload: name
                        })
                        let errors = errorChecker(state)
                        inDispatch({type: "errorOccurance", payload: errors})
                        }}
                    onDelete={(name) => inDispatch({
                        type: "removeCategory", payload: name
                    })}
                />
            </View>
            <ErrorDisplayer err={state.categoriesError} />
            <CustomTextInput firstVisit={state.firstVisit} title="ImageUrl" onSubmit = {
                (name) => inDispatch({
                    type: "changeImageUrl", payload: name
                })
            }/>
            <CustomTextInput firstVisit={state.firstVisit} title="estimated time" keyboardType="decimal-pad" onSubmit = {
                (number) => inDispatch({
                    type: "changeEstimatedTime", payload: Number(number)
                })
            }/>
        </ScrollView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const MapDispatchToProps = dispatch => ({
    AddAllCats: (name) => dispatch(addAllCats(name)),
    AddIngredient: (name) => dispatch(addIngredient(name)),
})


const styles = StyleSheet.create({
    marginer:{
        paddingBottom: 100
    },
    container:{
        justifyContent: "center",
        alignItems: "center"
    },
    header:{
        fontFamily: "OpenSansSemiBold",
        fontSize: 18,
        margin: marginLR/2
    },
    error: {
        color: "red"
    }
})

export default connect(null, MapDispatchToProps)(AddRecipeScreen)