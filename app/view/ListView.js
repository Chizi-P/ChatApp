import React from 'react'
import { View, Animated, TouchableWithoutFeedback } from 'react-native'
import MyAppText from './MyAppText'
import LayoutView from './LayoutView'

function ListView({ title, children }) {
    return (
        <LayoutView spacing={20} margin={20}>
            <TitleView title={title} highlight />
            <View
                style={{
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 2,
                }}
            >
                <LayoutView spacing={2} margin={20}>
                    {children}
                </LayoutView>
            </View>
        </LayoutView>
    )
}

const TitleView = ({ title, highlight, style }) => {

    return (
        <View style={style}>
            <TextAnimation>
                <MyAppText
                    style={{
                        ...textStyle(highlight),
                        display: title ? 'flex' : 'none',
                    }}
                >
                    {title}
                </MyAppText>
            </TextAnimation>
        </View>
    )
}

const TextAnimation = ({ children, style }) => {
    const fadeIn = React.useRef(new Animated.Value(0)).current

    React.useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [fadeIn])

    return (
        <Animated.View
            style={{
                ...style,
                opacity: fadeIn,
            }}
        >
            {children}
        </Animated.View>
    )
}

// ListView.Item = function ListItemView({ highlight, onPress, children, style }) {

//     const [isHighlight, setHighlight] = React.useState(highlight)

//     return (
//         <TouchableWithoutFeedback
//             onPressIn={() => setHighlight(true)}
//             onPressOut={() => setHighlight(false)}
//             onPress={onPress}
//             disabled={onPress === undefined}
//         >
//             <View>
//                 <MyAppText
//                     style={{
//                         ...textStyle(isHighlight),
//                         ...style
//                     }}
//                 >
//                     {children}
//                 </MyAppText>
//             </View>
//         </TouchableWithoutFeedback>
//     )
// }

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

export default ListView
