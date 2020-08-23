import React, {useReducer, useEffect, useLayoutEffect, useCallback, useState} from 'react'
import {View, Text, StyleSheet, Platform, Keyboard, Image,
    TouchableWithoutFeedback, KeyboardAvoidingView, ScrollView, Alert, Dimensions} from 'react-native'
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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import CustomButton from '../../components/Button';
import { FontAwesome } from '@expo/vector-icons';
import Colors from './../../../constants/colors'

const AddRecipeScreen = ({navigation, AddAllCats, AddIngredient, recipes}) => {
    const [state, inDispatch] = useReducer(reducer, initialState)
    const Touch = Touchanger()

    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          const {camStatus} = await Permissions.askAsync(Permissions.CAMERA)
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
          if(camStatus !== 'granted'){
              alert('Sorry, we need camera permissions to make this work!')
          }
        }
    };

    const _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            inDispatch({type: "changeImageUrl", payload: result.uri})
          }

          console.log("result", result);
        } catch (E) {
          console.log(E);
        }
      };

    const _takeImage = async () => {
        try{
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })
            if(!result.cancelled){
                inDispatch({type: "changeImageUrl", payload: result.uri})
            }

        }catch (E){

        }
    }

    useEffect(() => {
        getPermissionAsync()
    }, [])

    const headerRight = useCallback(() => {
        navigation.setOptions({headerRight:() => (
            <View style={{marginRight: marginLR}}>
                <Touch onPress={() => {
                    // inDispatch('reset')
                    inDispatch({type:"changeSavingClicked"})
                    let errors = errorChecker(state)
                    if(Math.max(...errors)>0){
                        return inDispatch({type: "errorOccurance", payload: errors})
                    }
                    if(recipes.find(el => el.name.toLowerCase()===state.name.toLowerCase())){
                        return Alert.alert(
                            "This name is already taken",
                            "Please change it to sth else",
                            [
                                {
                                text: "OK",
                                onPress: () => console.log("OK was Pressed"),
                                }
                            ],
                            { cancelable: false }
                            );
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
        )})
    }, [navigation, state])

    useEffect(() => {
        inDispatch({type: 'moreVisit'})
    }, [state.firstVisit])

    useEffect(() => {
        console.log(state.imageUrl)
    }, [state.imageUrl])

    useLayoutEffect(headerRight, [headerRight])
    
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
                    onCreate={(name) => {
                        console.log(name)
                        inDispatch({
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
                    onCreate={(name) => {
                        inDispatch({
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
            <SpacerFull/>

            {/* image Buttons */}
            <View style={styles.cameraButtons}>
                <CustomButton title="Gallery"
                    style={{width: "50%", alignSelf:"center", height: 60,
                    backgroundColor: Colors.buttonsPrimary}}
                    textStyle={{fontFamily: "OpenSansSemiBold", color: "white"}}
                    onPress={_pickImage}
                />
                <CustomButton style={{width: "40%", alignSelf:"center", height: 60,
                    backgroundColor: Colors.buttonsPrimary}} onPress={_takeImage}>
                    <FontAwesome name="camera-retro" size={size} color="white" />
                </CustomButton>
            </View>
            <View style={{marginHorizontal: marginLR/2}}>
            {
                state.imageUrl.length > 0 && <Image source={{ uri: state.imageUrl }}
                    style={{ width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width*3/4, alignSelf: "center", borderRadius: 5 }}
                />
            }
            </View>
            {/* Image Buttons */}

            <CustomTextInput firstVisit={state.firstVisit} title="estimated time"
                keyboardType="decimal-pad" onSubmit = {
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

const MapStateToProps = state => ({
    recipes: state.recipes.recipes
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
    },
    cameraButtons: {
        width: Dimensions.get('window').width*.9,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    }
})

export default connect(MapStateToProps, MapDispatchToProps)(AddRecipeScreen)