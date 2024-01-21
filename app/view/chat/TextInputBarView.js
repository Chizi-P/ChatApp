import React, { useState } from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import LayoutView from '../LayoutView'
import MyAppText from '../MyAppText'
import colors from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateSentChatRecords } from '../../func/UpdateChatRecords'
import { useAppContext } from '../../../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import * as ImagePicker from 'expo-image-picker'

function TextInputBarView({ text, onChangeText, groupID, style }) {
    // const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const [type, setType] = useState('text')
    const { manager } = useAppContext()
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (result.canceled) return

        console.log('result.assets:', result.assets[0])
    
        setImage(result.assets[0].uri)
        const res = await manager.uploadImage(result.assets[0].uri)
        await manager.sendMessage(groupID, result.assets[0].type, res.url)
        console.log('res', res.url)
    }

    return (
        <LayoutView
            horizontal
            margin={15}
            style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                ...style,
            }}
        >
            
            <TouchableOpacity 
                style={{ padding: 15 }}
                onPress={pickImage}
            >
                <FontAwesomeIcon icon={faImage} color='white'/>
            </TouchableOpacity>

            <TextInputView text={text} setText={onChangeText} />
            <SendButtonView
                onSend={() => {
                    if (text === '') return
                    manager.sendMessage(groupID, type, text)
                        .then(() => onChangeText(''))
                        .catch(console.warn)
                }}
            />
        </LayoutView>
    )
}

function TextInputView({ text, setText }) {

    const radius = 15

    // const [isFocus, setFocus] = React.useState(false)
    return (
        <TextInput
            value={text}
            onChangeText={setText}
            // multiline
            placeholder={'Enter a message'}
            placeholderTextColor="gray"
            style={{
                flex            : 1,
                height          : 40,
                paddingLeft     : radius,
                color           : 'white',
                backgroundColor : colors.secondary,
                borderRadius    : radius
            }}
            // onFocus={() => setFocus(true)}
            // onBlur={() => setFocus(false)}
        ></TextInput>
    )
}

function SendButtonView({ onSend }) {
    return (
        <TouchableOpacity onPress={onSend} style={{ padding: 15 }}>
            <FontAwesomeIcon icon={faPaperPlane} color='white'/>
        </TouchableOpacity>
    )
}

export default TextInputBarView
