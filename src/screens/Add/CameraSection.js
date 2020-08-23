import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import * as FileSystem from 'expo-file-system';
import Colors from './../../../constants/colors'
import CustomButton from './../../components/Button'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import {size, marginLR} from './../../../constants/miscelaneous'

const CameraSection = ({imageUri, dispatch}) => {

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
            const fileName = result.uri.split('/').pop()
            newPath = FileSystem.documentDirectory + fileName
            try{
                await FileSystem.moveAsync({
                    from: result.uri,
                    to: newPath
                })
            }catch(err){
                console.log(err)
            }
            dispatch({type: "changeImageUrl", payload: newPath})
          }
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
            if (!result.cancelled) {
                const fileName = result.uri.split('/').pop()
                newPath = FileSystem.documentDirectory + fileName
                try{
                    await FileSystem.moveAsync({
                        from: result.uri,
                        to: newPath
                    })
                }catch(err){
                    console.log(err)
                }
                dispatch({type: "changeImageUrl", payload: newPath})
            }
        }catch (E){
            console.log(E);
        }
    }

    useEffect(() => {
        getPermissionAsync()
    }, [])

    return(
        <View>
            <Text style={{fontFamily:"OpenSansSemiBold", fontSize: 16, marginLeft: marginLR/2}}>
                Add Image
            </Text>
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
                imageUri.length>0 && <Image source={{ uri: imageUri }}
                    style={{ width: Dimensions.get('window').width,
                    height: Dimensions.get('window').width*3/4, alignSelf: "center", borderRadius: 5 }}
                />
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraButtons: {
        width: Dimensions.get('window').width*.9,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    }
})

export default CameraSection