import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image,
    Alert, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {addRecipe} from './../../../redux/recipe/recipe.actions'
import {connect} from 'react-redux'
import {marginLR, size} from './../../../constants/miscelaneous'
import {SpacerHalf} from './../../components/Spacer'
import LoadingScreen from './../../components/LoadingScreen'
import Card from './../../components/Card'
import Touchanger from './../../../utils/Touchanger'
import Colors from './../../../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import SearchComponent from './../../components/SearchComponent'

const SearchListScreen = ({recipes, allCats, navigation, route, ingredients, AddRecipe}) =>{
    const [adding, setAdding] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [searchName, setSearchName] = useState('')

    const closeVisible = () => {
        setModalVisible(false)
    }

    // const changeSearchModal = () => {

    // }

    const Touch = Touchanger()
    
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

    // useEffect(()=>{
    //     console.log(modalVisible)
    // },[modalVisible])

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


    if(adding){
        return(
            <LoadingScreen/>
        )
    }
    
    const renderRecipe = ({item}) => {
        return(
            <Touch onPress={() => {
                navigation.navigate('recipeDetail', item)
            }}>
                <View>
                    <Card>
                            {
                                item.imageUrl ?
                                <Image source={{uri: item.imageUrl}} /> :
                                null
                            }
                            <Text style={styles.recipeName}>{item.name}</Text>
                            <View>
                                <Text style={styles.text}>
                                    Ingredients: 
                                </Text>
                                <View style={styles.vertical}>
                                    {
                                        item.ingredients.map(el => <Text key={String(el.id)}>{el.name}  </Text>)
                                    }
                                </View>
                            </View>
                            <SpacerHalf/>
                            <Text style={styles.text}>estimatedTime: {item.estimatedTime}m</Text>
                    </Card>
                </View>
            </Touch>
        )
    }

    return(
        <View style={styles.container}>
            <SearchComponent title={searchName} setTitle={setSearchName}
                visible={modalVisible} close={closeVisible} />
                <TouchableWithoutFeedback onPress={() => {
                    setModalVisible(false)
                    if(Keyboard){
                        Keyboard.dismiss()
                    }
                }} >
                    <FlatList
                        data={recipes}
                        renderItem={renderRecipe}
                        keyExtractor={item => String(item.id)}
                    />
                </TouchableWithoutFeedback>
        </View>
    )
}

const MapStateToProps = state => ({
    recipes: state.recipes.recipes,
    allCats: state.categories.allCats,
    ingredients: state.ingredients.allIngredients
})

const MapDispatchToProps = dispatch => ({
    AddRecipe : (state) => dispatch(addRecipe(state))
})

const styles = StyleSheet.create({
    container:{
        overflow: "hidden"
    },
    recipeName:{
        textAlign: "center",
        fontSize: 18,
        fontFamily: "OpenSansSemiBold",
        marginBottom: marginLR/2,
    },
    text:{
        fontFamily: "OpenSnasRegular",
        fontSize: 16,
        textAlign: "center"
    },
    vertical:{
        flexDirection: "row",
        flexWrap:"wrap"
    }
})

export default connect(MapStateToProps, MapDispatchToProps)(SearchListScreen)