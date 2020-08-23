import React, {useState, useEffect, useReducer, useLayoutEffect, useCallback, useMemo} from 'react'
import {View, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard, Text} from 'react-native'
import RenderRecipe from './../../../utils/Screens/RenderRecipe'
import {addRecipe} from './../../../redux/recipe/recipe.actions'
import {connect} from 'react-redux'
import {marginLR, size} from './../../../constants/miscelaneous'
import LoadingScreen from './../../components/LoadingScreen'
import Touchanger from './../../../utils/Touchanger'
import Colors from './../../../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from './../../components/SearchComponent'
import { useIsFocused } from '@react-navigation/native';
import NoComponent from './../../components/NoComponent'
import {reducer} from './Constants'
import CustomButton from '../../components/Button'

const SearchListScreen = ({recipes, allCats, navigation, route, ingredients, AddRecipe,
    chosenCats, availableIngredients}) =>{
    const [adding, setAdding] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [searchName, setSearchName] = useState('')
    const isFocused = useIsFocused();
    const [augmentedRecipes, dispatch] = useReducer(reducer, recipes)
    const [recipesFiltered, setRecipeFiltered] = useState([])
    const [lastChange, setLastChange] = useState(undefined)
    const [intervaler, setIntervaler] = useState(1)
    const [puss, setPuss] = useState(false)
    const [deficitRange, setDeficitRange] = useState(false)
    const [originalLen, setOriginalLen] = useState(null)
    const [filteredLen, setFilteredLen] = useState(null)
    const [searchScreenLen, setSearchScreenLen] = useState(null)

    const Touch = Touchanger()

    const closeVisible = () => {
        setModalVisible(false)
    }
    const changeSearchName = (name) => {
        setSearchName(name)
    }
    
    const filterAugmented = useCallback(() => {
        let Result = augmentedRecipes
        setOriginalLen(Result.length)
        if(searchName.trim().length){
            Result = Result.filter(el => el.name.toLowerCase().includes(searchName.trim().toLowerCase()))
            setFilteredLen(Result.length)
        }
        if(!deficitRange && availableIngredients.length>0 && route.params?.searchScreen){
            Result = Result.filter(el => el.additionalIngs== 0)
            setSearchScreenLen(Result.length)
        }
        return Result
    },[augmentedRecipes, searchName, deficitRange, availableIngredients])

    // useEffect for making filterAugmented work properly
    useEffect(() => {
        if(filteredLen===null){
            setFilteredLen(originalLen)
        }
    }, [originalLen])

    useEffect(() => {
        if(searchScreenLen===null){
            setSearchScreenLen(filteredLen)
        }
    }, [filteredLen])

    //end of making filterAugmented work properly
    
    useEffect(() => {
        if(route.params?.state){
            setAdding(true)
            const state = route.params.state
            for(i in state.ingredients){
                let index = ingredients.findIndex(el => el.name === state.ingredients[i])
                let {id, name} = ingredients[index]
                state.ingredients[i] = {id, name}
            }
            for(j in state.categories){
                let index = allCats.findIndex(el => el.name === state.categories[j])
                let {id, name} = allCats[index]
                state.categories[j] = {id, name}
            }
            AddRecipe(state)
            setAdding(false)
        }
    }, [route.params?.state])

    useEffect(() => {
        dispatch({type: 'reset', payload: recipes})
    }, [recipes, route])

    useEffect(() => {
        if(route.params?.searchScreen && isFocused){
            setPuss(true)
            const chosen = {chosenCats, availableIngredients}
            dispatch({type:"starGiver", payload: chosen})
            dispatch({type: "sort"})
        }else if(!isFocused){
            setPuss(false)
        }
    },[route.params?.searchScreen, chosenCats, availableIngredients, isFocused])

    // hides searchbar every 4 secs
    // changes lastChage for refrence and refrencing and force rerendering based on Interval
    useEffect(() => {
        setLastChange(Date.now())
    }, [searchName, modalVisible])

    useEffect(() => {
        setInterval(() => {
            setIntervaler(Math.random())
        }, 1000)
    },[])

    useEffect(() => {
        if(Date.now() - lastChange > 4000 && isFocused){
            setModalVisible(false)
            Keyboard.dismiss()
        }
    }, [intervaler])

    //refreshes search bar content when ever you switch screen
    useEffect(() => {
        if(isFocused === false){
            setSearchName("")
            setModalVisible(false)
        }
    },[isFocused])

    //manages filtered recipes

    useEffect(() => {
        setRecipeFiltered(
            filterAugmented()
    )}, [searchName, filterAugmented, deficitRange])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{marginRight: marginLR}}>
                    <Touch onPress={() => {
                        setModalVisible(!modalVisible)
                    }}>
                        <Ionicons name="md-search" size={size} color={Colors.headerFont}/>
                    </Touch>
                </View>
            )
        })
    }, [])

    //augmented
    if(adding){
        return(
            <LoadingScreen/>
        )
    }
    return(
        <View style={styles.container}>
            <SearchComponent title={searchName} setTitle={setSearchName}
                visible={modalVisible} close={closeVisible} value={searchName}
                changeValue={changeSearchName} placeHolder="Recipe Name"
            />
            <TouchableWithoutFeedback onPress={() => {
                setModalVisible(false)
                if(Keyboard){
                    Keyboard.dismiss()
                }
            }} >
                {
                    (recipesFiltered.length > 0)
                    ?
                    <View>
                    <FlatList
                        data={recipesFiltered}
                        renderItem={({item}) => (
                        <RenderRecipe puss={puss} navigation={navigation} item={item} />
                        )}
                        keyExtractor={item => String(item.id)}
                    />
                    {(!deficitRange && filteredLen>searchScreenLen)
                    ?
                    <CustomButton onPress={() => {setDeficitRange(true)}}
                        style={{width:'95%', alignItems: "center", backgroundColor: Colors.drawer}}
                    >
                        <View>
                            <Text style={{fontFamily:'OpenSnasRegular', fontSize: 16,
                                textAlign: "center", color:Colors.header}}
                            >
                                Show more {filteredLen} / {searchScreenLen}
                            </Text>
                            <Ionicons name="ios-arrow-down" size={size} color={Colors.header}
                                style={{textAlign: "center"}}
                            />
                        </View>
                    </CustomButton>
                    :
                    null
                    }
                    </View>
                    :
                    (filteredLen > 0 && !deficitRange)
                    ?
                    <CustomButton onPress={() => {setDeficitRange(true)}}
                        style={{width:'95%', alignItems: "center", backgroundColor: Colors.drawer}}
                    >
                        <View>
                            <Text style={{fontFamily:'OpenSnasRegular', fontSize: 16,
                                textAlign: "center", color:Colors.header}}
                            >
                                Show more
                            </Text>
                            <Ionicons name="ios-arrow-down" size={size} color={Colors.header}
                                style={{textAlign: "center"}}
                            />
                        </View>
                    </CustomButton>
                    :
                    <NoComponent />
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

const MapStateToProps = state => ({
    recipes: state.recipes.recipes,
    allCats: state.categories.allCats,
    ingredients: state.ingredients.allIngredients,
    chosenCats: state.categories.chosenCats,
    availableIngredients: state.ingredients.availableIngredient
})

const MapDispatchToProps = dispatch => ({
    AddRecipe : (state) => dispatch(addRecipe(state))
})

const styles = StyleSheet.create({
    container:{
        overflow: "hidden"
    }
})

export default connect(MapStateToProps, MapDispatchToProps)(SearchListScreen)