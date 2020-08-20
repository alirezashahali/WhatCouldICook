import React, {useEffect, useRef} from 'react'
import {View, Text, StyleSheet, TextInput, Dimensions, Animated} from 'react-native'
import Colors from './../../constants/colors'
import {marginLR, size} from './../../constants/miscelaneous'
import { Ionicons } from '@expo/vector-icons';

const SearchComponent = ({title, setTitle, visible, close}) => {
    const slideAnim = useRef(new Animated.Value(-40)).current
    const searchInput = useRef(null)

    useEffect(() => {
        
        if(visible){
            searchInput.current.focus()
            Animated.timing(
                slideAnim,
                {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: false
                }
              ).start();
        }else{
            searchInput.current.blur()
            Animated.timing(
                slideAnim,
                {
                  toValue: -40,
                  duration: 500,
                  useNativeDriver: false
                }
              ).start();
        }
      }, [visible, slideAnim])

    return(
        <Animated.View style={{...styles.container, top: slideAnim}}>
                <View style={styles.search}>
                    <TextInput style={styles.searchInput} returnKeyType={"done"} ref={searchInput}
                        onKeyPress={({nativeEvent:{key}}) => {
                            console.log(key)
                        }
                    }/>
                    {/* <Ionicons name="md-search" color="black" size={size} />  */}
                </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container:{
        overflow: "hidden",
        width: (Dimensions.get('screen').width)*.8,
        position: "absolute",
        top: -40,
        alignSelf: "center",
        alignItems: "center",
        zIndex: 1,
        height: 40,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

    },
    search:{
        backgroundColor: Colors.drawer,
        borderRadius: 5,
        paddingHorizontal: marginLR/2,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    searchInput:{
        backgroundColor: Colors.drawer,
        height:"80%",
        width:(Dimensions.get('screen').width)*.8*.8,
        justifyContent: "center"
    }
})

export default SearchComponent