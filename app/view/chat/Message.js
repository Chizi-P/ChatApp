import React, { useEffect, useState } from 'react'
import MyAppText from '../MyAppText'
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import { Video, ResizeMode } from 'expo-av'
import LayoutView from '../LayoutView'
import { useAppContext } from '../../../AppContext'

function Message({ messageID }) {

    const { manager, user } = useAppContext()

    const [message, setMessage] = useState({})

    const [placeholder, setPlaceholder] = useState('')
    const [source, setSource] = useState('')

    useEffect(() => {
        manager.load('message', messageID)
            .then(message => {
                setMessage(message)
                if (message.type !== 'image') return 
                // setSource(manager.getImageSource(message.content))
                manager.loadBlurhash(message.content)
                    .then(blurhash => {
                        setPlaceholder(blurhash)
                        setSource(manager.getImageSource(message.content))
                    })
                    .catch(console.warn)
            })
            .catch(console.warn)
    }, [])

    const RenderView = {
        text: 
            <MyAppText style={{textAlign: 'right', width: '80%'}}>
                {message.content}
            </MyAppText>,
        image: 
            <Image 
                source={source}
                style={{ width: 200, height: 200, borderRadius: 10 }}
                placeholder={placeholder}
            />,
        video: (
            <Video
                style={{ width: 200, height: 200, borderRadius: 10 }}
                source={manager.getVideo(message.content)}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
            />
        )
    }

    return (
        message.from !== undefined 
            ? message.from === user.id
                ? <Sent>{ RenderView[message.type] }</Sent>
                : <Received>{ RenderView[message.type] }</Received>
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