import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native'
import MyAppText from './MyAppText';

function ItemView({ highlight, onPress, children, style }) {

    const [isHighlight, setHighlight] = React.useState(highlight)

    return (
        <TouchableWithoutFeedback
            onPressIn={() => setHighlight(true)}
            onPressOut={() => setHighlight(false)}
            onPress={onPress}
            disabled={onPress === undefined}
        >
            <View>
                <MyAppText
                    style={{
                        ...textStyle(isHighlight),
                        ...style
                    }}
                >
                    {children}
                </MyAppText>
            </View>
        </TouchableWithoutFeedback>
    )
}

const textStyle = highlight => {
    return {
        fontSize: 18,
        backgroundColor: highlight ? 'white' : 'black',
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
            <ItemView style={{backgroundColor: 'red'}}>Error</ItemView>
            <ItemView>{text}</ItemView>
        </View>
    )
}

export default ItemView;