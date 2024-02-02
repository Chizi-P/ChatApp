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
import Messages from '../view/chat/Messages'
import TextInputBarView from '../view/chat/TextInputBarView'
import colors from '../config/colors'
import { useAppContext } from '../../AppContext'
import ListView from '../view/ListView'
import ItemView from '../view/ItemView'
import { BlurView } from 'expo-blur'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigation } from '@react-navigation/native'

function ChatScreen({ route }) {

    const { group: initGroup } = route.params
    const navigator = useNavigation()

    const { manager, currentChannel, setCurrentChannel, updateGroup } = useAppContext()

    const [text, setText] = useState('')
    
    const [group, setGroup] = useState(initGroup)

    const [showImage, setShowImage] = useState(true)

    // FIXME
    // const [sendingMessages, setSendingMessages] = useState([])

    // const [showTenor, setShowTenor] = useState(true)
    // const [tenor, setTenor] = useState({})

    const groupID = group.id

    useEffect(() => {
        setCurrentChannel(groupID)
        console.log('setCurrentChannel', groupID)
        manager.load('group', groupID).then(setGroup).catch(console.warn)

        return () => {
            console.log('currentChannel', currentChannel)
            console.log('setCurrentChannel', '""')
            setCurrentChannel('')
        }
    }, [])

    useEffect(() => {
        manager.load('group', groupID).then(setGroup).catch(console.warn)
    }, [updateGroup])

    // useEffect(() => {
    //     if (showTenor) {
    //         fetch(`https://g.tenor.com/v1/search?q=${'hi'}&key=LIVDSRZULELA&limit=8&media_filter=tinygif`, { method: 'GET' })
    //         .then(res => {
    //             res.text().then(str => {
    //                 const tenor = JSON.parse(str)
    //                 setTenor(tenor)
    //             })
    //         })
    //         .catch(console.warn)
    //     }
    // }, [setShowTenor])

    const flatListRef = React.useRef(null)

    return (
        <MySafeAreaView>
            <LayoutView
                horizontal
                margin  = {20}
                spacing = {10}
                style   = {{ alignItems: 'center' }}
            >
                <TouchableOpacity onPress={navigator.goBack} style={{ alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faArrowLeft} color='white' />
                </TouchableOpacity>

                <Image
                    style={{
                        backgroundColor : colors.loading,
                        width           : 30,
                        height          : 30,
                        borderRadius    : 6,
                    }}
                />

                <MyAppText>{group.name}</MyAppText>

            </LayoutView>

            <KeyboardAvoidingView
                behavior={Platform.select({ ios: 'padding', android: 'height' })}
                style={{ flex: 1, justifyContent: 'flex-end' }}
            >
                <Messages
                    messages={group.messages}
                    style={{ flex: 1, marginHorizontal: 25 }}
                />
                <TextInputBarView 
                    text         = { text } 
                    onChangeText = { setText } 
                    groupID      = { groupID }
                />
            </KeyboardAvoidingView>

            {/* { showTenor ?
                <FlatList
                    data                = { tenor.results }
                    renderItem          = {({ item }) => (
                        <Image 
                            source={{ uri: item.media[0].tinygif.url }} 
                            style={{
                                width: item.media[0].tinygif.dims[0],
                                height: item.media[0].tinygif.dims[1],
                            }}
                        />
                    )}
                    keyExtractor        = {item => item.id}
                    scrollEnabled
                    style={{height: 0}}
                />
            : <></> } */}

            {
                showImage ? 
                    <View style={{
                        flex: 1,
                        position: 'absolute', 
                        // width: '100%',
                        // height: '100%',
                        // backgroundColor: 'red',
                        // zIndex: 1,
                        // opacity: 0.5,

                        // alignSelf: 'center',
                        // justifyContent: 'center',
                    }} >
                        <View style={{
                            flex: 1,
                            // width: '100%',
                            // height: '100%',
                            backgroundColor: 'red',
                            zIndex: 1,
                            opacity: 0.5,
                        }}>

                        </View>
                        
                    </View>
                : <></>
            }

        </MySafeAreaView>
    )
}

export default ChatScreen
