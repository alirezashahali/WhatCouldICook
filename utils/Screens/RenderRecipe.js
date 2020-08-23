import React from 'react'
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import Touchanger from './../../utils/Touchanger'
import Card from './../../src/components/Card'
import {SpacerHalf} from './../../src/components/Spacer'
import {marginLR} from './../../constants/miscelaneous'

const RenderRecipe = ({item, navigation, puss}) => {
    const Touch = Touchanger()
    return(
        <Touch onPress={() => {
            navigation.navigate('recipeDetail', item)
        }}>
            <View>
                <Card>
                    <Text style={styles.recipeName}>{item.name}</Text>
                    {
                        item.imageUrl ?
                        <Image source={{uri: item.imageUrl}}
                            style={{width: Dimensions.get("window").width*.8,
                            height: Dimensions.get("window").width*.8*3/4, borderRadius: 5}} 
                        /> :
                        null
                    }
                    <View>
                        <Text style={styles.text}>
                            Ingredients: 
                        </Text>
                        <View style={{...styles.horizontal, alignItems: "center"}}>
                            {
                                item.ingredients.map(el => <Text key={String(el.id)}>{el.name}  </Text>)
                            }
                        </View>
                        {
                            puss ?
                            <View style={styles.horizontal}>
                                <Text>
                                    CatsStar {item.catsStar}  
                                </Text>
                                <Text>
                                    ingsStar {item.ingsStar}
                                </Text>
                                <Text>
                                    deficit {item.additionalIngs}
                                </Text>
                            </View> :
                            null
                        }
                    </View>
                    <SpacerHalf/>
                    <Text style={styles.text}>estimatedTime: {item.estimatedTime}m</Text>
                </Card>
            </View>
        </Touch>
    )
}

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
    horizontal:{
        flexDirection: "row",
        flexWrap:"wrap"
    }
})

export default RenderRecipe