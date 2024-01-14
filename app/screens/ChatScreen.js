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

    const { group: initGroup } = route.params

    const { manager, currentChannel, setCurrentChannel, updateGroup } = useAppContext()
    
    const [group, setGroup] = useState(initGroup)
    const groupID = group.id

    useEffect(() => {
        setCurrentChannel(groupID)
        console.log('setCurrentChannel', groupID)
        manager.load('group', groupID).then(setGroup)

        return () => {
            console.log('currentChannel', currentChannel)
            console.log('setCurrentChannel', '""')
            setCurrentChannel('')
        }
    }, [])

    useEffect(() => {
        manager.load('group', groupID).then(setGroup)
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
                    messages={group.messages}
                    style={{ marginHorizontal: 25, flex: 1 }}
                />

                <TextInputBarView groupID={groupID}/>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen
