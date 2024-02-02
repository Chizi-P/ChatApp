import React, { useEffect, useState } from 'react'
import MyAppText from '../MyAppText'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Video, ResizeMode } from 'expo-av'
import LayoutView from '../LayoutView'
import { useAppContext } from '../../../AppContext'

function Message({ messageID, onPress }) {

    const { manager, user } = useAppContext()

    const [message, setMessage] = useState({})

    const [placeholder, setPlaceholder] = useState('')
    // const [source, setSource] = useState('')

    useEffect(() => {
        manager.load('message', messageID)
            .then(message => {
                setMessage(message)
                if (message.type !== 'image') return 
                // setSource(manager.getImageSource(message.content))
                manager.loadBlurhash(message.content)
                    .then(blurhash => {
                        setPlaceholder(blurhash)
                        // setSource(manager.getImageSource(message.content))
                    })
                    .catch(console.warn)
            })
            .catch(console.warn)
    }, [])

    let content = <></>
    switch (message.type) {
        case 'text':
            content = 
                <MyAppText style={{ textAlign: message.from === user.id ? 'right': 'left', width: '80%' }}>
                    { message.content }
                </MyAppText>
            break

        case 'image': 
            content = 
                <Pressable onPress={onPress}>
                    <Image 
                        source      = { manager.getFileSource(message.content) }
                        placeholder = { placeholder }
                        style       = {{ 
                            width  : 200, 
                            height : 200, 
                            borderRadius: 10 
                        }}
                    />
                </Pressable>
            break
        case 'video': 
            content = 
                <Video
                    source     = { manager.getFileSource(message.content) }
                    resizeMode = { ResizeMode.CONTAIN }
                    style      = {{ 
                        width  : 200, 
                        height : 200, 
                        borderRadius: 10 
                    }}
                    useNativeControls
                    isLooping
                />
            break
        default:
            content = <MyAppText>[default]</MyAppText>
            break
    }

    return (
        message.from !== undefined 
            ? message.from === user.id
                ? <Sent>{ content }</Sent>
                : <Received>{ content }</Received>
            : <></>
    )
}

function Sent({ children }) {
    return (
        <LayoutView vertical style={{ paddingVertical: 5 }}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                { children }
                <VerticalLine style={{backgroundColor: 'dodgerblue'}}/>
            </LayoutView>
        </LayoutView>
    )
}

function Received({ children }) {
    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <VerticalLine style={{backgroundColor: 'royalblue'}}/>
                { children }
            </LayoutView>
        </LayoutView>
    )
}

function VerticalLine({ style }) {
    return (
        <View style={{
            width: 5, 
            backgroundColor: 'gray', 
            borderRadius: 4, 
            ...style
        }}></View>
    )
}

export default Message