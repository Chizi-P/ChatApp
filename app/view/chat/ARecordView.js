import React, { useEffect, useState } from 'react'
import MyAppText from '../MyAppText';
import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import LayoutView from '../LayoutView';
import { useAppContext } from '../../../AppContext';

function ARecordView({ messageID }) {

    const { manager, user } = useAppContext()

    const [message, setMessage] = useState({})

    const [placeholder, setPlaceholder] = useState('')
    const [source, setSource] = useState('')

    useEffect(() => {
        manager.load('message', messageID)
            .then(message => {
                setMessage(message)

                if (message.type !== 'image') return 
                manager.loadBlurhash(message.content)
                    .then(blurhash => {
                        setPlaceholder(blurhash)
                        setSource(manager.getImageSource(message.content))
                    })
                    .catch(console.warn)
            })
            .catch(console.warn)
    }, [])

    return (
        message.from !== undefined 
            ? message.from === user.id
                ? <Sent     message={message} placeholder={placeholder} source={source} />
                : <Received message={message} placeholder={placeholder} source={source} />
            : <></>
    )
}

function Sent({message, placeholder, source}) {
    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
                { message.type === 'image'
                    ? <Image 
                        source={source}
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

function Received({message, placeholder, source}) {
    return (
        <LayoutView vertical style={{paddingVertical: 5}}>
            <LayoutView horizontal spacing={10} style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                <VerticalLine style={{backgroundColor: 'royalblue'}}/>
                { message.type === 'image'
                    ? <Image 
                        source={source} 
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

