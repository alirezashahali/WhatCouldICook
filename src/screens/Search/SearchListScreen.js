import React from 'react'
import {View, Text, StyleSheet, FlatList, Image} from 'react-native'
import {connect} from 'react-redux'
import {marginLR} from './../../../constants/miscelaneous'
import {SpacerHalf} from './../../components/Spacer'
import Card from './../../components/Card'
import Touchanger from './../../../utils/Touchanger'

const SearchListScreen = ({recipes, allCats, navigation}) =>{

    const Touch = Touchanger()
    
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
    allCats: state.categories.allCats
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

export default connect(MapStateToProps)(SearchListScreen)