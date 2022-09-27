import React from 'react'
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyAppText from '../view/MyAppText'
import LayoutView from '../view/LayoutView'
import ChatRecordView from '../view/chat/ChatRecordView'
import TextInputBarView from '../view/chat/TextInputBarView'
import colors from '../config/colors'

function ChatScreen({ navigation, route }) {
    const { friend, ws } = route.params

    const [record, setRecord] = React.useState([])

    const Record = [
        {
            sender: 'sender',
            date: '2022.01.01.10.30',
            content: 'hi!',
        },
    ]

    React.useEffect(() => {
        (async () => {
            const chatRecord = await AsyncStorage.getItem(`@chatRecord.${friend.id}`)
            if (chatRecord === null) await AsyncStorage.setItem(`@chatRecord.${friend.id}`, JSON.stringify(record))
            else                     setRecord(JSON.parse(chatRecord))
        })()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LayoutView
                horizontal
                margin={25}
                spacing={10}
                style={{ alignItems: 'center' }}
            >
                <Image
                    style={{
                        backgroundColor: colors.loading,
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                    }}
                />
                <MyAppText>{friend.name}</MyAppText>
            </LayoutView>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                <ChatRecordView
                    record={record}
                    style={{ marginHorizontal: 25, flex: 1 }}
                />
                <TextInputBarView setRecord={setRecord} ws={ws} friendName={friend.name}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen
