import React from 'react'
import {
    View,
    Text,
    useWindowDimensions,
    TouchableWithoutFeedback,
} from 'react-native'
import MyAppText from './MyAppText'
import LayoutView from './LayoutView'

function GridPointBackgroundView({
    row,
    column,
    width,
    height,
    spacing = 30,
    margin = 0,
    pointSize = [2, 2],
    fill = false,
    style,
    ...props
}) {
    const dimensions = useWindowDimensions()
    width ??= dimensions.width
    height ??= dimensions.height

    row ??= Math.ceil((height - margin) / (pointSize[1] + spacing))
    column ??= Math.ceil((width - margin) / (pointSize[0] + spacing))

    if (fill) {
        spacing = 0
    }

    return (
        <LayoutView vertical spacing={spacing} margin={margin} style={{justifyContent: fill ? 'space-around' : 'flex-start', flex: 1, ...style}} {...props}>
            {new Array(row).fill(
                <LayoutView horizontal spacing={spacing} style={{justifyContent: fill ? 'space-around' : 'flex-start'}}>
                    {new Array(column).fill(<PointView size={pointSize} />)}
                </LayoutView>
            )}
        </LayoutView>
    )
}

function PointView({ size, style }) {
    return (
        <View
            style={{
                width: size[0],
                height: size[1],
                backgroundColor: 'white',
                // borderRadius: 1,
                ...style,
            }}
        ></View>
    )
}

export default GridPointBackgroundView
