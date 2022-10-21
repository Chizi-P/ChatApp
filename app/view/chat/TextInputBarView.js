import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import LayoutView from '../LayoutView'
import MyAppText from '../MyAppText'
import colors from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UpdateSentChatRecords } from '../../func/UpdateChatRecords'
import { useAppContext } from '../../../AppContext'

function TextInputBarView({ setChatRecords, friendID, style }) {
    const [text, setText] = React.useState('')

    const ws = useAppContext().ws

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
                    ws.emit('msg', { to: friendID, content: text}, async res => {
                        if (res.state === 'sent')  {
                            console.log('發送成功！')
                            const data = {
                                content: text,
                                date: res.date
                            }
                            const newChatRecords = await UpdateSentChatRecords(friendID, data)
                            setChatRecords(newChatRecords)
                            setText('')
                        }
                        else if (res.state === 'error') console.log('發送失敗！')
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
        <Button
            onPress = {onSend}
            title   = "Send"
            color   = "orange"
        />
    )
}

const sendMsg = (ws, to, msg) => {

}

export default TextInputBarView
