import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator, ScrollView, LayoutAnimation, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Message from './Message'
import MyAppText from '../MyAppText'
import { BlurView } from 'expo-blur'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'

function loadMore(messages, setLoadedMessages, offset, setOffset, limit) {
    console.log('offset:', offset)
    console.log('loadedMessages', messages.slice(0, offset + limit))
    setLoadedMessages(messages.slice(0, offset + limit))
    setOffset(offset + limit)
}

function Messages({messages = [], style}) {

    const flatListRef = React.useRef(null)

    const [showBackTopButton, setShowBackTopButton] = useState(false)

    // const [offset, setOffset] = useState(0)
    // const [page, setPage] = useState(1)

    // const limit = 50

    // const [loadedMessages, setLoadedMessages] = useState(messages.slice(0, limit))

    // useEffect(() => {
    //     loadMore(messages, setLoadedMessages, offset, setOffset, limit)
    // }, [])

    return (
        <View style={{...style}}>
            <FlatList
                ref                 = {flatListRef}
                data                = {messages}
                renderItem          = {({ item: messageID }) => <Message messageID={ messageID } onPress={() => {  }}/> }
                keyExtractor        = {messageID => messageID.toString()}
                onContentSizeChange = {() => {
                    // flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
                    // flatListRef.current.scrollToEnd()
                }}
                ListFooterComponent={
                    <View style={{
                        backgroundColor: 'dimgray', 
                        alignSelf: 'center',
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        marginBottom: 50
                    }}>
                        <MyAppText>最上面了</MyAppText>
                    </View>
                }
                // ListFooterComponentStyle={{alignSelf: 'center'}}
                ListEmptyComponent={ 
                    <View style={{
                        backgroundColor: 'dimgray', 
                        alignSelf: 'center',
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        margin: 10
                    }}>
                        <MyAppText>無聊天記錄</MyAppText>
                    </View>
                }
                initialNumToRender={25}
                windowSize={10}
                inverted
                scrollEnabled
                onScroll={event => {
                    if (event.nativeEvent.contentOffset.y > 1000) {
                        if (showBackTopButton === false) {
                            BackTopButtonAnimation()
                        }
                        setShowBackTopButton(true)
                    } else {
                        if (showBackTopButton === true) {
                            BackTopButtonAnimation()
                        }
                        setShowBackTopButton(false)
                    }
                }}
            />
            { showBackTopButton ? <TouchableOpacity 
                style={{
                    position: 'absolute', 
                    width: 50,
                    height: 50,
                    bottom: 0, 
                    zIndex: 1,
                    overflow: 'hidden',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, .5)',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    margin: 5,
                }} 
                activeOpacity={1}
                onPress={() => {
                    flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
                }}
            >
                <BlurView style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} intensity={15}>
                    <FontAwesomeIcon icon={faArrowDown} color='white'/>
                </BlurView>
            </TouchableOpacity> : <></>}


        </View>
    )
}

const BackTopButtonAnimation = () => {
    LayoutAnimation.configureNext({
        duration: 250,
        create: {
            type: LayoutAnimation.Types.easeOut,
            property: 'opacity'
        },
        delete: {
            type: LayoutAnimation.Types.easeOut,
            property: 'opacity'
        }
    })
}

export default Messages