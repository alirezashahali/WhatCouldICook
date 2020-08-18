import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator} from 'react-native'
import {addRecipe} from './../../../redux/recipe/recipe.actions'
import {connect} from 'react-redux'
import {marginLR} from './../../../constants/miscelaneous'
import {SpacerHalf} from './../../components/Spacer'
import Center from './../../components/Center'
import Card from './../../components/Card'
import Touchanger from './../../../utils/Touchanger'
import Colors from './../../../constants/colors'

const SearchListScreen = ({recipes, allCats, navigation, route, ingredients, AddRecipe}) =>{
    const [adding, setAdding] = useState(false)
    const Touch = Touchanger()
    
    useEffect(() => {
        if(route.params?.state){
            console.log('ALLCATS',allCats)
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

    // if(route){
    //     console.log('REOute', route)
    //     const state = route.params?.state
    //     console.log('STATE',state)
    //     setAdding(true)
    // }

    if(adding){
        return(
            <Center>
                <ActivityIndicator style={{
                }} size="large" color={Colors.header} />
            </Center>
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
        <View style={styles}>
            <FlatList
                data={recipes}
                renderItem={renderRecipe}
                keyExtractor={item => String(item.id)}
            />
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