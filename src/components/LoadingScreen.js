import React from 'react'
import Center from './Center'
import {ActivityIndicator} from 'react-native'
import Colors from './../../constants/colors'

const LoadingScreen = () => {
    return(
        <Center>
            <ActivityIndicator style={{
            }} size="large" color={Colors.header} />
        </Center>
    )
}

export default LoadingScreen