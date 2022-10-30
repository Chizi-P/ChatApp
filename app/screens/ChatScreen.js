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
import { useAppContext } from '../../AppContext'
import { chatConfig } from '../config/chatConfig'
import ListView from '../view/ListView'
import ARecordView from '../view/chat/ARecordView'
import ItemView from '../view/ItemView'

function ChatScreen({ navigation, route }) {
    const { friend } = route.params
    const { chatRecords, setChatRecords } = useAppContext()
    
    const [chatRecord, setChatRecord] = React.useState([])
    React.useEffect(() => {
        console.log('chatRecords:', chatRecords)
        let record = (
            chatRecords.received[friend.id]?.map(e => {
                return {...e, sender: friend.id}
            }) ?? []
        ).concat((
            chatRecords.sent[friend.id]?.map(e => {
                return {...e, sender: chatConfig.userId}
            })) ?? []
        )
        record.sort((a, b) => a.date - b.date)
        console.log('record:', record)
        setChatRecord(record)
    }, [chatRecords])

    const flatListRef = React.useRef(null)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ListView title={friend.name.toUpperCase()}>
                <FlatList
                    ref                 = {flatListRef}
                    data                = {chatRecord}
                    renderItem          = {({ item }) => <ItemView text={item.content} /> }
                    keyExtractor        = {(item, i) => i}
                    onContentSizeChange = {() => {
                        flatListRef.current.scrollToEnd()
                    }}
                    scrollEnabled
                />
            </ListView>
            {/* <LayoutView
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
            </LayoutView> */}
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                {/* <ChatRecordView
                    chatRecord={chatRecord}
                    style={{ marginHorizontal: 25, flex: 1 }}
                /> */}
                <TextInputBarView setChatRecords={setChatRecords} friendID={friend.id}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen
