import React, { useEffect, useState } from 'react'
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
import ListView from '../view/ListView'
import ARecordView from '../view/chat/ARecordView'
import ItemView from '../view/ItemView'

function ChatScreen({ route }) {

    const { groupID } = route.params

    const { manager, currentChannel, setCurrentChannel, updateGroup } = useAppContext()
    const [group, setGroup] = useState({})

    const [messages, setMessages] = useState([])

    useEffect(() => {
        setCurrentChannel(groupID)
        console.log('setCurrentChannel', groupID)
        updateGroupData(groupID, setGroup, setMessages)
        return () => {
            console.log('currentChannel', currentChannel)
            console.log('setCurrentChannel', '""')
            setCurrentChannel('')
        }
    }, [])

    // useEffect(() => {
    //     setGroup(groups.find(group => group.id === groupID))
    // }, [groups])

    // useEffect(() => {
    //     // load messages data
    //     console.log('update messages')
    //     if (group.messages === undefined) return
    //     Promise.all(group.messages.map(id => manager.load('message', id)))
    //         .then(setMessages)
    //         .catch(console.warn)
    // }, [group])



    useEffect(() => {
        // if (updateGroup !== groupID) return
        updateGroupData(groupID, setGroup, setMessages)
    }, [updateGroup])

    // useEffect(() => {
    //     // load messages data
    //     console.log('update messages')
        
    //     // limit
    //     // offset

    //     if (group.messages === undefined) return
    //     Promise.all(group.messages.map(async id => await AsyncStorage.getItem(`@message:${id}`)))
    //         .then((messages) => {
    //             console.log(messages)
    //             setMessages(messages)
    //         })
    //         .catch(console.warn)
    // }, [group])

    const flatListRef = React.useRef(null)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ListView title={ group.name }>
                <FlatList
                    ref                 = {flatListRef}
                    data                = {messages}
                    renderItem          = {({ item: message, index }) => <ItemView text={message.content} /> }
                    keyExtractor        = {(item, i) => i}
                    onContentSizeChange = {() => {
                        flatListRef.current.scrollToEnd()
                    }}
                    scrollEnabled
                />
            </ListView> */}
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
                <MyAppText>{group.name}</MyAppText>

            </LayoutView>
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >

                <ChatRecordView
                    chatRecord={messages}
                    style={{ marginHorizontal: 25, flex: 1 }}
                />

                <TextInputBarView groupID={groupID}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

async function updateGroupData(groupID, setGroup, setMessages) {
    const group = JSON.parse(await AsyncStorage.getItem(`@group:${groupID}`))
    setGroup(group)

    if (group.messages === undefined) return
    const messages = await Promise.all(group.messages.map(async id => JSON.parse(await AsyncStorage.getItem(`@message:${id}`)))).catch(console.warn)
    console.log(messages)
    setMessages(messages)
}

export default ChatScreen
