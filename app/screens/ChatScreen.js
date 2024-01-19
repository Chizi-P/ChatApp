import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native'
import MySafeAreaView from '../view/MySafeAreaView'
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
import { BlurView } from 'expo-blur'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native';

function ChatScreen({ route }) {

    const { group: initGroup } = route.params
    const navigator = useNavigation()

    const { manager, currentChannel, setCurrentChannel, updateGroup } = useAppContext()
    
    const [group, setGroup] = useState(initGroup)
    // FIXME
    const [sendingMessages, setSendingMessages] = useState([])

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

    const flatListRef = React.useRef(null)

    return (
        <MySafeAreaView>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.select({ios: 'padding', android: 'height'})}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                    keyboardVerticalOffset={Platform.select({ios: 20, android: 40})}
                >
                    <ChatRecordView
                        messages={group.messages}
                        style={{ marginHorizontal: 25, flex: 1 }}
                    />
                    <TextInputBarView groupID={groupID}/>
                </KeyboardAvoidingView>

                <BlurView style={{
                    position: 'absolute',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: 'rgba(255, 255, 255, .5)',
                }} intensity={60}>
                    <LayoutView
                        horizontal
                        margin={20}
                        spacing={10}
                        style={{ alignItems: 'center' }}
                    >
                        <TouchableOpacity onPress={navigator.goBack} style={{alignSelf: 'stretch', justifyContent: 'center'}}>
                            <FontAwesomeIcon icon={faArrowLeft} color='white' />
                        </TouchableOpacity>

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
                </BlurView>

            </View>
        </MySafeAreaView>
    )
}

export default ChatScreen
