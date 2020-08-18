import {Platform, TouchableOpacity, TouchableNativeFeedback} from 'react-native'

const Touchanger = () => {
    let Touch = TouchableOpacity
    if(Platform.OS==="android", Platform.Version>=21){
        Touch = TouchableNativeFeedback
    }
    return Touch
}

export default Touchanger