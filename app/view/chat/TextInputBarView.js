import React from 'react'
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import LayoutView from '../LayoutView'
import MyAppText from '../MyAppText'
import colors from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateSentChatRecords } from '../../func/UpdateChatRecords'
import { useAppContext } from '../../../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

function TextInputBarView({ groupID, style }) {
    const [text, setText] = React.useState('')

    const socket = useAppContext().socket

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
            <TextInputView text={text} setText={setText} />
            <SendButtonView
                onSend={() => {
                    if (text === '') return
                    // { to: friendID, content: text}
                    socket.emit('message', groupID, text, async res => {
                        if (!res.ok) return console.log('發送失敗！', res.msg)
                        console.log(res.msg)
                        setText('')
                    })
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
