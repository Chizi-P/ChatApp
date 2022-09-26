import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import LayoutView from '../LayoutView'
import MyAppText from '../MyAppText'
import colors from '../../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

function TextInputBarView({ setRecord, ws, friendID, style }) {
    const [text, setText] = React.useState('')
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
                onSend={ () => {
                    if (text === '') return
                    ws.emit('sendMsg', { to: friendID, msg: text }, res => {
                        console.log(res)
                        if      (res === 'sent') console.log('發送成功！')
                        else if (res === 'error') console.log('錯誤')
                    })
                    
                    let isOk = true
                    if (isOk) {
                        setRecord(old => {
                            return old.concat({
                                sender: 'my',
                                date: new Date().toDateString(),
                                content: text,
                            })
                        })
                        setText('')
                    } else {
                        console.log('發送失敗！')
                    }
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

export default TextInputBarView
