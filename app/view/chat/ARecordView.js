import React, { useEffect, useState } from 'react'
import MyAppText from '../MyAppText';
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import LayoutView from '../LayoutView';
import { useAppContext } from '../../../AppContext';

function ARecordView({ messageID }) {

    const { manager, user } = useAppContext()

    const [message, setMessage] = useState({})

    useEffect(() => {
        manager.load('message', messageID)
            .then(setMessage)
            .catch(console.warn)
    }, [])

    return (
        message.from !== undefined 
            ? message.from === user.id
                ? <Sent message={message}/>
                : <Received message={message}/>
            : <></>
    )
}

function Sent({message}) {

    const { manager } = useAppContext()

    const [placeholder, setPlaceholder] = useState('')

    useEffect(() => {
        if (message.type !== 'image') return 
        manager.getImageSourceBlurHash(message.content)
            .then(setPlaceholder)
            .catch(console.warn)
    }, [])

    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                { message.type === 'image'
                    ? <Image 
                        source={manager.getImageSource(message.content)} 
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                        placeholder={placeholder}
                    />
                    : <MyAppText style={{textAlign: 'right', width: '80%'}}>
                        {message.content}
                    </MyAppText>
                }
                <VerticalLine style={{backgroundColor: 'dodgerblue'}}/>
            </LayoutView>
        </LayoutView>
    )
}

<Text style={{textAlign: 'right'}} ></Text>

function Received({message}) {

    const { manager } = useAppContext()

    const [placeholder, setPlaceholder] = useState('')

    useEffect(() => {
        if (message.type !== 'image') return 
        manager.getImageSourceBlurHash(message.content)
            .then(setPlaceholder)
            .catch(console.warn)
    }, [])

    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <VerticalLine style={{backgroundColor: 'royalblue'}}/>
                { message.type === 'image'
                    ? <Image 
                        source={manager.getImageSource(message.content)} 
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                        placeholder={placeholder}
                    />
                    : <MyAppText style={{textAlign: 'left', width: '80%'}}>
                        {message.content}
                    </MyAppText>
                }
            </LayoutView>
        </LayoutView>
    )
}

function VerticalLine({ style }) {
    return (
        <View style={{width: 5, backgroundColor: 'gray', borderRadius: 4, ...style}}></View>
    )
}

export default ARecordView;

