import React from 'react';
import { View, SafeAreaView, Animated, useWindowDimensions } from 'react-native';
import ItemView from '../../view/ItemView';
import ListView from '../../view/ListView';
import MyAppText from '../../view/MyAppText';
import GridPointBackgroundView from '../../view/GridPointBackgroundView';
import { useAppContext } from '../../../AppContext';
import LayoutView from '../../view/LayoutView';
import react from 'react';

function ControlMousePlugin(props) {

    const socket = useAppContext().socket

    const [touch, setTouch] = React.useState({x: 0, y: 0})

    function sendPosition({x, y}) {
        socket.emit('plugin', 'ControlMouse', arguments[0])
    }

    const cursorSize = 30
    const cursorHalfSideSize = cursorSize / 2

    const dimensions = useWindowDimensions()

    // const touch = React.useRef(new Animated.ValueXY({x: 0, y: 0})).current

    const [showCursor, setShowCursor] = React.useState(false)

    const grid = [7, 4]
    const gridPointSize = [2, 2]
    const gridPointsRef = React.useRef(
        new Array(grid[0]).fill(null).map(() => (
            new Array(grid[1]).fill(null).map(() => (
                React.useRef(null)
            ))
        ))
    ).current

    const [gridPointsPosition, setGridPointsPosition] = React.useState(new Array(grid[0]).fill(null).map(() => new Array(grid[1]).fill(null).map(() => ({x: 0, y: 0}))))
    // 測量點的位置
    React.useEffect(() => {
        if (gridPointsRef.every(a => a.every(b => b.current))) {
            gridPointsRef.forEach((a, i) => {
                a.forEach((b, j) => {
                    b.current.measure((fx, fy, width, height, px, py) => {
                        console.log('[', i, ',', j, '] ', 'x:', px.toFixed(4), 'y:', py.toFixed(4))
                        // console.log('X offset to page: ' + px)
                        // console.log('Y offset to page: ' + py)
                        setGridPointsPosition(old => {
                            let newObj = JSON.parse(JSON.stringify(old))
                            newObj[i][j] = {x: px, y: py}
                            return newObj
                        })
                    })
                })
            })
        }
    }, [])
    // 接觸會放大動畫
    // const 
    // React.useEffect(() => {
    //     (20 - Math.min(Math.abs(gridPointsPosition[i][j].x - touch.x), 20)),
    // }, [touch])

    return (
        <SafeAreaView 
            style={{flex: 1}}
            onStartShouldSetResponder={() => true}
            onResponderGrant={(event) => {
                setTouch({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY
                })
                // touch.setValue({
                //     x: event.nativeEvent.locationX,
                //     y: event.nativeEvent.locationY
                // })
                setShowCursor(true)

                const dx = event.nativeEvent.locationX / dimensions.width
                const dy = event.nativeEvent.locationY / dimensions.height

                sendPosition({
                    x: dx,
                    y: dy
                })
                console.log(
                    'x:', dx.toFixed(4),
                    'y:', dy.toFixed(4)
                )

            }}
            onResponderRelease={() => setShowCursor(false)}
            onResponderMove={(event) => {
                setTouch({
                    x: event.nativeEvent.locationX,
                    y: event.nativeEvent.locationY
                })
                // touch.setValue({
                //     x: event.nativeEvent.locationX,
                //     y: event.nativeEvent.locationY
                // })
                
                const dx = event.nativeEvent.locationX / dimensions.width
                const dy = event.nativeEvent.locationY / dimensions.height

                sendPosition({
                    x: dx,
                    y: dy
                })
                console.log(
                    'x:', dx.toFixed(4),
                    'y:', dy.toFixed(4)
                )
            }}
        >

            <CursorView 
                cursorSize={cursorSize}
                style={{
                    display: showCursor ? 'flex' : 'none',
                    left: touch.x - cursorHalfSideSize,
                    top:  touch.y - cursorHalfSideSize
                    // left: Animated.subtract(touch.x, cursorHalfSideSize),
                    // top:  Animated.subtract(touch.y, cursorHalfSideSize)
                }}
            />
            <LayoutView vertical style={{justifyContent: 'space-around', flex: 1}} >
                {new Array(grid[0]).fill(null).map((_, i) => (
                    <LayoutView horizontal style={{justifyContent: 'space-around'}}>
                        {new Array(grid[1]).fill(null).map((_, j) => (
                            <View
                                ref={gridPointsRef[i][j]}
                                style={{
                                    width: gridPointSize[0],
                                    height: gridPointSize[1],
                                    // (100 - Math.min(Math.sqrt((gridPointsPosition[i][j].x - touch.x)**2 + (gridPointsPosition[i][j].y - touch.y)**2)), 100) / 10

                                    // transform: [{scale: (20 - Math.min(Math.sqrt((gridPointsPosition[i][j].x - touch.x)**2 + (gridPointsPosition[i][j].y - touch.y)**2)), 20)}],
                                    backgroundColor: 'white',
                                    // borderRadius: 1,
                                }}
                            />
                        ))}
                    </LayoutView>
                ))}
            </LayoutView>
        </SafeAreaView>
    )
}

function CursorView({ cursorSize, style }) {
    return (
        <View 
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