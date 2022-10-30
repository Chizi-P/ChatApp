import React from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native'
import MyAppText from './MyAppText';
import useTypedText from '../hook/useTypedText';

function ItemView({ highlight, text, style, ...props }) {

    const [isHighlight, setHighlight] = React.useState(highlight)

    const typedText = useTypedText(text, 30)

    return (
        <TouchableWithoutFeedback
            onPressIn={() => setHighlight(!highlight)}
            onPressOut={() => setHighlight(highlight)}
            disabled={props.onPress === undefined}
            style={{
                display: text ? 'flex' : 'none',
            }}
            {...props}
        >
            <View >
                <MyAppText
                    style={{
                        ...textStyle(isHighlight),
                        ...style
                    }}
                >
                    {typedText}
                </MyAppText>
            </View>
        </TouchableWithoutFeedback>
    )
}

const textStyle = highlight => {
    return {
        fontSize: 18,
        backgroundColor: highlight ? 'white' : 'transparent',
        alignSelf: 'flex-start',
        color: highlight ? 'black' : 'white',
        paddingHorizontal: 8,
        paddingVertical: 4,
        overflow: 'hidden',
        borderRadius: 2
    }
}

ItemView.Error = ({text}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <ItemView text='Error' style={{backgroundColor: 'red'}}/>
            <ItemView text={text}/>
        </View>
    )
}

ItemView.Background = ({children, ...props}) => {

    const anim = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(anim, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: false
        }).start()
    }, [])

    return (
        <Animated.View style={{
            // flex: 1,
            width: anim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
            }),
            backgroundColor: '#111111',
            overflow: 'hidden',
            ...props
        }}>
            {children}
        </Animated.View>
    )
}

export default ItemView;