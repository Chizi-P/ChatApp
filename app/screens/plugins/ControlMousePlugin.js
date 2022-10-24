import React from 'react';
import { View, SafeAreaView, Animated, useWindowDimensions } from 'react-native';
import ItemView from '../../view/ItemView';
import ListView from '../../view/ListView';
import MyAppText from '../../view/MyAppText';
import GridPointBackgroundView from '../../view/GridPointBackgroundView';

function ControlMousePlugin(props) {

    const cursorSize = 30
    const cursorHalfSideSize = cursorSize / 2

    const dimensions = useWindowDimensions()

    const touch = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current
    const [showCursor, setShowCursor] = React.useState(false)

    return (
        <SafeAreaView 
            style={{flex: 1}}
            onStartShouldSetResponder={() => true}
            onResponderGrant={(event) => {
                touch.setValue({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY
                })
                console.log(
                    'x:', (event.nativeEvent.locationX / dimensions.width).toFixed(4),
                    'y:', (event.nativeEvent.locationY / dimensions.height).toFixed(4)
                )
                setShowCursor(true)
            }}
            onResponderRelease={() => setShowCursor(false)}
            onResponderMove={(event) => {
                touch.setValue({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY
                })
                console.log(
                    'x:', (event.nativeEvent.locationX / dimensions.width).toFixed(4),
                    'y:', (event.nativeEvent.locationY / dimensions.height).toFixed(4)
                )
            }}
        >
            <CursorView 
                cursorSize={cursorSize}
                style={{
                    display: showCursor ? 'flex' : 'none',
                    left: Animated.subtract(touch.x, cursorHalfSideSize),
                    top:  Animated.subtract(touch.y, cursorHalfSideSize)
                }}
            />
            <GridPointBackgroundView fill row={10} column={6}/>
        </SafeAreaView>
    )
}

function CursorView({ cursorSize, style }) {
    return (
        <Animated.View 
            style={{
                position: 'absolute',
                backgroundColor: 'white',
                height: cursorSize,
                width: cursorSize,
                borderRadius: cursorSize / 2,
                ...style
            }}
        />
    )
}

export default ControlMousePlugin;