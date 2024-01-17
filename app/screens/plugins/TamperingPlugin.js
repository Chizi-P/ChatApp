import React from 'react';
import { SafeAreaView, Image, ScrollView } from 'react-native'
import ListView from '../../view/ListView';
import ItemView from '../../view/ItemView';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

function TamperingPlugin(props) {

    const [image, setImage] = React.useState(null)
    const [imageString, setImageString] = React.useState([])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        console.log(result)

        if (result.canceled) return
        setImage(result.uri)

        const imageBase64 = await FileSystem.readAsStringAsync(result.uri, {encoding: FileSystem.EncodingType.Base64})
        var modifiedImageBase64 = []
        const numOfBit = 2
        for (let i = 0; (i + numOfBit) < imageBase64.length; i += numOfBit) {
            modifiedImageBase64.push(imageBase64.slice(i, i + numOfBit))
        }

        setImageString(modifiedImageBase64)
    }

    return (
        <SafeAreaView>
            {/* <ScrollView> */}
                <ListView title='Tampering'>
                    <ItemView text='Pick an image from camera roll' onPress={pickImage}/>
                    {(image ?? {}) && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </ListView>
                <ListView title='Data'>
                    <ItemView text={imageString.slice(0, 80).join(' ')} typed={false}/>
                </ListView>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

export default TamperingPlugin;